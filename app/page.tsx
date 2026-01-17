import HeroSlider from '@/components/HeroSlider';
import Tagline from '@/components/Tagline';
import FeaturedWork from '@/components/FeaturedWork';
import Difference from '@/components/Difference';
import Services from '@/components/Services';
import Process from '@/components/Process';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <div className="-mt-14">
      {/* Sticky stacking only on md+ screens, normal flow on mobile */}
      <div className="relative z-[1] md:sticky md:top-0">
        <HeroSlider />
      </div>
      <div className="relative z-[2] md:sticky md:top-0 md:shadow-[0_-20px_60px_rgba(0,0,0,0.15)]">
        <Tagline />
      </div>
      <div className="relative z-[3] md:sticky md:top-0 md:shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
        <FeaturedWork />
      </div>
      {/* Difference has internal scroll-driven sticky - not in sticky stack */}
      <div className="relative z-[4]">
        <Difference />
      </div>
      <div className="relative z-[5] md:sticky md:top-0 md:shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
        <Services />
      </div>
      <div className="relative z-[6] md:sticky md:top-0 md:shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
        <Process />
      </div>
      <div className="relative z-[7] md:sticky md:top-0 md:shadow-[0_-20px_60px_rgba(0,0,0,0.2)]">
        <CTA />
      </div>
    </div>
  );
}
