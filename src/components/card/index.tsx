import { CustomCardContent } from './card-content'
import { CardMetadata } from './card-metadata'
import { CustomCardHeader } from './card-header'
import { CardRoot } from './card-root'
import { CardResources } from './card-resources'
import { ChartCard } from './chart-card'

export const Card = {
  Root: CardRoot,
  Header: CustomCardHeader,
  Content: CustomCardContent,
  Metadata: CardMetadata,
  Resources: CardResources,
  Chart: ChartCard
}
