import { NextResponse, type NextRequest } from "next/server"

// Em Next 16 o middleware passou a se chamar Proxy (mesmo comportamento).
// Nome do cookie repetido aqui de propósito: importar lib/sessao.ts traria o
// `server-only` e a API de cookies do Node para o runtime do proxy.
const COOKIE = "gt_sessao"

const ROTAS_PUBLICAS = ["/login"]

/**
 * Checagem otimista: olha só se o cookie de sessão existe, para evitar o flash
 * de tela protegida em quem nem token tem.
 *
 * Não é a proteção de verdade — o cookie pode estar expirado ou revogado. Quem
 * valida o token contra o backend é `usuarioLogado()` em features/auth/data.ts,
 * chamado dentro de cada rota protegida.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const temSessao = request.cookies.has(COOKIE)
  const ehPublica = ROTAS_PUBLICAS.some((rota) => pathname.startsWith(rota))

  if (!temSessao && !ehPublica) {
    const login = new URL("/login", request.url)
    // Guarda para onde a pessoa queria ir, e volta para lá depois de entrar.
    if (pathname !== "/") login.searchParams.set("proximo", pathname)
    return NextResponse.redirect(login)
  }

  if (temSessao && ehPublica) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Tudo, menos assets internos do Next e arquivos estáticos.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|illustrations|.*\\.svg).*)"],
}
