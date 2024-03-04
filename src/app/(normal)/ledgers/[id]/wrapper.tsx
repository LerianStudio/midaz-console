'use client'

import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import { Ledger } from '@/types/LedgersType'
import { useTranslation } from 'next-export-i18n'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

type Props = {
  ledger: Ledger
}

const Wrapper = ({ ledger }: Props) => {
  const { t } = useTranslation()

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: t('breadcrumb.allLedgers'), active: false },
    { name: t('breadcrumb.ledgers'), href: '/ledgers', active: false },
    { name: ledger.name, href: `/ledgers/${ledger.id}`, active: true }
  ]

  return (
    <div className="flex w-full flex-col">
      <Breadcrumb paths={breadcrumbPaths} />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{ledger.name}</CardTitle>
          <CardDescription>...</CardDescription>
        </CardHeader>
        <CardContent>
          <p>...</p>
        </CardContent>
        <CardFooter>
          <p>...</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Wrapper
