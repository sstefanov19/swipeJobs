import { Button } from "./Button"
import Link from "next/link"

export default function CallToAction() {
  return (
    <div className="mt-20 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Job?</h2>
      <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
        Join thousands of professionals who have already discovered their dream careers through SwipeHire. Start swiping towards your future today!
      </p>
      <Link href="/signup" passHref>
        <Button size="lg" className="bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-500 hover:to-slate-400 text-white px-8 py-6">
          Sign Up Now
        </Button>
      </Link>
    </div>
  )
}
