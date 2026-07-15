import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { TrustSection } from '@/components/trust-section';
import { HowItWorks } from '@/components/how-it-works';
import { IntegrationsSection } from '@/components/integrations-section';
import { DashboardPreview } from '@/components/dashboard-preview';
import { FeaturesSection } from '@/components/features-section';
import { FinalCTA } from '@/components/final-cta';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <HowItWorks />
        <IntegrationsSection />
        <DashboardPreview />
        <FeaturesSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
