import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
export default function EnterpriseStructure() {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  <Skeleton className="bg-muted/50 aspect-video rounded-xl" />
                  <Skeleton className="bg-muted/50 aspect-video rounded-xl" />
                  <Skeleton className="bg-muted/50 aspect-video rounded-xl" />
                </div>
                <Skeleton className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl " />
    </>
  )
}
