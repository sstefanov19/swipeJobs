
import CallToAction from "~/components/CallToAction";
import FeatureList from "~/components/FeautureList";
import Hero from "~/components/Hero";
import HowItWorks from "~/components/HowItWorks";
import Testimonials from "~/components/Testemonials";

export default function Introduction() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
    <div className="relative container mx-auto px-4 py-16 sm:py-24">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-slate-500 opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-slate-400 opacity-5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

      <main className="relative z-10">
        <Hero />
        <FeatureList />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
      </main>
    </div>
  </div>
)
}
