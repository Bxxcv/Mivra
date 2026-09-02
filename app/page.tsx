import Navbar from '@/components/marketing/Navbar';
import Hero from '@/components/marketing/Hero';
import TrustBar from '@/components/marketing/TrustBar';
import ProductOverview from '@/components/marketing/ProductOverview';
import CoreFeatures from '@/components/marketing/CoreFeatures';
import ProductShowcase from '@/components/marketing/ProductShowcase';
import UseCases from '@/components/marketing/UseCases';
import Customization from '@/components/marketing/Customization';
import Commerce from '@/components/marketing/Commerce';
import Analytics from '@/components/marketing/Analytics';
import AISupport from '@/components/marketing/AISupport';
import Pricing from '@/components/marketing/Pricing';
import FinalCTA from '@/components/marketing/FinalCTA';
import Footer from '@/components/marketing/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ProductOverview />
        <CoreFeatures />
        <ProductShowcase />
        <UseCases />
        <Customization />
        <Commerce />
        <Analytics />
        <AISupport />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
