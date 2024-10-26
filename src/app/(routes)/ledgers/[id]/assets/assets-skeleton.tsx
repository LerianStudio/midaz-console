import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const AssetsSkeleton = () => {
  return (
    <React.Fragment>
      <Skeleton className="mt-6 h-[390px] w-full bg-zinc-200" />
    </React.Fragment>
  )
}
