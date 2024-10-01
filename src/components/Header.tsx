"use client"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/Button";

export default function Header() {
  const { isSignedIn } = useUser();
  return (
    <header className="relative z-10 flex h-[75px] items-center justify-between">
      <Link href="/">
        <h1 className="bg-gradient-to-r from-slate-400 to-slate-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
          SwipeHire
        </h1>
      </Link>
      <nav className="hidden space-x-4 sm:flex">
        <Link
          href="/about"
          className="text-slate-600 transition-colors hover:text-white"
        >
          About
        </Link>
        <Link
          href="/employers"
          className="text-slate-600 transition-colors hover:text-white"
        >
          For Employers
        </Link>
        <Link
          href="/contact"
          className="text-blue-slate transition-colors hover:text-white"
        >
          Contact
        </Link>
      </nav>
      <div className="flex mr-2 space-x-2">
        {!isSignedIn && (
          <>
            <Button
              variant="ghost"
              className="text-blue-slate hover:text-white"
            >
              <SignInButton>Log in</SignInButton>
            </Button>
            <Button className="bg-gradient-to-r from-slate-600 to-slate-600 hover:from-blue-700 hover:to-purple-700">
              <SignUpButton>SignUp</SignUpButton>
            </Button>
          </>
        )}

        <UserButton />
      </div>
    </header>
  );
}
