import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { SectionCards } from '../../components/ui/section-cards'
import { ChartAreaInteractive } from '../../components/ui/chart-area-interactive'
export default function Dashboard() {
  return (
    <>
     <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
    {/* <SectionCards/> */}
    {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Skeleton className="bg-muted/50 aspect-video rounded-xl" />
            <Skeleton className="bg-muted/50 aspect-video rounded-xl" />
            <Skeleton className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <Skeleton className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl " /> */}
    </>
   
  )
}
