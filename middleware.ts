import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const basicAuthRealm = 'Basic realm="SigilLab Admin"';

function unauthorizedResponse() {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": basicAuthRealm,
    },
  });
}

function readCredentials() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return null;
  }

  return { username, password };
}

function decodeAuthorizationHeader(value: string) {
  if (!value.startsWith("Basic ")) {
    return null;
  }

  const encoded = value.slice("Basic ".length).trim();

  if (!encoded) {
    return null;
  }

  try {
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex < 0) {
      return null;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const credentials = readCredentials();

  if (!credentials) {
    return unauthorizedResponse();
  }

  const authorization = request.headers.get("authorization");
  const provided = authorization
    ? decodeAuthorizationHeader(authorization)
    : null;

  if (
    !provided ||
    provided.username !== credentials.username ||
    provided.password !== credentials.password
  ) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
