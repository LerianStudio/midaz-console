import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import { CreatePortfolio } from '@/core/application/use-cases/portfolios/create-portfolio-use-case'
// import { CreatePortfolio } from '@/core/application/use-cases/portfolio/create-portfolio-use-case'
// import { FetchAllPortfolios } from '@/core/application/use-cases/portfolio/fetch-all-portfolios-use-case'
// import { DeletePortfolio } from '@/core/application/use-cases/portfolio/delete-portfolio-use-case'
// import { UpdatePortfolio } from '@/core/application/use-cases/portfolio/update-portfolio-use-case'
import {
  container,
  Registry
} from '@/core/infrastructure/container-registry/container-registry'
import { NextResponse } from 'next/server'

const createPortfolioUseCase: CreatePortfolio = container.get<CreatePortfolio>(
  Registry.CreatePortfolioSymbolUseCase
)

// const fetchAllPortfoliosUseCase: FetchAllPortfolios =
//   container.get<FetchAllPortfolios>(Registry.FetchAllPortfoliosUseCase)

// const deletePortfolioUseCase: DeletePortfolio = container.get<DeletePortfolio>(
//   Registry.DeletePortfolioUseCase
// )

// const updatePortfolioUseCase: UpdatePortfolio = container.get<UpdatePortfolio>(
//   Registry.UpdatePortfolioUseCase
// )

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string; ledgerId: string } }
// ) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const limit = Number(searchParams.get('limit')) || 10
//     const page = Number(searchParams.get('page')) || 1
//     const organizationId = params.id
//     const ledgerId = params.ledgerId

//     const portfolios = await fetchAllPortfoliosUseCase.execute(
//       organizationId,
//       ledgerId,
//       limit,
//       page
//     )

//     return NextResponse.json(portfolios)
//   } catch (error: any) {
//     console.error('Error fetching all portfolios', error)
//     const { message, status } = await apiErrorHandler(error)

//     return NextResponse.json({ message }, { status })
//   }
// }

export async function POST(
  request: Request,
  { params }: { params: { id: string; ledgerId: string } }
) {
  try {
    const body = await request.json()
    const organizationId = params.id
    const ledgerId = params.ledgerId

    const result = await createPortfolioUseCase.execute(
      organizationId,
      ledgerId,
      body
    )

    console.log(result)

    return NextResponse.json(result, { status: 201 })
  } catch (error: any) {
    console.error('Error creating portfolio', error)
    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string; ledgerId: string; portfolioId: string } }
// ) {
//   try {
//     const organizationId = params.id
//     const ledgerId = params.ledgerId
//     const portfolioId = params.portfolioId

//     await deletePortfolioUseCase.execute(organizationId, ledgerId, portfolioId)

//     return NextResponse.json({}, { status: 200 })
//   } catch (error: any) {
//     console.error('Error deleting portfolio', error)
//     const { message, status } = await apiErrorHandler(error)

//     return NextResponse.json({ message }, { status })
//   }
// }

// export async function PATCH(
//   request: Request,
//   { params }: { params: { id: string; ledgerId: string; portfolioId: string } }
// ) {
//   try {
//     const body = await request.json()
//     const organizationId = params.id
//     const ledgerId = params.ledgerId
//     const portfolioId = params.portfolioId

//     const portfolioUpdated = await updatePortfolioUseCase.execute(
//       organizationId,
//       ledgerId,
//       portfolioId,
//       body
//     )

//     return NextResponse.json(portfolioUpdated)
//   } catch (error: any) {
//     console.error('Error updating portfolio', error)
//     const { message, status } = await apiErrorHandler(error)

//     return NextResponse.json({ message }, { status })
//   }
// }
