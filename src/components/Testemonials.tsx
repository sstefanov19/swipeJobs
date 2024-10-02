import Image from "next/image"

type TestemonialCardProps = {
    name: string
    role: string
    company: string
    quote: string
    imageSrc: string
}

function TestimonialCard({ name, role, company, quote, imageSrc } : TestemonialCardProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <Image
          src={imageSrc}
          alt={name}
          width={50}
          height={50}
          className="rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-slate-400 text-sm">{role} at {company}</p>
        </div>
      </div>
      <p className="text-slate-300 italic">&quot;{quote}&quot;</p>
    </div>
  )
}

export default function Testimonials() {
  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TestimonialCard
          name="Alex Johnson"
          role="Software Engineer"
          company="TechCorp"
          quote="SwipeHire made job hunting fun and efficient. I found my dream job in just a week!"
          imageSrc="/placeholder.svg?height=50&width=50"
        />
        <TestimonialCard
          name="Sarah Lee"
          role="Marketing Manager"
          company="BrandBoost"
          quote="The AI-powered matches were spot-on. It's like the app knew exactly what I was looking for."
          imageSrc="/placeholder.svg?height=50&width=50"
        />
      </div>
    </div>
  )
}
