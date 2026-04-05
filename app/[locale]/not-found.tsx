import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-blue-500/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">الصفحة غير موجودة</h1>
        <p className="text-slate-400 mb-8">Page Not Found</p>
        <Link
          href="/ar"
          className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
