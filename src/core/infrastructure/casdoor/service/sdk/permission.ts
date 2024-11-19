import { Config } from './config'
import Request, { type Response } from './request'

export interface Permission {
  owner: string
  name: string
  createdTime: string
  displayName: string
  description: string

  users?: string[]
  groups?: string[]
  roles?: string[]
  domains?: string[]

  model: string
  adapter?: string
  resourceType: string
  resources?: string[]
  actions?: string[]
  effect: string
  isEnabled: boolean

  submitter?: string
  approver?: string
  approveTime?: string
  state?: string
}

export class PermissionSdk {
  private config: Config
  private readonly request: Request

  constructor(config: Config, request: Request) {
    this.config = config
    this.request = request
  }

  public async getPermissions() {
    if (!this.request) {
      throw new Error('request init failed')
    }

    const response = await this.request.get(
      `/get-permissions?${new URLSearchParams({ id: this.config.orgName })}`
    )

    return (await response.json()) as unknown as Promise<Response<Permission[]>>
  }

  public async getPermission(id: string) {
    if (!this.request) {
      throw new Error('request init failed')
    }

    const response = await this.request.get(
      `/get-permission?${new URLSearchParams({ id: `${this.config.orgName}/${id}` })}`
    )

    return (await response.json()) as unknown as Promise<Response<Permission>>
  }

  public async modifyPermission(method: string, permission: Permission) {
    if (!this.request) {
      throw new Error('request init failed')
    }

    const url = `/${method}`
    permission.owner = this.config.orgName
    const response = await this.request.post(
      `${url}?${new URLSearchParams({
        id: `${permission.owner}/${permission.name}`
      })}`,
      permission
    )

    return (await response.json()) as unknown as Promise<
      Response<Record<string, unknown>>
    >
  }

  public async addPermission(permission: Permission) {
    return this.modifyPermission('add-permission', permission)
  }

  public async updatePermission(permission: Permission) {
    return this.modifyPermission('update-permission', permission)
  }

  public async deletePermission(permission: Permission) {
    return this.modifyPermission('delete-permission', permission)
  }
}
