import HeroSection from "@/components/home/hero-section"
import EventsSection from "@/components/home/events-section"
import HowItWorks from "@/components/home/how-it-works"
import NewsletterSection from "@/components/home/newsletter-section"
import Container from "@/components/Container"

export default function Home() {
  return (
    <div>
       <HeroSection />
    <Container>    
     
      <EventsSection />
      <HowItWorks />
      <NewsletterSection />
    </Container>
    </div>
  )
}
