import HeroSlider from '@/components/HeroSlider';
import Tagline from '@/components/Tagline';
import Services from '@/components/Services';
import Stats from '@/components/Stats';
import CaseStudies from '@/components/CaseStudies';
import Process from '@/components/Process';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <div className="-mt-14">
      {/* Each section stacks on top of the previous as you scroll */}
      <div className="section-stack z-10">
        <HeroSlider />
      </div>
      <div className="section-stack z-20 shadow-[0_-20px_60px_rgba(0,0,0,0.15)]">
        <Tagline />
      </div>
      <div className="section-stack z-30 shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
        <Services />
      </div>
      <div className="section-stack z-40 shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
        <CaseStudies />
      </div>
      <div className="section-stack z-50 shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
        <Process />
      </div>
      <div className="section-stack z-[60] shadow-[0_-20px_60px_rgba(0,0,0,0.2)]">
        <CTA />
      </div>
    </div>
  );
}
