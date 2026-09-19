import Image from "next/image"
import { ArrowDown, Clock3, MapPin, Phone, ShieldCheck, Star, ThermometerSun, Wind, Check } from "lucide-react"
import { ScheduleButton } from "@/components/site-shell"

export function Hero() {
  return <><section className="hero" id="home" aria-labelledby="hero-title">
    <Image src="/images/comfort-home.png" alt="A sunlit Dallas home with a comfortable linen sofa, natural stone, and a view of the garden" fill priority sizes="100vw" className="hero-image" quality={85} />
    <div className="hero-shade" />
    <div className="hero-content"><p className="eyebrow hero-eyebrow"><span className="small-rule" />COMFORT, WHEN YOU NEED IT MOST.</p><h1 id="hero-title">Your home<br />should feel<br /><span>right.</span></h1><p className="hero-description">Fast, dependable heating and cooling service<br className="desktop-break" /> for homes across Dallas–Fort Worth.</p><div className="hero-actions"><ScheduleButton /><a href="tel:+12145550147" className="hero-call"><Phone size={17} aria-hidden="true" /><span>Call (214) 555-0147</span></a></div>
    <div className="hero-trust"><div className="stars" aria-label="Illustrative rating: 4.9 out of 5">{[0,1,2,3,4].map(n => <Star key={n} size={14} fill="currentColor" strokeWidth={1} />)}</div><p><strong>4.9</strong><span className="trust-divider" />300+ local homeowners served<span className="trust-demo">Demo rating</span></p></div></div>
    <div className="climate-note" aria-label="Illustrative indoor and outdoor temperature"><div><ThermometerSun size={18} /><span>TEXAS OUTSIDE</span><strong>98°</strong></div><div><Wind size={18} /><span>NORTHSTAR INSIDE</span><strong>72°</strong></div><p><span className="status-dot" />Right where you want to be.</p></div>
    <div className="hero-bottom"><span><MapPin size={14} />ROOTED IN NORTH TEXAS.</span><a href="#comfort-story">A little more comfortable starts here<ArrowDown size={17} /></a><span className="hero-coordinate">32.7767° N &nbsp; 96.7970° W</span></div>
  </section><div className="assurance-strip"><div><Clock3 /><span>Same-day service available</span></div><div><ShieldCheck /><span>Licensed & experienced technicians*</span></div><div><Check /><span>Clear answers. No surprises.</span></div><div><MapPin /><span>Locally focused. Homeowner first.</span></div></div></>
}
