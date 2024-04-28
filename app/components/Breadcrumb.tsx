import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import React from 'react'
import { ChevronRight } from 'lucide-react'

export type BreadcrumbPath = {
  name: string
  href?: string
  active: boolean
}

type BreadcrumbProps = {
  paths: BreadcrumbPath[]
}

export const BreadcrumbComponent = ({ paths }: BreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink>
                {path.href ? (
                  <Link
                    href={path.href}
                    className={'font-medium text-[#3f3f46] underline'}
                  >
                    {path.name}
                  </Link>
                ) : (
                  <span className="text-sm font-normal text-shadcn-400">
                    {path.name}
                  </span>
                )}
              </BreadcrumbLink>
            </BreadcrumbItem>

            {index < paths.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight size={16} className="text-shadcn-400" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
