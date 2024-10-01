import { Search, UserPlus, Send } from "lucide-react"

type StepProps ={
    icon : React.ReactNode,
    title : string,
    description : string,
    number : string,
}


function Step({ icon, title, description, number } : StepProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </h3>
        <p className="text-slate-300">{description}</p>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold mb-8 text-center">How SwipeHire Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Step
          icon={<UserPlus className="w-6 h-6 text-slate-400" />}
          title="Create Your Profile"
          description="Sign up and build your professional profile with your skills, experience, and job preferences."
          number="1"
        />
        <Step
          icon={<Search className="w-6 h-6 text-slate-400" />}
          title="Discover Opportunities"
          description="Browse through AI-curated job listings tailored to your profile and preferences."
          number="2"
        />
        <Step
          icon={<Send className="w-6 h-6 text-slate-400" />}
          title="Swipe and Match"
          description="Swipe right on jobs you like, left on those you don't. Get instantly matched with interested employers."
          number="3"
        />
      </div>
    </div>
  )
}
