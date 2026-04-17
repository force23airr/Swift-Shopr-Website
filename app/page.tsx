import { Hero } from '@/components/home/hero';
import { StatsCounter } from '@/components/home/stats-counter';
import { FeaturesGrid } from '@/components/home/features-grid';
import { HowItWorks } from '@/components/home/how-it-works';
import { RetailerLogos } from '@/components/home/retailer-logos';
import { AppShowcase } from '@/components/home/app-showcase';
import { FinalCta } from '@/components/home/final-cta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <FeaturesGrid />
      <HowItWorks />
      <RetailerLogos />
      <AppShowcase />
      <FinalCta />
    </>
  );
}
