import { Briefcase, Zap, ThumbsUp, ChevronRight } from "lucide-react"

type FeatureProps = {
    title : string,
    description : string,
    icon : React.ReactNode,
}

function FeatureCard({ icon, title , description } : FeatureProps)  {
    return (
        <div className="bg-slate-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-4 sm:p-6 transform transition-all duration-300 hover:scale-105 hover:bg-opacity-70">
          <div className="flex items-center space-x-3 sm:space-x-4">
            {icon}
            <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
          </div>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base text-slate-300">{description}</p>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 mt-2 sm:mt-4" />
        </div>
      )
    }

    export default function FeatureList() {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
          <FeatureCard
            icon={<Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />}
            title="AI-Curated Opportunities"
            description="Our advanced AI tailors job recommendations to your unique skills and aspirations."
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />}
            title="Lightning-Fast Applications"
            description="Apply to jobs with a single swipe. Your profile does the talking."
          />
          <FeatureCard
            icon={<ThumbsUp className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />}
            title="Real-Time Matching"
            description="Get instant notifications when you match with your ideal employer."
          />
        </div>
      )
    }
