import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export const LedgerDetailsSkeleton = () => {
  return (
    <>
      <div className="mt-12 flex h-[125px] w-full flex-col gap-4 border-b">
        <Skeleton className="h-10 w-80 bg-zinc-200" />
        <Skeleton className="h-5 w-80 bg-zinc-200" />
      </div>

      <div className="mt-6 flex w-full gap-4">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-10 w-24 bg-zinc-200" />
        ))}
      </div>

      <div className="mt-8 flex gap-6">
        <div className="flex flex-1 flex-col gap-6">
          <Skeleton className="h-[94px] bg-zinc-200" />
          <Skeleton className="h-[168px] bg-zinc-200" />
        </div>
      </div>
    </>
  )
}
