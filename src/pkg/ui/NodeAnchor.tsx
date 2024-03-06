import { UiNode, UiNodeAnchorAttributes } from '@ory/client'

interface Props {
  node: UiNode
  attributes: UiNodeAnchorAttributes
}

export const NodeAnchor = ({ node, attributes }: Props) => {
  return (
    // <Button
    //   data-testid={`node/anchor/${attributes.id}`}
    //   onClick={(e: any) => {
    //     e.stopPropagation()
    //     e.preventDefault()
    //     window.location.href = attributes.href
    //   }}
    // >
    //   {attributes.title.text}
    // </Button>
    <h1>...</h1>
  )
}
