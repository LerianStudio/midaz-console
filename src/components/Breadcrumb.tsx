import React from 'react'
import { LinkWithLocale } from 'next-export-i18n'

export interface BreadcrumbPath {
  name: string
  href?: string
  active: boolean
}

interface BreadcrumbProps {
  paths: BreadcrumbPath[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
  return (
    <div className="flex gap-1 pb-5">
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span> ❯ </span>}
          {path.href ? (
            <LinkWithLocale
              href={path.href}
              className={`${path.active ? 'font-bold' : 'hover:underline'}`}
            >
              {path.name}
            </LinkWithLocale>
          ) : (
            <span className={`${path.active ? 'font-bold' : ''}`}>
              {path.name}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Breadcrumb
