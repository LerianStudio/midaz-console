import { NextResponse } from 'next/server'

const mock = {
  id: '0114a3c6-af86-4e9e-9cc6-8398e3bc7a52',
  legalName: 'BTG Pactual',
  doingBusinessAs: null,
  legalDocument: '1231231241249182',
  address: {
    line1: 'Avenida Faria Lima, 211',
    line2: 'Andar 12',
    neighborhood: 'Pinheiros',
    zipCode: '98239821',
    city: 'São Paulo',
    state: 'SP',
    country: 'BR'
  },
  defaultTimezone: 'America/São paulo',
  defaultCurrency: 'BRL',
  metadata: null,
  status: 'ACTIVE',
  createdAt: '2024-02-08T16:59:31+0300',
  updatedAt: '2024-02-08T16:59:31+0300',
  deletedAt: null
}

export async function GET() {
  return NextResponse.json(mock)
}
