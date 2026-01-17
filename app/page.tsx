import HeroSlider from '@/components/HeroSlider';
import Tagline from '@/components/Tagline';
import Services from '@/components/Services';
import CaseStudies from '@/components/CaseStudies';
import Process from '@/components/Process';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <div className="-mt-14">
      {/* Each section is sticky so they stack as you scroll */}
      <div className="relative z-[1] sticky top-0">
        <HeroSlider />
      </div>
      <div className="relative z-[2] sticky top-0 shadow-[0_-20px_60px_rgba(0,0,0,0.15)]">
        <Tagline />
      </div>
      <div className="relative z-[3] sticky top-0 shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
        <Services />
      </div>
      <div className="relative z-[4] sticky top-0 shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
        <CaseStudies />
      </div>
      <div className="relative z-[5] sticky top-0 shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
        <Process />
      </div>
      <div className="relative z-[6] sticky top-0 shadow-[0_-20px_60px_rgba(0,0,0,0.2)]">
        <CTA />
      </div>
    </div>
  );
}
