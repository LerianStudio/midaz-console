export type AuthActionEntity = string

export type AuthResourceEntity = string

export type AuthPermissionEntity = Record<
  AuthResourceEntity,
  AuthActionEntity[]
>
