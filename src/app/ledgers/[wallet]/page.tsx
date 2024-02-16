type Props = {
  params: {
    wallet: string
  }
}

const Page = ({ params }: Props) => {
  return (
    <div>
      <span>{params.wallet}</span>
    </div>
  )
}

export default Page
