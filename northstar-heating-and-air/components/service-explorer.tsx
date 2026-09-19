"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, Snowflake, Flame, Wind, Wrench, ShieldCheck, Clock3, ChevronLeft, ChevronRight, Star, MoveHorizontal } from "lucide-react"
import { ScheduleButton } from "@/components/site-shell"
import { cn } from "@/lib/utils"

const services = [
  { title: "AC Repair", description: "Restore cool, comfortable air without the runaround.", image: "ac-system", alt: "A modern outdoor air conditioning system beside a limestone home", icon: Snowflake, detail: "WARM AIR? STRANGE SOUNDS? WE’LL GET TO THE SOURCE.", booking: "AC Repair" },
  { title: "AC Installation", description: "Efficient systems designed around your home. Not the other way around.", image: "after", alt: "A cleanly installed high-efficiency residential air conditioner", icon: Wind, detail: "THE RIGHT FIT. FOR YOUR HOME AND YOUR EVERYDAY.", booking: "AC Installation" },
  { title: "Heating & Furnace", description: "Reliable warmth when North Texas gets cold.", image: "heating", alt: "A professionally installed furnace in a clean home utility space", icon: Flame, detail: "COOL NIGHTS OUTSIDE. COMFORTABLE MOMENTS INSIDE.", booking: "Heating / Furnace" },
  { title: "HVAC Maintenance", description: "Prevent problems before they become emergencies.", image: "technician", alt: "An HVAC technician carefully checking a residential system", icon: Wrench, detail: "A LITTLE ATTENTION NOW. MORE PEACE OF MIND LATER.", booking: "Maintenance" },
  { title: "Indoor Air Quality", description: "Cleaner, healthier air throughout your home.", image: "clean-air", alt: "A clean air vent and sunlit linen curtains in a fresh interior", icon: ShieldCheck, detail: "COMFORT IS ABOUT MORE THAN THE TEMPERATURE.", booking: "Indoor Air Quality" },
  { title: "Emergency Service", description: "When comfort can’t wait until tomorrow.", image: "evening-home", alt: "A warm and comfortable home in the evening", icon: Clock3, detail: "A REAL PERSON. A CLEAR NEXT STEP. DAY OR NIGHT.", booking: "Emergency Service" },
]

export function ServiceExplorer() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const service = services[active]
  function moveTab(index: number) { const next = (index + services.length) % services.length; setActive(next); tabs.current[next]?.focus() }
  return <section id="services" className="services section-pad"><div className="section-heading" data-reveal><div><p className="eyebrow">ONE HOME. EVERY SEASON.</p><h2>Whatever the<br />season brings.</h2></div><p>From the first hot day to that unexpected freeze,<br className="desktop-break" /> we keep your kind of comfortable, constant.</p></div>
    <div className="service-layout" data-reveal><div className="service-tabs" role="tablist" aria-label="Explore HVAC services" aria-orientation="vertical">{services.map((item, index) => { const Icon = item.icon; return <button key={item.title} ref={el => { tabs.current[index] = el }} id={`service-tab-${index}`} role="tab" aria-selected={active === index} aria-controls={`service-panel-${index}`} tabIndex={active === index ? 0 : -1} className={cn("service-tab", active === index && "active")} onClick={() => setActive(index)} onKeyDown={e => { if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); moveTab(active + 1) } if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); moveTab(active - 1) } if (e.key === "Home") { e.preventDefault(); moveTab(0) } if (e.key === "End") { e.preventDefault(); moveTab(services.length - 1) } }}><Icon size={21} strokeWidth={1.5} aria-hidden="true" /><span>{item.title}</span><ArrowUpRight size={20} aria-hidden="true" /></button> })}</div>
    <div className="service-canvas" role="tabpanel" id={`service-panel-${active}`} aria-labelledby={`service-tab-${active}`} tabIndex={0}><div className="service-photo"><Image key={service.image} src={`/images/${service.image}.png`} alt={service.alt} fill sizes="(max-width: 760px) 100vw, 60vw" className="image-crossfade" /><span className="image-kicker">THE NORTHSTAR STANDARD</span><span className="service-counter">0{active + 1}<span> / 06</span></span></div><div className="service-caption" key={active}><div><p className="eyebrow">{service.detail}</p><h3>{service.description}</h3></div><ScheduleButton service={service.booking} variant="link">Let&apos;s take care of it</ScheduleButton></div></div></div>
  </section>
}

const reviews = [
  { quote: "Our AC went out during one of the hottest weeks of the year. Northstar had someone at our house the same day, explained the problem clearly, and had us back up and running.", name: "Sarah M.", city: "Frisco, TX", service: "AC repair" },
  { quote: "We thought we needed a whole new system. The technician walked us through what was actually wrong and explained a repair option. No pressure, just a conversation we could understand.", name: "James R.", city: "Plano, TX", service: "System diagnosis" },
  { quote: "The upstairs bedrooms never felt as comfortable as the rest of the house. They took the time to check the airflow and explain the changes. It finally feels balanced.", name: "Michelle T.", city: "Dallas, TX", service: "Comfort assessment" },
]

export function Reviews() {
  const [active, setActive] = useState(0)
  const review = reviews[active]
  return <section id="reviews" className="reviews section-pad"><div className="review-intro" data-reveal><p className="eyebrow">FROM ONE NEIGHBOR TO ANOTHER</p><h2>Comfort is personal.<br />So is trust.</h2><div className="review-rating"><strong>4.9<span> / 5</span></strong><div><div className="stars" aria-hidden="true">{[0,1,2,3,4].map(n => <Star key={n} size={16} fill="currentColor" />)}</div><p>300+ reviews · Demo figures</p></div></div><p className="fine-print">Illustrative stories, not real customer reviews.<br />Thousands of service visits — example brand claim.</p></div><div className="review-story" data-reveal><span className="quote-mark" aria-hidden="true">“</span><div aria-live="polite" aria-atomic="true" key={active} className="review-copy"><blockquote>{review.quote}</blockquote><div className="review-author"><span className="review-avatar" aria-hidden="true">{review.name.charAt(0)}</span><div><strong>{review.name}</strong><span>{review.city} · {review.service}</span></div><span className="sample-label">SAMPLE REVIEW</span></div></div><div className="review-controls"><span>0{active + 1}<span> / 03</span></span><div><button aria-label="Previous review" onClick={() => setActive((active + 2) % 3)}><ChevronLeft size={20} /></button><button aria-label="Next review" onClick={() => setActive((active + 1) % 3)}><ChevronRight size={20} /></button></div></div></div></section>
}

export function Transformation() {
  const [position, setPosition] = useState(50)
  return <section className="transformation section-pad"><div className="section-heading" data-reveal><div><p className="eyebrow">THE DIFFERENCE IS SOMETHING YOU FEEL</p><h2>From uncomfortable<br />to effortless.</h2></div><p>A quieter system. A cleaner installation.<br />One less thing on your mind.</p></div><div className="comparison" data-reveal><Image src="/images/after.png" alt="Illustrative after: a new air conditioning unit with a clean, organized installation" fill sizes="(max-width: 760px) 100vw, 85vw" /><div className="comparison-before" style={{ clipPath: `inset(0 ${100-position}% 0 0)` }}><Image src="/images/before.png" alt="Illustrative before: an older air conditioner with weathered grilles" fill sizes="(max-width: 760px) 100vw, 85vw" /></div><span className="comparison-label before-label">BEFORE <span>Outdated. Overworked.</span></span><span className="comparison-label after-label">AFTER <span>A fresh start.</span></span><div className="comparison-handle" style={{ left: `${position}%` }} aria-hidden="true"><span><MoveHorizontal size={23} /></span></div><input className="comparison-range" type="range" min="5" max="95" value={position} onChange={e => setPosition(Number(e.target.value))} aria-label="Compare before and after installation" aria-valuetext={`${position}% before image visible`} /></div><div className="comparison-footnote"><span><MoveHorizontal size={16} />Drag to feel the difference</span><span>Illustrative installation · AI-generated imagery</span></div></section>
}
