import { Link } from 'react-router-dom';

function DynamicInsurance() {
  return (
    <div className="h-screen w-full bg-slate-950">
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2 text-xs font-bold uppercase tracking-widest text-slate-900 shadow-lg hover:bg-white"
        >
          Exit Showcase
        </Link>
      </div>

      <iframe
        title="Dynamic Insurance Mockup"
        src="/dynamic-website/index.html"
        className="h-full w-full border-0"
      />
    </div>
  );
}

export default DynamicInsurance;
