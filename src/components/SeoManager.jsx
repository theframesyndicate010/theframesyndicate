import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pageData } from '../content/pageData'

const siteUrl = 'https://theframesyndicate.me'

function updateMetaTag(attributeName, attributeValue, content) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attributeName, attributeValue)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function updateLinkTag(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

export default function SeoManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    const routeMeta = pageData[pathname] ?? pageData['/']
    const canonicalUrl = new URL(pathname === '/' ? '/' : pathname, siteUrl).toString()
    const ogImage = `${siteUrl}/pogo.jpeg`

    document.title = routeMeta.title
    updateMetaTag('name', 'description', routeMeta.description)
    updateMetaTag('name', 'author', routeMeta.author)
    updateMetaTag('name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')
    updateMetaTag('property', 'og:title', routeMeta.title)
    updateMetaTag('property', 'og:description', routeMeta.description)
    updateMetaTag('property', 'og:type', 'website')
    updateMetaTag('property', 'og:url', canonicalUrl)
    updateMetaTag('property', 'og:image', ogImage)
    updateMetaTag('property', 'og:site_name', 'Frame Syndicate')
    updateMetaTag('name', 'twitter:card', 'summary_large_image')
    updateMetaTag('name', 'twitter:title', routeMeta.title)
    updateMetaTag('name', 'twitter:description', routeMeta.description)
    updateMetaTag('name', 'twitter:image', ogImage)
    updateLinkTag('canonical', canonicalUrl)

    const schemaScripts = [
      {
        id: 'organization-json-ld',
        data: {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Frame Syndicate',
          url: siteUrl,
          logo: ogImage,
        },
      },
      {
        id: 'webpage-json-ld',
        data: {
          '@context': 'https://schema.org',
          '@type': routeMeta.schemaType,
          name: routeMeta.title,
          description: routeMeta.description,
          url: canonicalUrl,
          author: {
            '@type': 'Organization',
            name: routeMeta.author,
          },
          dateModified: routeMeta.updatedIso,
        },
      },
      {
        id: 'breadcrumb-json-ld',
        data: {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: siteUrl,
            },
            ...(pathname === '/' ? [] : [
              {
                '@type': 'ListItem',
                position: 2,
                name: routeMeta.label,
                item: canonicalUrl,
              },
            ]),
          ],
        },
      },
      routeMeta.faqs?.length
        ? {
            id: 'faq-json-ld',
            data: {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: routeMeta.faqs.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a,
                },
              })),
            },
          }
        : null,
    ].filter(Boolean)

    const existingScripts = new Set(schemaScripts.map((entry) => entry.id))
    document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
      if (existingScripts.has(script.id)) {
        script.remove()
      }
    })

    schemaScripts.forEach(({ id, data }) => {
      let script = document.getElementById(id)
      if (!script) {
        script = document.createElement('script')
        script.id = id
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(data)
    })

    if (routeMeta.updatedAt) {
      updateMetaTag('property', 'article:modified_time', routeMeta.updatedIso || routeMeta.updatedAt)
    }

    window.__PRERENDER_READY__ = true
    document.dispatchEvent(new Event('prerender-ready'))
  }, [pathname])

  return null
}