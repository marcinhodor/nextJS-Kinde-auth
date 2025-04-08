"use client"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components"

export function Header() {
  const { isAuthenticated, getUser } = useKindeBrowserClient()

  const user = getUser()

  return (
    <header>
      <div>{user ? user.email : "Not logged in"}</div>
      <div>
        {isAuthenticated ? (
          <LogoutLink>Logout</LogoutLink>
        ) : (
          <div>
            <LoginLink>Login</LoginLink>
            <RegisterLink>Register</RegisterLink>
          </div>
        )}
      </div>
    </header>
  )
}
