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
    <footer className="bg-[#060a13] text-white pt-16 pb-0 font-sans">
      {/* Get In The Know Section */}
      <div className="max-w-[1180px] mx-auto px-6 text-center mb-16">
        <h2 className="text-white text-6xl font-light leading-none mb-6">Get In The Know</h2>
        <p className="text-white text-[13px] mb-8 max-w-3xl mx-auto">
          Sign up to our newsletter for information on sales, delightful content and new additions to the collection. :
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Thank you for subscribing!');
            (e.target as HTMLFormElement).reset();
          }}
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            className="bg-[#121724] border border-transparent text-white rounded-full px-6 py-3 text-[12px] w-full md:w-[200px] focus:ring-1 focus:ring-white outline-none placeholder:text-[#777f92]"
          />
          <input
            type="tel"
            placeholder="Your mobile number"
            className="bg-[#121724] border border-transparent text-white rounded-full px-6 py-3 text-[12px] w-full md:w-[200px] focus:ring-1 focus:ring-white outline-none placeholder:text-[#777f92]"
          />
          <button
            type="submit"
            className="bg-white text-black font-semibold px-7 py-3 rounded-full text-[11px] uppercase tracking-[0.15em] hover:bg-gray-200 transition-colors"
          >
            Subscribe Now
          </button>
        </form>
      </div>

      {/* Main Footer Links Grid */}
      <div className="max-w-[1180px] mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-12 pb-16">
        {/* ABOUT US */}
        <div className="space-y-5">
          <h3 className="text-white font-medium text-[15px] uppercase tracking-wide">About Us</h3>
          <ul className="space-y-2.5 text-[13px] text-white">
            <li><Link to="/pages/about" className="text-white hover:text-white transition-colors">About Our Company</Link></li>
            <li><Link to="/policies/terms-of-service" className="text-white hover:text-white transition-colors">Terms and Conditions</Link></li>
            <li><Link to="/policies/privacy-policy" className="text-white hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/pages/faq" className="text-white hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/pages/offers-tc" className="text-white hover:text-white transition-colors">Offers T&Cs</Link></li>
            <li><Link to="/pages/reviews" className="text-white hover:text-white transition-colors">Customer Reviews</Link></li>
            <li><Link to="/sitemap" className="text-white hover:text-white transition-colors">Sitemap</Link></li>
          </ul>
        </div>

        {/* WHY CANDERE? */}
        <div className="space-y-5">
          <h3 className="text-white font-medium text-[15px] uppercase tracking-wide">Why Candere?</h3>
          <ul className="space-y-2.5 text-[13px] text-white">
            <li><Link to="/policies/refund-policy" className="text-white hover:text-white transition-colors">15-Day Returns</Link></li>
            <li><Link to="/policies/refund-policy" className="text-white hover:text-white transition-colors">Cancel & Refund</Link></li>
            <li><Link to="/" className="text-white hover:text-white transition-colors">Lifetime Exchange</Link></li>
            <li><Link to="/" className="text-white hover:text-white transition-colors">Certified Jewellery</Link></li>
            <li><Link to="/" className="text-white hover:text-white transition-colors">Candere Wallet</Link></li>
          </ul>
        </div>

        {/* EXPERIENCE CANDERE */}
        <div className="space-y-5">
          <h3 className="text-white font-medium text-[15px] uppercase tracking-wide">Experience Candere</h3>
          <ul className="space-y-2.5 text-[13px] text-white">
            <li><Link to="/" className="text-white hover:text-white transition-colors">Refer And Earn</Link></li>
            <li><Link to="/" className="text-white hover:text-white transition-colors">Video Gallery</Link></li>
            <li><Link to="/account/orders" className="text-white hover:text-white transition-colors">Order Tracking</Link></li>
            <li><Link to="/" className="text-white hover:text-white transition-colors">Virtual Try On</Link></li>
          </ul>
        </div>

        {/* JEWELLERY GUIDES */}
        <div className="space-y-5">
          <h3 className="text-white font-medium text-[15px] uppercase tracking-wide">Jewellery Guides</h3>
          <ul className="space-y-2.5 text-[13px] text-white">
            <li><Link to="/" className="text-white hover:text-white transition-colors">Diamond Education</Link></li>
            <li><Link to="/" className="text-white hover:text-white transition-colors">Gemstone Education</Link></li>
            <li><Link to="/" className="text-white hover:text-white transition-colors">Metal Education</Link></li>
            <li><Link to="/" className="text-white hover:text-white transition-colors">Size Guide</Link></li>
            <li><Link to="/" className="text-white hover:text-white transition-colors">Gold Rate Guide</Link></li>
            <li><Link to="/" className="text-white hover:text-white transition-colors">Jewellery Care</Link></li>
          </ul>
        </div>

        {/* CONTACT US */}
        <div className="space-y-5">
          <h3 className="text-white font-medium text-[15px] uppercase tracking-wide">Contact Us</h3>
          <ul className="space-y-2.5 text-[13px] text-white">
            <li className="text-white">
              India +91 22 61066262
              <span className="block text-white mt-1">(9am-7pm, 6 days a week)</span>
            </li>
            <li>
              <a href="mailto:support@candere.com" className="text-white hover:text-white transition-colors">support@candere.com</a>
            </li>
            <li><Link to="/" className="text-white hover:text-white transition-colors">Find Experience Centre</Link></li>
            <li><Link to="/" className="text-white hover:text-white transition-colors">Kalyan Store Locator</Link></li>
            <li><a href="https://www.kalyanjewellers.net" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors">Kalyan Jewellers Website</a></li>
          </ul>
        </div>

        {/* FOLLOW US */}
        <div className="space-y-5">
          <h3 className="text-white font-medium text-[15px] uppercase tracking-wide">Follow Us</h3>
          <div className="flex flex-wrap gap-3 max-w-[130px]">
            <a href="#" className="w-7 h-7 rounded-full bg-[#2f477a] flex items-center justify-center text-white hover:opacity-80 transition-opacity text-[11px] font-semibold">f</a>
            <a href="#" className="w-7 h-7 rounded-full bg-[#c22f68] flex items-center justify-center text-white hover:opacity-80 transition-opacity text-[10px] font-semibold">ig</a>
            <a href="#" className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white hover:opacity-80 transition-opacity text-[11px] font-semibold">X</a>
            <a href="#" className="w-7 h-7 rounded-full bg-[#d51010] flex items-center justify-center text-white hover:opacity-80 transition-opacity text-[11px] font-semibold">▶</a>
            <a href="#" className="w-7 h-7 rounded-full bg-[#c62833] flex items-center justify-center text-white hover:opacity-80 transition-opacity text-[11px] font-semibold">p</a>
            <a href="#" className="w-7 h-7 rounded-full bg-[#121212] flex items-center justify-center text-white hover:opacity-80 transition-opacity text-[11px] font-semibold">w</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-[#2f3442]">
        <div className="max-w-[1180px] mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-6 text-[10px] uppercase tracking-[0.08em]">
          <div className="flex gap-4 items-center">
            <span>© 2026 CANDERE.COM . ALL RIGHTS RESERVED.</span>
            <Link to="/sitemap" className="hover:text-white">SITE MAP</Link>
          </div>

          <div className="flex items-center gap-5 text-white">
            <span>WE ACCEPT</span>
            <div className="flex gap-4 items-center opacity-70 cursor-default text-[9px]">
              <span className="text-[9px]">VISA</span>
              <span className="text-[9px]">MC</span>
              <span className="text-[9px]">PAYTM</span>
              <span className="text-[9px]">RUPAY</span>
              <span className="text-[9px]">PAYPAL</span>
              <span className="text-[9px]">AMEX</span>
            </div>
          </div>
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
