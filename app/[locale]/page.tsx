import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import VMV from '@/components/sections/VMV';
import Services from '@/components/sections/Services';
import Stats from '@/components/sections/Stats';
import Contact from '@/components/sections/Contact';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <Hero />
      <About />
      <VMV />
      <Services locale={locale} />
      <Stats />
      <Contact />
    </>
  );
}
