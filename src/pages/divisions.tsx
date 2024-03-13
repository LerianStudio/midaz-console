import { DataTable } from '@/components/DataTable'
import MainLayout from '@/components/MainLayout'
import { NoResource } from '@/components/NoResource'
import { PageTitle } from '@/components/PageTitle'
import { SheetDemo } from '@/components/Sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { fetcher } from '@/lib/fetcher'
import { Row } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { z } from 'zod'

type ColumnRow = {
  row: Row<any>
}

interface DivisionData {
  id: string
  doingBusinessAs: string
  legalName: string
}

type SheetModeState = {
  isOpen: boolean
  mode: 'create' | 'edit' | 'view'
  divisionData: DivisionData | null
}

const profileFormFields = [
  {
    name: 'id',
    label: 'ID',
    placeholder: 'xxx'
  },
  {
    name: 'legalName',
    label: 'Razão Social',
    placeholder: 'xxx'
  },
  {
    name: 'tradeName',
    label: 'Nome fantasia',
    placeholder: 'xxx'
  },
  {
    name: 'document',
    label: 'Documento',
    placeholder: 'xxx'
  },
  {
    name: 'address',
    label: 'Endereço',
    placeholder: 'xxx'
  },
  {
    name: 'complement',
    label: 'Complemento',
    placeholder: 'xxx'
  },
  {
    name: 'country',
    label: 'País',
    placeholder: 'xxx'
  },
  {
    name: 'state',
    label: 'Estado',
    placeholder: 'xxx'
  },
  {
    name: 'city',
    label: 'Cidade',
    placeholder: 'xxx'
  },
  {
    name: 'zipCode',
    label: 'CEP',
    placeholder: 'xxx'
  },
  {
    name: 'timeZone',
    label: 'Fuso horário',
    placeholder: 'xxx'
  },
  {
    name: 'defaultCurrency',
    label: 'Moeda padrão',
    placeholder: 'xxx'
  }
]

const profileFormSchema = z.object({
  legalName: z.string(),
  tradeName: z.string(),
  document: z.string(),
  address: z.string(),
  complement: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  zipCode: z.string(),
  timeZone: z.string(),
  defaultCurrency: z.string()
})

const Divisions = () => {
  const { data, isLoading: loadingFetch } = useSWR<any[]>(
    '/api/divisions',
    fetcher
  )

  const [hasResources, setHasResources] = useState(false)
  const [doingBusinessAs, setDoingBusinessAs] = useState('')
  const [sheetMode, setSheetMode] = useState<SheetModeState>({
    isOpen: false,
    mode: 'create',
    divisionData: null
  })

  const handleOpenCreateSheet = () => {
    setSheetMode({ isOpen: true, mode: 'create', divisionData: null })
  }

  const handleOpenEditSheet = (divisionData: any) => {
    setSheetMode({ isOpen: true, mode: 'edit', divisionData: divisionData })
  }

  const handleOpenViewSheet = (divisionData: DivisionData) => {
    setSheetMode({ isOpen: true, mode: 'view', divisionData: divisionData })
  }

  useEffect(() => {
    if (data && data.length > 0) {
      setHasResources(true)
    } else {
      setHasResources(false)
    }
  }, [data])

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }: ColumnRow) => {
        const id = row.original.id
        const displayId = id && id.length > 6 ? `${id.substring(0, 6)}...` : id
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p>{displayId}</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{id}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }
    },
    {
      accessorKey: 'doingBusinessAs',
      header: 'Name',
      cell: ({ row }: ColumnRow) => {
        const nameToDisplay =
          row.original.doingBusinessAs || row.original.legalName
        return <p>{nameToDisplay}</p>
      }
    },
    {
      accessorKey: 'legalDocument',
      header: 'Legal document'
    },
    {
      accessorKey: 'status',
      header: 'Status'
    },
    {
      header: 'Editar',
      cell: ({ row }: ColumnRow) => (
        <div className="flex pl-2">
          <Pencil
            className="h-4 w-4 cursor-pointer"
            onClick={() => handleOpenEditSheet(row.original)}
          />
        </div>
      )
    },
    {
      header: 'Deletar',
      cell: ({ row }: ColumnRow) => (
        <div className="flex pl-4">
          <Trash2 className="h-4 w-4 cursor-pointer" />
        </div>
      )
    },
    {
      id: 'actions',
      cell: ({ row }: ColumnRow) => (
        <div className="flex pl-4">
          <MoreHorizontal
            className="h-4 w-4 cursor-pointer"
            onClick={() => handleOpenViewSheet(row.original)}
          />
        </div>
      )
    }
  ]

  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <MainLayout>
      <PageTitle
        title="Divisões"
        subtitle="Visualize e edite os sub-grupos da sua Organização."
      />

      <div className="mt-10">
        {!hasResources ? (
          <>
            <div className="h-[1px] w-full bg-black"></div>
            <NoResource
              resourceName="Division"
              onClick={handleOpenCreateSheet}
              pronoun="ela"
            />
          </>
        ) : (
          <DataTable columns={columns} data={data || []} />
        )}

        <SheetDemo
          open={sheetMode.isOpen}
          setOpen={(isOpen) => setSheetMode({ ...sheetMode, isOpen })}
          mode={sheetMode.mode}
          fields={profileFormFields}
          formSchema={profileFormSchema}
          title={
            sheetMode.mode === 'create'
              ? 'Criar Division'
              : sheetMode.mode === 'edit'
                ? `Editar Division ${sheetMode.divisionData?.doingBusinessAs || sheetMode.divisionData?.legalName}`
                : `Division ${sheetMode.divisionData?.doingBusinessAs || sheetMode.divisionData?.legalName}`
          }
          description={
            sheetMode.mode === 'create'
              ? 'Preencha os dados da Division que você deseja criar.'
              : sheetMode.mode === 'edit'
                ? 'Edite o que desejar e depois clique em “Salvar”. '
                : 'Abaixo estão listados os dados da sua Division.'
          }
          // divisionData={sheetMode.divisionData}
          onSubmit={handleSubmit}
        />
      </div>
    </MainLayout>
  )
}

export default Divisions
