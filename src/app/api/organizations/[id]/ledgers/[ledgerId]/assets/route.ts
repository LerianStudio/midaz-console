// export async function POST(
//   request: Request,
//   { params }: { params: { id: string; ledgerId: string } }
// ) {
//   try {
//     const body = await request.json()
//     const organizationId = params.id
//     const ledgerId = params.ledgerId

//     const assetCreated = await createAssetUseCase.execute(
//       organizationId,
//       ledgerId,
//       body
//     )

//     return NextResponse.json({ assetCreated })
//   } catch (error: any) {
//     console.error('Error creating asset', error)

//     const { message, status } = await apiErrorHandler(error)

//     return NextResponse.json({ message }, { status })
//   }
// }
