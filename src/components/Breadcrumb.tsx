import Link from 'next/link'
import React from 'react'

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
            <Link href={path.href}>
              <span
                className={`${path.active ? 'cursor-pointer font-bold' : 'cursor-pointer hover:underline'}`}
              >
                {path.name}
              </span>
            </Link>
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
