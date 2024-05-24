import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const TabsComponent = ({ tabs, children }: any) => {
  return (
    <Tabs defaultValue={tabs[0].value} className="mt-6 w-full">
      <TabsList className="flex justify-start gap-4 bg-transparent">
        {tabs.map((tab: any) => (
          <TabsTrigger
            key={tab.id}
            value={tab.value}
            className="rounded-md bg-transparent px-4 py-[10px] text-shadcn-400 hover:bg-white hover:text-shadcn-500 data-[state=active]:bg-sunglow-400 data-[state=active]:text-[#3F3F46]"
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab: any) => (
        <TabsContent value={tab.value} key={tab.value} className="mt-4">
          {children}
        </TabsContent>
      ))}
    </Tabs>
  )
}
