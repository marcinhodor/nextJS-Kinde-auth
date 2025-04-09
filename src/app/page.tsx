import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()

  if (isLoggedIn) {
    // Redirect to dashboard if logged in
    return redirect("/chat")
  }
  return (
    <div>
      <main className="flex flex-col min-h-screen items-center justify-center">
        <div className="">Private ChatGPT</div>
        <div>
          <LoginLink>Login</LoginLink>
          <RegisterLink>Register</RegisterLink>
        </div>
      </main>
    </div>
  )
}
