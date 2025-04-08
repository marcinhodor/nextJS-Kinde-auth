import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()

  if (isLoggedIn) {
    // Redirect to dashboard if logged in
    return redirect("/dashboard")
  }
  return (
    <div>
      <main className="flex min-h-screen items-center justify-center">
        <div className="">Main Page</div>
      </main>
    </div>
  )
}
