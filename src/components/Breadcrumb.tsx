import Link from 'next/link'
import React from 'react'

export interface BreadcrumbPath {
  name: string
  href: string
  active: boolean
}

interface BreadcrumbProps {
  paths: BreadcrumbPath[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
  return (
    <div className="flex py-5">
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span> ❯ </span>}
          <Link
            href={path.href}
            className={`mx-1 ${path.active ? 'font-bold' : 'hover:underline'}`}
          >
            {path.name}
          </Link>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Breadcrumb
