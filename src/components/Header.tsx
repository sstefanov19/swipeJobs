import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import  {Button}  from "~/components/Button"

export default function Header() {

   const {isSignedIn} =  useUser()
  return (

    <header className="relative h-[75px] z-10 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">
          SwipeHire
        </h1>
      </Link>
      <nav className="hidden sm:flex space-x-4">
        <Link href="/about" className="text-slate-600 hover:text-white transition-colors">
          About
        </Link>
        <Link href="/employers" className="text-slate-600 hover:text-white transition-colors">
          For Employers
        </Link>
        <Link href="/blog" className="text-blue-slate hover:text-white transition-colors">
          Blog
        </Link>
      </nav>
      <div className="flex space-x-2">
        {!isSignedIn && (
            <><Button variant="ghost" className="text-blue-slate hover:text-white">
                      <SignInButton>
                          Log in
                      </SignInButton>
                  </Button><Button className="bg-gradient-to-r from-slate-600 to-slate-600 hover:from-blue-700 hover:to-purple-700">
                          <SignUpButton>
                              SignUp
                          </SignUpButton>
                      </Button></>
        )}
        {isSignedIn && (
            <UserButton />
        )}
      </div>
    </header>
  )
}
