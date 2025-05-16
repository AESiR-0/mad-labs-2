'use client';

import Hero from '@/components/Hero';
import Engagement from '@/components/Engagement';
import Manifesto from '@/components/Manifesto';
import LaunchBlock from '@/components/LaunchBlock';
import CTA from '@/components/CTA';
import CommunityCall from '@/components/CommunityCall';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-[#f2f2f2]">
      <Hero />
      <Engagement />
      <Manifesto />
      <LaunchBlock />
      <CTA />
      <CommunityCall />
      <Footer />
    </main>
  );
}
