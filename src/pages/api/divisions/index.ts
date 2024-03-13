import type { NextApiRequest, NextApiResponse } from 'next'

const mock = [
  {
    id: '30182626-577b-4557-a979-95c143744cae',
    legalName: 'Black Rock LLC',
    doingBusinessAs: 'Black Rock', //opcional
    legalDocument: '1234556623',
    address: {
      //optional
      line1: '447, Broadway',
      line2: 'Ste 133',
      neighborhood: 'Soho',
      zipCode: '10013',
      city: 'New York',
      state: 'NY',
      country: 'US' //de acordo com a ISO 3166-1 alpha2
    },
    defaultTimezone: 'America/New_York', //opcional, default UTC
    defaultCurrency: 'USD', // opcional, default BRL (de acordo com a ISO 4217)
    defaultHolidayList: [
      //opcional
      {
        type: 'dynamic',
        name: 'Thanksgiving', //optional
        month: 11,
        weekDay: 4, // 0 = Segunda, 1 = Terça etc
        position: 9 //1 = primeiro, 2 = segundo 9 = último
      }
    ],
    metadata: {
      //opcional
      favoritePokemon: 'Pikachu'
    },
    status: 'ACTIVE',
    createdAt: '2024-02-08T16:59:31+0300',
    updatedAt: '2024-02-08T16:59:31+0300',
    deletedAt: null
  },
  {
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
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(mock)
}
