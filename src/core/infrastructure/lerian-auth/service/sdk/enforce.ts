import { Config } from './config'
import Request, { type Response } from './request'

export type CasbinRequest = string[]
export type CasbinResponse = boolean[]

export class EnforceSDK {
  private config: Config
  private readonly request: Request

  constructor(config: Config, request: Request) {
    this.config = config
    this.request = request
  }

  public async enforce(
    permissionId: string,
    modelId: string,
    resourceId: string,
    casbinRequest: CasbinRequest
  ): Promise<boolean> {
    const response = await this.doEnforce<CasbinResponse>(
      'enforce',
      permissionId,
      modelId,
      resourceId,
      casbinRequest
    )
    const { data } = response
    for (const isAllow of data) {
      if (isAllow) {
        return isAllow
      }
    }
    return false
  }

  public async batchEnforce(
    permissionId: string,
    modelId: string,
    resourceId: string,
    casbinRequest: CasbinRequest[]
  ): Promise<boolean[]> {
    const response = await this.doEnforce<CasbinResponse[]>(
      'batch-enforce',
      permissionId,
      modelId,
      resourceId,
      casbinRequest
    )
    const { data } = response
    return data.flat(2)
  }

  private async doEnforce<T>(
    action: string,
    permissionId: string,
    modelId: string,
    resourceId: string,
    casbinRequest: CasbinRequest | CasbinRequest[]
  ) {
    if (!this.request) {
      throw new Error('request init failed')
    }

    const url = `/${action}`
    const params = new URLSearchParams({
      permissionId: permissionId,
      modelId: modelId,
      resourceId: resourceId
    })
    const response = await this.request.post(`${url}?${params}`, casbinRequest)

    return (await response.json()) as unknown as Promise<Response<T>>
  }
}
