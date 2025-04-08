import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

export default async function Page() {
  // auth check
  const { isAuthenticated } = getKindeServerSession()
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login")
  }
  return (
    <div>
      <main className="flex min-h-screen items-center justify-center">
        <div className="">Dashboard Page</div>
      </main>
    </div>
  )
}
