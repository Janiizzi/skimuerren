import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

type Credential = {
  username: string
  password: string
}

const parseCredentials = (raw: string | undefined): Credential[] => {
  if (!raw) {
    return []
  }
  return raw
    .split(",")
    .map((pair) => pair.trim())
    .filter(Boolean)
    .map((pair) => {
      const [username, password] = pair.split(":")
      if (!username || !password) {
        return null
      }
      return { username, password }
    })
    .filter((value): value is Credential => value !== null)
}

const unauthorizedResponse = () => {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Losung", charset="UTF-8"',
    },
  })
}

export function middleware(request: NextRequest) {
  const allowedCredentials = parseCredentials(process.env.BASIC_AUTH_USERS)
  if (!allowedCredentials.length) {
    return NextResponse.next()
  }

  const header = request.headers.get("authorization")
  if (!header?.startsWith("Basic ")) {
    return unauthorizedResponse()
  }

  const base64Credentials = header.split(" ")[1]
  let decoded: string
  try {
    decoded = atob(base64Credentials)
  } catch (error) {
    return unauthorizedResponse()
  }

  const separator = decoded.indexOf(":")
  if (separator === -1) {
    return unauthorizedResponse()
  }

  const username = decoded.slice(0, separator)
  const password = decoded.slice(separator + 1)

  const isAllowed = allowedCredentials.some(
    (cred) => cred.username === username && cred.password === password
  )

  if (!isAllowed) {
    return unauthorizedResponse()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
}
