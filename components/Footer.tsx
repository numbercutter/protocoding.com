import Link from 'next/link';
import Image from 'next/image';

const LINKS = {
  Explore: [
    { label: 'Services', href: '/services' },
    { label: 'Industries', href: '/industries' },
    { label: 'Insights', href: '/insights' },
  ],
  Work: [
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Case Studies', href: '/insights?topic=case-studies' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Team', href: '/about/team' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="section-row">
      {/* Left gutter */}
      <div className="gutter-left" />
      
      {/* Content */}
      <div className="material-inset">
        <div className="grid grid-cols-2 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1 p-8 cell material">
            <Link href="/" className="inline-block mb-4">
              <Image src="/brand/logo_horizontal.svg" alt="Protocoding" width={140} height={32} className="h-5 w-auto invert" />
            </Link>
            <p className="text-sm text-gray-500 mb-4">Building software that matters.</p>
            <div className="space-y-2">
              <a href="mailto:hello@protocoding.com" className="block text-sm text-gray-500 hover:text-gray-700 font-medium">
                hello@protocoding.com
              </a>
              <p className="text-sm text-gray-500 font-medium">
                San Francisco, CA
              </p>
            </div>
          </div>

          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title} className="p-8 cell material">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-600 hover:text-gray-900 font-semibold">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-5 px-8 material-elevated border-t border-black/[0.08]">
          <p className="text-sm text-gray-500 font-medium">© {new Date().getFullYear()} Protocoding, Inc.</p>
        </div>
      </div>
      
      {/* Right gutter */}
      <div className="gutter-right" />
    </footer>
  );
}
