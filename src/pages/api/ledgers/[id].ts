import type { NextApiRequest, NextApiResponse } from 'next'

const mock = {
  id: '77b0fb8b-1bd9-4810-9c6d-7e80064fab0c',
  organizationId: 'cc15194a-6bc9-4ebb-b15d-43411a54ba4b',
  name: 'Black Rock Brazil',
  divisionId: '30182626-577b-4557-a979-95c143744cae',
  defaultTimezone: 'America/Sao_Paulo',
  defaultCurrency: 'BRL',
  defaultHolidayList: null,
  assets: [
    'c3a89e04-b1cd-4df8-a5f9-0bb077e07e6d',
    'bb907427-5a8c-4622-b1ce-801b70e40d0c',
    '8357fd78-81a8-4075-a399-863b3d39779e',
    '074f85a9-7f23-46a4-bff5-50d2cda8d9ef',
    '7079bef9-efc0-4fc8-ab0a-776e4b3f70ff'
  ],
  metadata: {
    costCenter: 'BR_11101997'
  },
  status: 'ACTIVE',
  createdAt: '2024-02-08T16:59:31+0300',
  updatedAt: '2024-02-08T16:59:31+0300',
  deletedAt: null
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(mock)
}
