"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { ArrowUpRight, MapPin, Plus } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Field, FieldLabel } from "@/components/ui/field"
import { ScheduleButton } from "@/components/site-shell"

const ServiceMap = dynamic(() => import("@/components/service-map"), { ssr: false, loading: () => <div className="map-loading">Loading North Texas…</div> })
const cityNames = ["Dallas", "Fort Worth", "Plano", "Frisco", "McKinney", "Irving", "Arlington", "Carrollton", "Richardson", "Allen"]
export function ServiceArea() {
  const [mapVisible, setMapVisible] = useState(false)
  const [selected, setSelected] = useState("")
  const [checking, setChecking] = useState(false)
  const element = useRef<HTMLDivElement>(null)
  useEffect(() => { const observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting) { setMapVisible(true); observer.disconnect() } }, { rootMargin: "200px" }); if (element.current) observer.observe(element.current); return () => observer.disconnect() }, [])
  return <section id="service-areas" className="service-area section-pad"><div className="area-copy" data-reveal><p className="eyebrow"><MapPin size={15} />LOCAL ISN’T JUST A LOCATION.</p><h2>Proudly serving<br />North Texas.</h2><p>We know the heat. We know the homes.<br />And we know what it means to be a good neighbor.</p><div className="city-list">{cityNames.map(city => <button key={city} onClick={() => { setSelected(city); setChecking(true) }} aria-pressed={selected === city}>{city}<ArrowUpRight size={14} /></button>)}</div><button className="text-action" onClick={() => setChecking(!checking)} aria-expanded={checking} aria-controls="area-checker">Check Your Service Area<ArrowUpRight size={18} /></button>{checking && <div id="area-checker" className="area-checker"><Field><FieldLabel htmlFor="area-city">Choose your city</FieldLabel><select id="area-city" value={selected} onChange={e => setSelected(e.target.value)}><option value="">Select a city</option>{cityNames.map(city => <option key={city}>{city}</option>)}<option>Another North Texas city</option></select></Field><p role="status">{selected ? cityNames.includes(selected) ? `${selected} is included in our illustrative service area. Real coverage would be confirmed before booking.` : "Outside the listed cities? A real service team would need to confirm your address and availability." : "Choose a city to explore the demo coverage."}</p></div>}<p className="fine-print">Illustrative service area. Not an actual coverage guarantee.</p></div><div className="area-map-frame" ref={element}>{mapVisible ? <ServiceMap selected={selected} /> : <div className="map-loading"><MapPin />Dallas–Fort Worth, Texas</div>}<div className="map-caption"><span className="status-dot" />Your home. Our neighborhood.</div></div></section>
}
const questions = [
  ["How quickly can you come out?", "Same-day appointments may be available, depending on your location, the issue, and technician schedules. A real service team would confirm a specific arrival window before dispatch. Availability shown here is illustrative."],
  ["Do you offer emergency HVAC service?", "This concept includes 24/7 emergency support. Northstar is fictional, so for an actual urgent issue, contact a licensed local HVAC provider. If you smell gas, leave the home and call your gas utility or emergency services from a safe location."],
  ["How do I know whether I should repair or replace my system?", "Consider your system’s age, repair history, comfort, and energy use. An in-home assessment can compare the repair cost with replacement options. You should receive clear explanations, not pressure to buy."],
  ["Do you service all HVAC brands?", "The concept covers most common residential heating and cooling systems. When booking with a real provider, share the brand and model so the team can confirm compatibility and parts availability."],
  ["Do you offer maintenance plans?", "Seasonal maintenance can include system checks, coil inspection, drain checks, and filter recommendations. A real provider would explain the exact scope, frequency, and price before you enroll."],
  ["Do you provide financing options?", "Flexible financing may be available for qualifying homeowners through a real provider. Terms, eligibility, and availability must be confirmed before applying. This demo offers no financing or credit decisions."],
  ["What areas do you serve?", "The illustrative service area includes Dallas, Fort Worth, Plano, Frisco, McKinney, Irving, Arlington, Carrollton, Richardson, and Allen. Actual coverage and appointment availability would be confirmed by the service team."],
]
export function FAQ() {
  return <section className="faq section-pad" id="faq"><div className="faq-intro" data-reveal><p className="eyebrow">CLEAR ANSWERS. LESS GUESSWORK.</p><h2>A few things<br />you might be<br />wondering.</h2><p>Still have a question?<br />Let&apos;s talk it through.</p><ScheduleButton variant="link" service="Other">Ask our team</ScheduleButton></div><Accordion className="faq-list" data-reveal>{questions.map(([question, answer], index) => <AccordionItem key={question} value={`faq-${index}`}><AccordionTrigger><span>{question}</span></AccordionTrigger><AccordionContent><p>{answer}</p></AccordionContent></AccordionItem>)}</Accordion></section>
}
