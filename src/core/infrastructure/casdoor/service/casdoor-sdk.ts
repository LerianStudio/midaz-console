import { Config } from './sdk/config'
import { CasbinRequest, EnforceSDK } from './sdk/enforce'
import { PermissionSdk, type Permission } from './sdk/permission'
import Request from './sdk/request'

/**
 * Casdoor SDK.
 * This is a custom implementation of Casdoor SDK,
 * as at 11/2024, the original library has a security vulnerability with Axios.
 * This custom implementation uses the Request with native fetch API.
 *
 * References: https://github.com/casdoor/casdoor-nodejs-sdk
 */
export class CasdoorSdk {
  protected readonly config: Config
  protected readonly request: Request
  private permissionSdk: PermissionSdk
  private enforceSdk: EnforceSDK

  constructor(config: Config) {
    this.config = config
    this.request = new Request({
      url: this.config.endpoint + '/api',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${this.config.clientId}:${this.config.clientSecret}`
        ).toString('base64')}`
      }
    })
    this.permissionSdk = new PermissionSdk(this.config, this.request)
    this.enforceSdk = new EnforceSDK(this.config, this.request)
  }

  public async getPermissions() {
    return await this.permissionSdk.getPermissions()
  }

  public async getPermission(id: string) {
    return await this.permissionSdk.getPermission(id)
  }

  public async addPermission(permission: Permission) {
    return await this.permissionSdk.addPermission(permission)
  }

  public async updatePermission(permission: Permission) {
    return await this.permissionSdk.updatePermission(permission)
  }

  public async deletePermission(permission: Permission) {
    return await this.permissionSdk.deletePermission(permission)
  }

  public async enforce(
    permissionId: string,
    modelId: string,
    resourceId: string,
    casbinRequest: CasbinRequest
  ) {
    return await this.enforceSdk.enforce(
      permissionId,
      modelId,
      resourceId,
      casbinRequest
    )
  }

  public async batchEnforce(
    permissionId: string,
    modelId: string,
    resourceId: string,
    casbinRequest: CasbinRequest[]
  ) {
    return await this.enforceSdk.batchEnforce(
      permissionId,
      modelId,
      resourceId,
      casbinRequest
    )
  }
}
