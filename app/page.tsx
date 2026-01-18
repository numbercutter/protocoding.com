import HeroSlider from '@/components/HeroSlider';
import Tagline from '@/components/Tagline';
import FeaturedWork from '@/components/FeaturedWork';
import Difference from '@/components/Difference';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Portfolio from '@/components/Portfolio';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <div className="-mt-14">
      {/* Normal flow - no overlay stacking */}
      <HeroSlider />
      <Tagline />
      <FeaturedWork />
      
      {/* Difference keeps its own sticky scroll-hijacking behavior */}
      <Difference />
      
      <Services />
      <Process />
      <Portfolio />
      <CTA />
    </div>
  );
}
