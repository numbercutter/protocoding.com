import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin } from 'lucide-react';

const LINKS = {
  Product: [{ label: 'Services', href: '/services' }, { label: 'Pricing', href: '/pricing' }],
  Company: [{ label: 'About', href: '/about' }, { label: 'Careers', href: '/careers' }, { label: 'Contact', href: '/contact' }],
  Legal: [{ label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' }],
};

export default function Footer() {
  return (
    <footer className="material-inset">
      <div className="grid grid-cols-2 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1 p-8 cell material">
          <Link href="/" className="inline-block mb-4">
            <Image src="/logo.svg" alt="Protocoding" width={100} height={20} className="h-4 w-auto" />
          </Link>
          <p className="text-[11px] text-gray-400 mb-4">Building software that matters.</p>
          <div className="space-y-2">
            <a href="mailto:hello@protocoding.com" className="flex items-center gap-2 text-[10px] text-gray-400 hover:text-gray-600 font-bold">
              <Mail size={10} /> hello@protocoding.com
            </a>
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
              <MapPin size={10} /> San Francisco, CA
            </div>
          </div>
        </div>

        {Object.entries(LINKS).map(([title, links]) => (
          <div key={title} className="p-8 cell material">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">{title}</h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[11px] text-gray-500 hover:text-gray-900 font-semibold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="py-5 px-8 cell material-elevated">
        <p className="text-[10px] text-gray-400 font-bold">© {new Date().getFullYear()} Protocoding, Inc.</p>
      </div>
    </footer>
  );
}
