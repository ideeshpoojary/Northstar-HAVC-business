"use client"

import { createContext, useContext, useEffect, useState, type ReactNode, type FormEvent } from "react"
import { ArrowRight, Check, Menu, Phone, X, Asterisk } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const BookingContext = createContext<(service?: string) => void>(() => {})
const services = ["AC Repair", "AC Installation", "Heating / Furnace", "Maintenance", "Indoor Air Quality", "Emergency Service", "Other"]
const navigation = [["Services", "services"], ["Why Northstar", "why-northstar"], ["Service Areas", "service-areas"], ["Reviews", "reviews"], ["About", "about"]]

export function Brand({ light = false }: { light?: boolean }) {
  return <a href="#home" className={cn("brand", light && "brand-light")} aria-label="Northstar Heating and Air home"><Asterisk className="brand-mark" strokeWidth={1.4} aria-hidden="true" /><span><strong>NORTHSTAR<span className="brand-period">.</span></strong><small>HEATING & AIR</small></span></a>
}

export function ScheduleButton({ children = "Schedule Service", service, variant = "default", className }: { children?: ReactNode; service?: string; variant?: "default" | "outline" | "secondary" | "link"; className?: string }) {
  const open = useContext(BookingContext)
  return <Button variant={variant} className={cn("action-button", className)} onClick={() => open(service)}>{children}<ArrowRight data-icon="inline-end" aria-hidden="true" /></Button>
}

function BookingDialog({ open, onOpenChange, initialService }: { open: boolean; onOpenChange: (value: boolean) => void; initialService: string }) {
  const [submitted, setSubmitted] = useState(false)
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }
  useEffect(() => { if (open) setSubmitted(false) }, [open])
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="booking-dialog sm:max-w-xl max-h-[90dvh] overflow-y-auto">
    <DialogHeader><p className="eyebrow">A little closer to comfortable</p><DialogTitle>{submitted ? "You’ve tried the booking experience." : "Let’s take care of your home."}</DialogTitle><DialogDescription>{submitted ? "This was a demonstration. No service request was sent, no appointment was booked, and your details were not saved." : "Tell us what’s going on. This demo form does not send or save your information. Please use sample details."}</DialogDescription></DialogHeader>
    {submitted ? <div className="booking-confirmation"><span className="confirmation-icon"><Check aria-hidden="true" /></span><p>In a live website, the service team would follow up to confirm availability and discuss next steps.</p><Button className="action-button" onClick={() => onOpenChange(false)}>Back to Northstar<ArrowRight data-icon="inline-end" /></Button></div> : <form onSubmit={submit} className="booking-form">
      <FieldGroup><FieldGroup className="form-pair"><Field><FieldLabel htmlFor="booking-name">Name</FieldLabel><Input id="booking-name" name="name" placeholder="Your name" autoComplete="name" required minLength={2} maxLength={100} /></Field><Field><FieldLabel htmlFor="booking-phone">Phone</FieldLabel><Input id="booking-phone" name="phone" type="tel" autoComplete="tel" placeholder="(214) 555-0100" required pattern="[0-9+() .\-]{7,25}" maxLength={25} /></Field></FieldGroup>
      <Field><FieldLabel htmlFor="booking-email">Email</FieldLabel><Input id="booking-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required maxLength={254} /></Field>
      <FieldGroup className="form-pair"><Field><FieldLabel htmlFor="booking-service">Service needed</FieldLabel><select id="booking-service" name="service" defaultValue={initialService || "AC Repair"} required>{services.map(s => <option key={s}>{s}</option>)}</select></Field><Field><FieldLabel htmlFor="booking-time">Preferred appointment time</FieldLabel><select id="booking-time" name="time" defaultValue="" required><option value="" disabled>Select a preference</option><option>As soon as possible</option><option>Weekday morning</option><option>Weekday afternoon</option><option>Weekend</option></select></Field></FieldGroup>
      <Field><FieldLabel htmlFor="booking-message">What can we help with? <span className="optional">(optional)</span></FieldLabel><Textarea id="booking-message" name="message" placeholder="Tell us a little about your system…" maxLength={2000} rows={3} /></Field>
      <Button type="submit" className="action-button w-full">Request Service<ArrowRight data-icon="inline-end" /></Button><p className="fine-print">Demo only. Northstar is a fictional company. For a real emergency, contact a licensed local provider.</p>
      </FieldGroup></form>}
  </DialogContent></Dialog>
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [initialService, setInitialService] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  function openBooking(service = "AC Repair") { setInitialService(service); setBookingOpen(true); setMenuOpen(false) }
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target) } }), { threshold: 0.08 })
    document.querySelectorAll("[data-reveal]").forEach(element => { element.classList.add("reveal-ready"); observer.observe(element) })
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect() }
  }, [])
  return <BookingContext.Provider value={openBooking}>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="announcement"><span>YOUR NEIGHBORS IN HOME COMFORT. <span className="announcement-location">DALLAS–FORT WORTH, TX</span></span><span className="announcement-right"><span className="status-dot" />24/7 emergency service <span className="demo-chip">DEMO SITE</span></span></div>
    <header className={cn("site-header", scrolled && "is-scrolled")}><div className="nav-container"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav><div className="nav-actions"><a className="header-phone" href="tel:+12145550147"><Phone size={15} aria-hidden="true" />(214) 555-0147</a><ScheduleButton /><button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div></div>
    {menuOpen && <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">{navigation.map(([label, id]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}<ArrowRight size={18} /></a>)}<a href="tel:+12145550147">Call (214) 555-0147<Phone size={18} /></a></nav>}</header>
    {children}
    <div className="mobile-contact"><a href="tel:+12145550147"><Phone size={18} aria-hidden="true" />Call Now</a><ScheduleButton /></div>
    <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} initialService={initialService} />
  </BookingContext.Provider>
}

export function LegalLinks() {
  const [kind, setKind] = useState<"Privacy" | "Terms" | null>(null)
  return <><div className="legal-links"><button onClick={() => setKind("Privacy")}>Privacy</button><button onClick={() => setKind("Terms")}>Terms</button></div><Dialog open={!!kind} onOpenChange={open => { if (!open) setKind(null) }}><DialogContent><DialogHeader><DialogTitle>{kind === "Privacy" ? "Privacy, simply put." : "About this demonstration."}</DialogTitle><DialogDescription>{kind === "Privacy" ? "The demo booking form does not transmit or store your entries. The interactive map loads third-party tiles from OpenStreetMap, which receives your IP address when the map is displayed. Hosting may collect basic traffic analytics. Please do not enter sensitive personal information." : "Northstar Heating & Air is a fictional agency design concept. All testimonials, ratings, service claims, staff imagery, phone numbers, and coverage are illustrative, not verified. Images are AI-generated. No real service, financing, appointment, or contractual offer is available through this site."}</DialogDescription></DialogHeader></DialogContent></Dialog></>
}
