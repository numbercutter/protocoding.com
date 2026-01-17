import HeroSlider from '@/components/HeroSlider';
import Tagline from '@/components/Tagline';
import Services from '@/components/Services';
import CaseStudies from '@/components/CaseStudies';
import Process from '@/components/Process';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <div className="-mt-14">
      <HeroSlider />
      <Tagline />
      <Services />
      <CaseStudies />
      <Process />
      <CTA />
    </div>
  );
}
