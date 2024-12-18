export type OperationEmptyAccordionProps = {
  title: string
  description?: string
}

export const OperationEmptyAccordion = ({
  title,
  description
}: OperationEmptyAccordionProps) => {
  return (
    <div className="mb-6 flex flex-row rounded-xl border border-dashed border-zinc-300 p-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm font-medium text-shadcn-400">{description}</p>
      </div>
    </div>
  )
}
