"use client"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"

export function Header() {
  const { isAuthenticated, getUser } = useKindeBrowserClient()

  const user = getUser()

  return (
    <header className="bg-zinc-800 h-8 flex px-4 justify-between items-center">
      <div>{user ? user.email : "Not logged in"}</div>
      <div>{isAuthenticated ? <LogoutLink>Logout</LogoutLink> : null}</div>
    </header>
  )
}
