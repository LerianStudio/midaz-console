import { redirect } from 'next/navigation'
import { usePermissions } from './permission-provider-client'

type RouteEnforcerProps = React.PropsWithChildren & {
  resource: string
  action: string
}

export const RouteEnforcer = ({
  resource,
  action,
  children
}: RouteEnforcerProps) => {
  const { validate } = usePermissions()

  if (!validate(resource, action)) {
    redirect('/')
  }

  return children
}
