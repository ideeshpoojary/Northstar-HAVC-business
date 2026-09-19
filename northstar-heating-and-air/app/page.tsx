import { SiteProvider } from "@/components/site-shell"
import { Hero } from "@/components/hero"
import { ComfortStory, Approach, People, Financing, FinalCTA, Footer } from "@/components/story-sections"
import { ServiceExplorer, Reviews, Transformation } from "@/components/service-explorer"
import { ServiceArea, FAQ } from "@/components/area-and-faq"

export default function Page() {
  return <SiteProvider><main id="main"><Hero /><ComfortStory /><ServiceExplorer /><Approach /><People /><Reviews /><Transformation /><Financing /><ServiceArea /><FAQ /><FinalCTA /></main><Footer /></SiteProvider>
}
