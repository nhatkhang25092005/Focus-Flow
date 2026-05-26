import LoginHero from "../modules/auth/components/LoginHero"
import LoginForm from "../modules/auth/login/LoginForm"
export default function AuthPage() {
  return (
    <div className="flex-row flex h-screen overflow-hidden justify-center">
      <section className="w-6/9 pt-10 flex flex-col h-screen z-0">
        <LoginHero/>
      </section>
      <section className="z-10 p-10 flex flex-col w-3/9 gap-5 shadow-2xl">
        <header className="italic text-4xl font-bold font-virgil">FOCUS FLOW</header>
        <LoginForm/>
      </section>
    </div>
  )
}
