import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const LedgerDetailsSkeleton = () => {
  return (
    <React.Fragment>
      <div className="mt-12 flex h-[125px] w-full flex-col gap-4 border-b">
        <Skeleton className="h-10 w-80 bg-zinc-200" />
        <Skeleton className="h-5 w-80 bg-zinc-200" />
      </div>

      <div className="mt-6 flex w-full gap-4">
        <Skeleton className="h-10 w-24 bg-zinc-200" />
        <Skeleton className="h-10 w-24 bg-zinc-200" />
        <Skeleton className="h-10 w-24 bg-zinc-200" />
      </div>

      <div className="mt-4 flex gap-6">
        <div className="flex flex-1 flex-col gap-6">
          <Skeleton className="h-[168px] bg-zinc-200" />
          <Skeleton className="h-[168px] bg-zinc-200" />
          <Skeleton className="h-[94px] bg-zinc-200" />
        </div>
      </div>
    </React.Fragment>
  )
}
