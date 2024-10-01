import { Button } from "./Button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="flex flex-col justify-center text-center sm:text-left mb-16">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
        Swipe Your Way to Your Dream Career
      </h1>
      <p className="text-lg text-center sm:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl">
        SwipeHire revolutionizes job searching with AI-powered matching and a seamless, intuitive interface. Find your perfect job with just a swipe!
      </p>
      <Link href="/jobs" passHref>
        <Button size="lg" className="bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-500 hover:to-slate-400 text-white px-8 py-6">
          Start Your Journey <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      </Link>
    </div>
  )
}
