'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AdvantagesSection from '@/components/sections/AdvantagesSection';
import MonitoringSection from '@/components/sections/MonitoringSection';
import CoverageSection from '@/components/sections/CoverageSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';

// Load DroneScene only on client — Three.js requires browser APIs
const DroneScene = dynamic(() => import('@/components/DroneScene'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <>
      {/* <DroneScene /> */}
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AdvantagesSection />
        <MonitoringSection />
        <CoverageSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
