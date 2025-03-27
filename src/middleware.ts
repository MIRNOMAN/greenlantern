/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { jwtDecode } from "jwt-decode"

// Define user token payload interface
interface UserTokenPayload {
  role: string
  // Add other user properties as needed
}

const AuthRoutes = ["/login", "/register"]
type Role = keyof typeof roleBasedRoutes

// Define routes for each role
const roleBasedRoutes = {
  USER: [
    /^\/$/, // Homepage (if redirected here)
    /^\/contact/, // /contact
    /^\/service/, // /service
    /^\/shop/, // /shop
    /^\/user/, // Anything under /user (e.g., /user/profile, /user/settings, etc.)
    /^\/user\/dashboard$/, // Specifically /user/dashboard
    /^\/information-materials/, // /shop
    /^\/credentialing-information/, 
    /^\/create-form/, // /shop
  ],
  SUPERADMIN: [
/^\/$/, // Homepage (if redirected here)
    /^\/contact/, // /contact
    /^\/service/, // /service
    /^\/shop/, // /shop
    /^\/user/, // Anything under /user (e.g., /user/profile, /user/settings, etc.)
    /^\/user\/dashboard$/, // Specifically /user/dashboard
    /^\/admin/, // Anything under /admin (e.g., /admin/*)
    /^\/admin\/dashboard$/, // Specifically /admin/dashboard
  
    
  ],
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the token from cookies using the request object
  const token = request.cookies.get("userToken")?.value

  // If no token and not on auth routes, redirect to login
  if (!token) {
    // Only redirect if not already on an auth route
    if (!AuthRoutes.includes(pathname)) {
      // Create a properly encoded redirect URL
      const redirectPath = encodeURIComponent(pathname)
      const loginUrl = new URL(`/login?redirect=${redirectPath}`, request.url)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  let user: UserTokenPayload | null = null

  try {
    // Decode the JWT token
    user = jwtDecode<UserTokenPayload>(token)
  } catch (error) {
    // Invalid token, clear it and redirect to login
    const response = NextResponse.redirect(new URL("/login", request.url))
    response.cookies.delete("userToken")
    return response
  }

  // Handle authentication routes - if user is logged in and tries to access login/signup
  if (AuthRoutes.includes(pathname)) {
    // Redirect based on role
    if (user.role === "USER") {
      return NextResponse.redirect(new URL("/user/dashboard", request.url))
    } else if (user.role === "SUPERADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    }
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Role-based routing for homepage
  // if (pathname === "/") {
  //   if (user.role === "USER") {
  //     return NextResponse.redirect(new URL("/user/dashboard", request.url))
  //   } else if (user.role === "SUPERADMIN") {
  //     return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  //   }
  // }

  // Check if user has access to the current route based on their role
  if (user.role && roleBasedRoutes[user.role as Role]) {
    const routes = roleBasedRoutes[user.role as Role]

    // Check if the current route matches any of the role-based routes
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next() // Allow access
    }
  }

  // // User doesn't have access to this route, redirect to appropriate dashboard
  // if (user.role === "USER") {
  //   return NextResponse.redirect(new URL("/user/dashboard", request.url))
  // } else if (user.role === "SUPERADMIN") {
  //   return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  // }

  // Fallback redirect to home
  return NextResponse.redirect(new URL("/", request.url))
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/information-materials",
    "/credentialing-information",
    "/create-form",
    "/user/:path*",
    "/admin/:path*",
  ],
}