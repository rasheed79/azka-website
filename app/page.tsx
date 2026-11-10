import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

const title = 'أزكى الوطنية لتقنية المعلومات | Azka IT';
const description = 'أزكى الوطنية لتقنية المعلومات — نزودكم بأحدث حلول تقنية المعلومات منذ عام 1409هـ';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.azka.com'),
  title,
  description,
  openGraph: { title, description, type: 'website', locale: 'ar_SA', siteName: 'Azka IT', images: ['/og-image.jpg'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] },
};

export default function RootPage() {
  redirect('/ar');
}
