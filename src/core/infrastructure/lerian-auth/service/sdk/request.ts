import FormData from 'form-data'

export type RequestConfig = {
  url: string
  headers?: any
}

export type Response<T> = {
  data: T
}

export default class Request {
  private config: RequestConfig

  constructor(config: RequestConfig) {
    this.config = config
  }

  get(url: string, config?: RequestInit) {
    return fetch(this.config.url + url, {
      method: 'GET',
      headers: { ...this.config.headers, ...config?.headers },
      ...config
    })
  }

  post(url: string, data: any, config?: RequestInit) {
    return fetch(this.config.url + url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { ...this.config.headers, ...config?.headers },
      ...config
    })
  }

  postFile(url: string, postFile: any, config?: RequestInit) {
    const formData = new FormData()
    formData.append('file', postFile)
    return fetch(this.config.url + url, {
      method: 'POST',
      headers: formData.getHeaders(),
      body: formData as any,
      ...config
    })
  }
}
