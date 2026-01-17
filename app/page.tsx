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
      {/* Sticky stacking with scroll padding (pb-[20vh]) to keep sections visible longer */}
      <div className="relative z-[1] md:sticky md:top-0 md:pb-[20vh]">
        <HeroSlider />
      </div>
      <div className="relative z-[2] md:sticky md:top-0 md:pb-[20vh] md:shadow-[0_-20px_60px_rgba(0,0,0,0.15)]">
        <Tagline />
      </div>
      <div className="relative z-[3] md:sticky md:top-0 md:pb-[20vh] md:shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
        <FeaturedWork />
      </div>
      
      {/* Difference has its own scroll-hijacking behavior - NOT part of sticky stack */}
      <div className="relative z-[4]">
        <Difference />
      </div>
      
      {/* Resume sticky stacking */}
      <div className="relative z-[5] md:sticky md:top-0 md:pb-[20vh] md:shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
        <Services />
      </div>
      <div className="relative z-[6] md:sticky md:top-0 md:pb-[20vh] md:shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
        <Process />
      </div>
      <div className="relative z-[7] md:sticky md:top-0 md:shadow-[0_-20px_60px_rgba(0,0,0,0.2)]">
        <CTA />
      </div>
    </div>
  );
}
