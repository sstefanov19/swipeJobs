"use client";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/Button";

export default function Header() {
  const { isSignedIn } = useUser();
  return (
    <header className="relative z-10 mb-10 flex h-[75px] flex-col items-center justify-between">
      <Link href="/">
        <h1 className="bg-gradient-to-r from-slate-400 to-slate-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
          SwipeHire
        </h1>
      </Link>
      <nav className="flex space-x-4">
        <Link
          href="/jobs"
          className="text-slate-800 transition-colors hover:text-white"
        >
          Jobs
        </Link>
        <Link
          href="/contact"
          className="text-slate-800 transition-colors hover:text-white"
        >
          Contact
        </Link>
        <Link
          href="/saved-jobs"
          className="text-slate-800 transition-colors hover:text-white"
        >
          Saved Jobs
        </Link>
      </nav>
      <div className="mr-2 flex space-x-2">
        {!isSignedIn && (
          <>
            <Button className="bg-gradient-to-r from-slate-600 to-slate-600 hover:from-blue-700 hover:to-purple-700">
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
