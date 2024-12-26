import { NextRequest, NextResponse } from 'next/server'
import { requestIdMiddleware } from '@/lib/middleware/request-id'

// Cria uma instância do middleware
const withRequestId = requestIdMiddleware()

// Função principal do middleware
export async function middleware(request: NextRequest) {
  // Cria uma resposta inicial
  const response = NextResponse.next()

  // Aplica o middleware
  await withRequestId(request, async () => response)

  // Propaga o X-Midaz-Id do request para o response
  const midazId = request.headers.get('X-Midaz-Id')
  if (midazId) {
    response.headers.set('X-Midaz-Id', midazId)
  }

  return response
}

// Define em quais rotas o middleware será executado
export const config = {
  matcher: [
    // Executa em todas as rotas da API
    '/api/:path*'
    // Adicione outros padrões de rota conforme necessário
  ]
}
