import React from 'react'

export interface JsonLdProps {
  schema: Record<string, unknown> | Array<Record<string, unknown>>
}

/**
 * Clean reusable JSON-LD Component for Rich Snippets
 */
export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}
