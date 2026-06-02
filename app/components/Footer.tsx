import {Suspense} from 'react';
import {Await, Link} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* About column */}
        <div className="space-y-4 text-left">
          <h3 className="text-white font-serif font-bold text-lg tracking-wide uppercase border-b border-slate-800 pb-2">
            About Us
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/pages/about" className="hover:text-cyan-400 transition-colors">
                Who We Are
              </Link>
            </li>
            <li>
              <Link to="/pages/about" className="hover:text-cyan-400 transition-colors">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-cyan-400 transition-colors">
                Kalyan Jewellers Trust
              </Link>
            </li>
            <li>
              <Link to="/blogs/journal" className="hover:text-cyan-400 transition-colors">
                Press Room & Media
              </Link>
            </li>
          </ul>
        </div>

        {/* Products column */}
        <div className="space-y-4 text-left">
          <h3 className="text-white font-serif font-bold text-lg tracking-wide uppercase border-b border-slate-800 pb-2">
            Our Products
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/collections" className="hover:text-cyan-400 transition-colors">
                Solitaires
              </Link>
            </li>
            <li>
              <Link to="/collections" className="hover:text-cyan-400 transition-colors">
                Gold & Diamond Rings
              </Link>
            </li>
            <li>
              <Link to="/collections" className="hover:text-cyan-400 transition-colors">
                Chains of Charm
              </Link>
            </li>
            <li>
              <Link to="/collections" className="hover:text-cyan-400 transition-colors">
                Gold Coins & Bars
              </Link>
            </li>
          </ul>
        </div>

        {/* Services column */}
        <div className="space-y-4 text-left">
          <h3 className="text-white font-serif font-bold text-lg tracking-wide uppercase border-b border-slate-800 pb-2">
            Customer Services
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/" className="hover:text-cyan-400 transition-colors">
                Lifetime Exchange
              </Link>
            </li>
            <li>
              <Link to="/policies/refund-policy" className="hover:text-cyan-400 transition-colors">
                Easy 15-Day Returns
              </Link>
            </li>
            <li>
              <Link to="/policies/shipping-policy" className="hover:text-cyan-400 transition-colors">
                Free Insured Shipping
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-cyan-400 transition-colors">
                Bespoke Customization
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies column */}
        <div className="space-y-4 text-left">
          <h3 className="text-white font-serif font-bold text-lg tracking-wide uppercase border-b border-slate-800 pb-2">
            Policies
          </h3>
          <Suspense fallback={<p className="text-xs">Loading policies...</p>}>
            <Await resolve={footerPromise}>
              {(footer) => (
                <ul className="space-y-2.5 text-sm">
                  {(footer?.menu || FALLBACK_FOOTER_MENU).items.map((item) => {
                    if (!item.url) return null;
                    const url =
                      item.url.includes('myshopify.com') ||
                      item.url.includes(publicStoreDomain)
                        ? new URL(item.url).pathname
                        : item.url;
                    return (
                      <li key={item.id}>
                        <Link to={url} className="hover:text-cyan-400 transition-colors">
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Await>
          </Suspense>
        </div>

        {/* Newsletter column */}
        <div className="space-y-4 text-left">
          <h3 className="text-white font-serif font-bold text-lg tracking-wide uppercase border-b border-slate-800 pb-2">
            Newsletter
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Subscribe to receive exclusive deals, new collection previews, and early access events.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to our newsletter!');
              (e.target as HTMLFormElement).reset();
            }}
            className="flex flex-col gap-2.5"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="bg-slate-900 border border-slate-850 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Candere by Kalyan Jewellers. All rights reserved. Certified Gold & Diamond Online Shopping Store.
        </p>
        <div className="flex gap-4 text-slate-400 text-sm">
          <a href="#" className="hover:text-cyan-400 transition-colors">Facebook</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Instagram</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Pinterest</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
