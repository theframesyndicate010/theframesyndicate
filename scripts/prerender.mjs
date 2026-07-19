import { createServer } from 'node:http'
import { writeFile, mkdir } from 'node:fs/promises'
import { createReadStream, existsSync } from 'node:fs'
import { extname, join, dirname, resolve } from 'node:path'
import { chromium } from 'playwright'

const distDir = resolve('dist')
const routes = ['/', '/about', '/services', '/portfolio', '/contact']
const port = 4173
const host = '127.0.0.1'

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
}

function routeToOutputPaths(route) {
  if (route === '/') {
    return [join(distDir, 'index.html')]
  }

  const cleanRoute = route.replace(/^\//, '').replace(/\/$/, '')
  return [
    join(distDir, `${cleanRoute}.html`),
    join(distDir, cleanRoute, 'index.html'),
  ]
}

async function serveStaticFile(filePath, response) {
  const type = mimeTypes[extname(filePath)] ?? 'application/octet-stream'
  response.writeHead(200, { 'Content-Type': type })
  createReadStream(filePath).pipe(response)
}

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url ?? '/', `http://${host}`)
    let filePath = join(distDir, requestUrl.pathname)

    if (requestUrl.pathname.endsWith('/')) {
      filePath = join(distDir, requestUrl.pathname, 'index.html')
    }

    if (existsSync(filePath)) {
      return serveStaticFile(filePath, response)
    }

    const directoryIndex = join(distDir, requestUrl.pathname, 'index.html')
    if (existsSync(directoryIndex)) {
      return serveStaticFile(directoryIndex, response)
    }

    const assetPath = join(distDir, requestUrl.pathname.replace(/^\//, ''))
    if (existsSync(assetPath)) {
      return serveStaticFile(assetPath, response)
    }

    return serveStaticFile(join(distDir, 'index.html'), response)
  } catch (error) {
    response.statusCode = 500
    response.end(String(error))
  }
})

await new Promise((resolvePromise) => {
  server.listen(port, host, resolvePromise)
})

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

try {
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1440, height: 1600 })

  for (const route of routes) {
    await page.goto(`http://${host}:${port}${route}`, { waitUntil: 'domcontentloaded' })
    await page.waitForFunction(() => window.__PRERENDER_READY__ === true, { timeout: 15000 })

    const html = `<!DOCTYPE html>\n${await page.evaluate(() => document.documentElement.outerHTML)}`
    for (const outputPath of routeToOutputPaths(route)) {
      await mkdir(dirname(outputPath), { recursive: true })
      await writeFile(outputPath, html, 'utf8')
    }
  }
} finally {
  await browser.close()
  await new Promise((resolvePromise) => server.close(resolvePromise))
}
