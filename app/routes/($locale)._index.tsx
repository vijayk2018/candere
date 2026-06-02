import { useLoaderData, Link } from 'react-router';
import type { Route } from './+types/($locale)._index';
import { useState, useRef, useEffect } from 'react';

// Import local assets
import homepageMainBanner from '~/assets/Homepage_main_banner_1920x850_5.webp';
import charmingRings from '~/assets/charmingRings.webp';
import prettyPendants from '~/assets/prettyPendants.webp';
import chainsofcharm from '~/assets/Chainsofcharm.webp';
import dreamyNecklace from '~/assets/dreamyNecklace_140525.webp';
import versatileEarrings from '~/assets/versatileEarrings.webp';
import stylishBracelets from '~/assets/stylishBracelets.webp';
import solitaireBanner from '~/assets/BLR-C-548-CANDERE-WEBSITE-BANNER-SOLITAIRE-JEWELLERY.webp';
import giftBox from '~/assets/Gift-box.webp';
import peacock from '~/assets/Peacock.jpg';
import giftSectionBg from '~/assets/GiftSectionbg.png';

// Trust icons
import certifiedIcon from '~/assets/certified.svg';
import exchangeIcon from '~/assets/exchange.svg';
import shippingIcon from '~/assets/international_shipping.svg';
import refundIcon from '~/assets/refund.svg';
import returnIcon from '~/assets/return_1.svg';
import trustIcon from '~/assets/trust.svg';

// Collections
import glo from '~/assets/Glo.webp';
import aruna from '~/assets/Aruna.webp';
import evilEye from '~/assets/Evil-Eye.webp';
import honeyBee from '~/assets/Honey-Bee.webp';
import traditionReimagined from '~/assets/Tradition-Reimagined_100625.webp';
import curated from '~/assets/Curated_100625.webp';
import storeSectionBg from '~/assets/StoreSection.webp';
import directionsIcon from '~/assets/directions.svg';
import whatsappIcon from '~/assets/whatsapp.svg';
import solitaire from '~/assets/Solitaire_020725.webp';
import internationalFlair from '~/assets/international_flair.webp';
// Phone mockup
import frontphone from '~/assets/frontphone.webp';
import backphone from '~/assets/backphone.webp';
import shadowphone from '~/assets/shadowphone.webp';

// Social feed / instadiaries
import c013417 from '~/assets/C013417__1.webp';
import c013709 from '~/assets/C013709__2.webp';
import c014635 from '~/assets/C014635__1.webp';
import c017921 from '~/assets/C017921_1.webp';
import c018014 from '~/assets/C018014__1.webp';
import c018022 from '~/assets/C018022__1.webp';
import c018499 from '~/assets/C018499___1.webp';
import c022804 from '~/assets/C022804__1.webp';
import c023713 from '~/assets/C023713_1.webp';
import c025338 from '~/assets/C025338_1.webp';
import kc03513 from '~/assets/KC03513_1.webp';
import kc03978 from '~/assets/KC03978__1.webp';
import lcb0109 from '~/assets/LCB0109_1_2.webp';
import lce0109 from '~/assets/LCE0109__1.webp';

// Occasions
import anniversary from '~/assets/Anniversary.svg';
import birthday from '~/assets/birthday.svg';
import festive from '~/assets/Festive.svg';
import justBecause from '~/assets/Justbecause.svg';
import milestone from '~/assets/Personalmilestone.svg';
import babyShower from '~/assets/babyshower.svg';

// Stars
import starFill from '~/assets/Star-fill.svg';
import starOutline from '~/assets/Star-outline.svg';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Candere by Kalyan Jewellers | Diamond & Gold Jewellery Online' },
    {
      name: 'description',
      content:
        'Shop certified diamond & gold jewellery with lifetime exchange, easy returns & free delivery across India.',
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return { ...deferredData, ...criticalData };
}

async function loadCriticalData({ context }: Route.LoaderArgs) {
  const [{ collections }] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
  ]);

  return {
    isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
    featuredCollection: collections.nodes[0],
  };
}

function loadDeferredData({ context }: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  // Hero Slider state
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroSlides = [homepageMainBanner, solitaireBanner];

  // Tab state for the sections below greetings
  const [activeTab, setActiveTab] = useState('Tradition Reimagined');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Virtual Showrooms state
  const [pinCode, setPinCode] = useState('');
  const [showroomResults, setShowroomResults] = useState<string[]>([]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [callbackRequested, setCallbackRequested] = useState(false);

  // Video state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Back to top state
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll listener for back-to-top button
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Social feed hover
  const socialImages = [
    { src: c013417, tag: '@aditi_sharma' },
    { src: kc03513, tag: '@riya_mehta' },
    { src: kc03978, tag: '@priya_v' },
    { src: lcb0109, tag: '@sneha_gupta' },
    { src: lce0109, tag: '@megha_k' },
    { src: c013709, tag: '@pooja_patel' },
    { src: c014635, tag: '@neha_s' },
    { src: c017921, tag: '@tanvi_shah' },
    { src: c018014, tag: '@ananya_r' },
    { src: c018022, tag: '@divya_n' },
  ];

  const handleSearchStores = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinCode.trim()) return;
    // Mock store finding logic
    const mockStores = [
      `Kalyan Jewellers Showroom - Andheri West (Pin: ${pinCode})`,
      `Candere Experience Center - Bandra Linking Road (Pin: ${pinCode})`,
      `Kalyan Jewellers - Borivali East (Pin: ${pinCode})`,
    ];
    setShowroomResults(mockStores);
  };

  const handleRequestCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber.trim()) return;
    setCallbackRequested(true);
    setTimeout(() => {
      setCallbackRequested(false);
      setMobileNumber('');
      alert('Callback requested successfully! Our jewellery expert will contact you shortly.');
    }, 1500);
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log('Video play error:', err));
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Collections Carousel state
  const [carouselIndex, setCarouselIndex] = useState(2); // Start with center item (Glo) as index 2
  const carouselItems = [
    { img: evilEye,  label: 'Evil Eye' },
    { img: honeyBee, label: 'Honey Bee' },
    { img: glo,      label: 'Glo' },
    { img: peacock,  label: 'Peacock' },
    { img: aruna,    label: 'Aruna' },
  ];
  const gap = 24; // gap in px between items
  const smallW = 228, smallH = 380;
  const mediumW = 266, mediumH = 427;
  const largeW = 361, largeH = 551;

  // Get the size based on position relative to center
  const getSizeForPosition = (relativeIndex: number) => {
    // relativeIndex: -2, -1, 0 (center), 1, 2
    switch (relativeIndex) {
      case -2:
      case 2:
        return { w: smallW, h: smallH };
      case -1:
      case 1:
        return { w: mediumW, h: mediumH };
      case 0:
        return { w: largeW, h: largeH };
      default:
        return { w: smallW, h: smallH };
    }
  };

  // Get visible items (current index is center)
  const getVisibleItems = () => {
    const items = [...carouselItems, ...carouselItems, ...carouselItems];
    const center = carouselIndex + carouselItems.length; // middle set
    return [
      { ...items[center - 2], relIdx: -2 },
      { ...items[center - 1], relIdx: -1 },
      { ...items[center],     relIdx: 0 },
      { ...items[center + 1], relIdx: 1 },
      { ...items[center + 2], relIdx: 2 },
    ];
  };

  const handleLeft = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleRight = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const Carousel = () => {
    const visibleItems = getVisibleItems();
    return (
      <div className="carousel-container flex justify-center">
        <div className="carousel-track">
          {visibleItems.map((col, idx) => {
            const size = getSizeForPosition(col.relIdx);
            return (
              <Link
                key={`${carouselIndex}-${idx}`}
                to="/collections"
                className="relative min-w-0 rounded-xl overflow-hidden group flex-shrink-0 transition-all duration-700 ease-in-out"
                style={{
                  width: `${size.w}px`,
                  height: `${size.h}px`,
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <img
                  src={col.img}
                  alt={col.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  const StoreList = () => {
    const [activeStore, setActiveStore] = useState(0);
    const stores = [
      { id: 239, name: 'Malad Infiniti Mall', distance: '0.73 km' },
      { id: 269, name: 'Goregaon MG Road', distance: '2.55 km' }
    ];
    return (
      <div id="list" className="flex flex-col md:flex-row gap-6 justify-center mb-12">
        {stores.map((store, idx) => (
          <div
            key={store.id}
            onClick={() => setActiveStore(idx)}
            className="store-card-wrapper store_details flex items-center gap-5 bg-white p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-200"
          >
            <div className="radio-circle w-7 h-7 rounded-full border-2 flex items-center justify-center" style={{ borderColor: activeStore === idx ? '#4abccd' : '#e2e8f0', backgroundColor: 'white' }}>
              {activeStore === idx && <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#4abccd' }}></div>}
            </div>
            <div className="store-card">
              <div className="location-container flex items-center gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <div className="distance text-base text-slate-700 font-semibold">{store.distance}</div>
                </div>
              </div>
              <div className="place-container">
                <div className="label text-[11px] text-slate-500 uppercase tracking-widest mb-1">Nearest Store</div>
                <div className="location text-base font-semibold text-slate-800">{store.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="text-slate-800 font-sans">

      {/* 1. Full-Width Hero Slider — edge-to-edge, no side gaps */}
      <section className="relative w-full overflow-hidden m-0 p-0 leading-[0]">
        <div
          className="flex transition-transform duration-700 ease-in-out w-full"
          style={{ transform: `translateX(-${currentHeroSlide * 100}%)` }}
        >
          {heroSlides.map((slide, idx) => (
            <div key={idx} className="w-full flex-shrink-0 relative leading-none">
              <Link to="/collections" className="block leading-none">
                <img
                  src={slide}
                  alt={`Candere Banner ${idx + 1}`}
                  className="w-full h-auto object-cover block"
                />
              </Link>
            </div>
          ))}
        </div>
      </section>


      <section className="greetings bg-black  mb-16 py-[15rem] relative z-10 flex items-center justify-center min-h-[25vh]">
        <div className="container__group max-w-7xl mx-auto px-4 text-center">
          <div className="row__group">
            <div style={{ opacity: 1 }}>
              <div>
                <div className="webengage-webp13-container">
                  <div className="webengage-webp13-custom-code-container">
                    <div className="greetings--content w-full">
                      <p className="greetings--content-sub text-white font-sans font-thin text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-6 text-center w-full">Hey Sparkle Seeker,</p>
                      <p className="greetings--content-sub text-white font-sans font-thin text-2xl md:text-3xl lg:text-4xl leading-relaxed text-center w-full">Come, explore a world where diamonds aren't just for occasions, they're for every day, every </p>
                      <p className="greetings--content-sub text-white font-sans font-thin text-2xl md:text-3xl lg:text-4xl leading-relaxed text-center w-full">mood, and every you.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Sparkle Seeker Welcome Text */}
      {/* <section className="greetings bg-black mb-16 py-[15rem] relative z-10 flex items-center justify-center min-h-[25vh]">
        <div className="container__group max-w-7xl mx-auto px-4 text-center">
          <div className="row__group">
            <div style={{ opacity: 1 }}>
              <div>
                <div className="webengage-webp13-container">
                  <div className="webengage-webp13-custom-code-container">
                    <div className="greetings--content flex flex-col items-center">

                      <p className="text-white font-sans font-thin text-3xl md:text-4xl lg:text-5xl leading-[1.5] mb-8 text-center">
                        Hey Sparkle Seeker,
                      </p>

                      <p className="text-white font-sans font-thin text-3xl md:text-4xl lg:text-5xl leading-[1.5] mt-0 mb-0 text-center max-w-4xl">
                        Come, explore a world where diamonds aren't just for occasions,
                      </p>

                      <p className="text-white font-sans font-thin text-3xl md:text-4xl lg:text-5xl leading-[1.5] mt-0 mb-0 text-center max-w-4xl">
                        they're for every day, every mood, and every you.
                      </p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* 3 Tabbed Images Section */}
      <section className="w-full bg-white pt-8 pb-4">
        <div className="max-w-[110rem] mx-auto px-1 lg:px-2">
          <div className="flex justify-center items-center gap-8 md:gap-24 mb-6 border-b border-transparent">
            {['International Flair', 'Tradition Reimagined', 'Curated for the Bold'].map((tab) => (
              <div
                key={tab}
                className={`cursor-pointer flex flex-col items-center text-sm md:text-base lg:text-[20px] font-bold transition-colors ${activeTab === tab ? 'text-slate-900 font-extrabold' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={() => setActiveTab(tab)}
              >
                <span className="mb-2">{tab}</span>
                {activeTab === tab && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                {activeTab !== tab && <div className="h-5 w-5"></div>}
              </div>
            ))}
          </div>

          <div className="w-full overflow-hidden shadow-sm rounded-[9.5rem] md:rounded-[11.25rem]">
            {activeTab === 'International Flair' && (
              <img src={internationalFlair} alt="International Flair" className="w-full h-auto object-cover block" />
            )}
            {activeTab === 'Tradition Reimagined' && (
              <img src={traditionReimagined} alt="Tradition Reimagined" className="w-full h-auto object-cover block" />
            )}
            {activeTab === 'Curated for the Bold' && (
              <img src={curated} alt="Curated for the Bold" className="w-full h-auto object-cover block" />
            )}
          </div>
        </div>
      </section>

      {/* 2. Shop By Category */}
      {/* <section className="w-full max-w-[90rem] mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl lg:text-[46px] font-serif font-bold text-slate-900 mt-12 mb-4">
          Shop By Category
        </h2>
        <p className="text-slate-600 text-lg lg:text-[20px] max-w-2xl mx-auto mb-16 font-light">
          So that you don't run out of options to choose from!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 max-w-6xl mx-auto items-center">
          {[
            { img: charmingRings, name: 'Charming Rings' },
            { img: prettyPendants, name: 'Pretty Pendants' },
            { img: chainsofcharm, name: 'Chains of Charm' },
            { img: dreamyNecklace, name: 'Dreamy Necklaces' },
            { img: versatileEarrings, name: 'Versatile Earrings' },
            { img: stylishBracelets, name: 'Stylish Bracelets' },
          ].map((cat, idx) => (
            <Link
              key={idx}
              to="/collections"
              className="group flex flex-col items-center bg-white rounded-[2rem] shadow-[0_4px_25px_rgb(0,0,0,0.08)] p-3 md:p-4 hover:shadow-[0_8px_35px_rgb(0,0,0,0.15)] transition-shadow duration-300"
            >
              <div className={`w-full rounded-[1.5rem] overflow-hidden ${idx % 3 === 1 ? 'h-[280px] lg:h-[360px]' : 'h-[220px] lg:h-[280px]'}`}>
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="pt-5 pb-3">
                <span className="text-slate-800 text-[24px] lg:text-[28px]"
                      style={{ fontFamily: "'Dancing Script', 'Great Vibes', 'Allura', cursive" }}>
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section> */}
      <section className="w-full max-w-[90rem] mx-auto px-4 py-20 text-center ">
        <div className="flex flex-col items-center justify-center w-full mt-12 mb-16">
          <div
            className="text-[#242330] font-semibold text-[42px] leading-[1.54] mb-2 text-center"
            style={{ fontFamily: '"Cormorant", serif', fontFeatureSettings: '"pnum" on, "lnum" on' }}
          >
            Shop By Category
          </div>

          <p
            className="text-[#4e4b66] font-normal text-[16px] leading-[1.5] tracking-[0.25px] text-center m-0 p-0"
            style={{ fontFamily: 'Lato, sans-serif' }}
          >
            So that you don't run out of options to choose from!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[62rem] mx-auto items-start">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            {[charmingRings, dreamyNecklace].map((imgSrc, idx) => (
              <Link key={`col1-${idx}`} to="/collections/diamond-rings" className="group w-full focus:outline-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
                <div className="w-full overflow-hidden">
                  <img src={imgSrc} alt="category" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
                </div>
              </Link>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            {[prettyPendants, versatileEarrings].map((imgSrc, idx) => (
              <Link key={`col2-${idx}`} to="/collections/pendants" className="group w-full focus:outline-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
                <div className="w-full overflow-hidden">
                  <img src={imgSrc} alt="category" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
                </div>
              </Link>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            {[chainsofcharm, stylishBracelets].map((imgSrc, idx) => (
              <Link key={`col3-${idx}`} to="/collections/charm" className="group w-full focus:outline-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
                <div className="w-full overflow-hidden">
                  <img src={imgSrc} alt="category" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Video + Men's Collection Section */}
      <section className="w-full bg-black py-16 px-4">
        {/* Centered YouTube Video Card */}
        <div className="max-w-4xl mx-auto">
          <div className="w-full relative rounded-2xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/_48k-jwI-QY?si=_NNzZln-0_gFeyQO&playlist=_48k-jwI-QY&autoplay=1&mute=1&loop=1&enablejsapi=1&origin=https://www.candere.com"
              frameBorder="0"
              title="Jewellery, Just Like Style, Belongs to Everyone"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
          </div>
        </div>

        {/* Tagline + Explore Button */}
        <div className="flex flex-col items-center justify-center text-center pt-12 pb-4 px-4">
          <p
            className="text-white font-thin text-[32px] md:text-[42px] leading-[1.54] mb-10px"
            style={{ fontFamily: '"Cormorant", serif', fontFeatureSettings: '"pnum" on, "lnum" on' }}
          >
            Jewellery that speaks strength. Discover bold designs for modern men
          </p>
          {/* <p
            className="text-white/70 font-normal text-[16px] md:text-[18px] leading-[1.6] mb-12"
            style={{ fontFamily: 'Lato, sans-serif' }}
          >
            Discover bold designs for modern men
          </p> */}

          {/* Animated Explore Button - primaryBtn btnGlow style */}
          <a
            href="https://www.candere.com/jewellery/men.html"
            title="Explore"
            className="relative inline-flex items-center justify-center px-12 py-3 mt-8 text-white text-[14px] font-semibold tracking-[2px] uppercase rounded-full group overflow-hidden transition-all duration-300"
            style={{
              WebkitTapHighlightColor: 'transparent',
              letterSpacing: '2px',
              minWidth: '160px',
              border: '1.5px solid #4abccd',
              animation: 'glowPulse 2s ease-in-out infinite',
            }}
          >
            {/* Hover fill */}
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
              style={{ background: '#4abccd' }}
            />
            <span className="relative z-10 text-white">Explore</span>
          </a>
          <style>{`
            @keyframes glowPulse {
              0%, 100% { box-shadow: 0 0 6px 1px rgba(74,188,205,0.3); }
              50%       { box-shadow: 0 0 18px 5px rgba(74,188,205,0.65); }
            }
          `}</style>
        </div>
      </section>


      {/* Collections You'll Love */}
      <section className="w-full bg-black py-32 px-4">
        <style>{`
          @keyframes glowPulseBtn {
            0%, 100% { box-shadow: 0 0 6px 1px rgba(74,188,205,0.3); }
            50%       { box-shadow: 0 0 18px 5px rgba(74,188,205,0.65); }
          }
          .btn-glow-teal {
            border: 1.5px solid #4abccd;
            background: transparent;
            color: white;
            animation: glowPulseBtn 2s ease-in-out infinite;
            z-index: 10;
          }
          .carousel-container {
            overflow: hidden;
            max-width: 1500px;
            margin: 0 auto;
          }
          .carousel-track {
            display: flex;
            align-items: center;
            gap: 24px;
            transition: transform 0.6s ease;
            will-change: transform;
          }
        `}</style>
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2
            className="text-white font-semibold text-[36px] md:text-[48px] leading-[1.4] mb-3"
            style={{ fontFamily: '"Cormorant", serif' }}
          >
            Collections You'll Love
          </h2>
          <p className="text-white/70 text-[16px]" style={{ fontFamily: 'Lato, sans-serif' }}>
            Let's take a glimpse at our featured collections before diving in!
          </p>
        </div>

        {/* 5-image Carousel */}
        <Carousel />

        {/* SHOP NOW + Arrows */}
        <div className="flex items-center justify-center mt-16" style={{ gap: '8rem' }}>
          <button
            onClick={handleLeft}
            className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white hover:border-white transition-colors"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <a
            href="/collections"
            className="btn-glow-teal relative inline-flex items-center justify-center px-12 py-4 text-white font-semibold text-[15px] uppercase rounded-full transition-all duration-300 hover:text-white mb-5"
            style={{ letterSpacing: '4px', WebkitTapHighlightColor: 'transparent' }}
          >
            Shop Now!
          </a>

          <button
            onClick={handleRight}
            className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white hover:border-white transition-colors"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      {/* Gifts that speak the Occasion */}
      <section className="w-full relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={giftSectionBg}
            alt="Gift Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-full relative z-10 py-20" style={{ paddingLeft: '5%', paddingRight: '5%' }}>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-[36px] font-bold text-slate-800 mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>
              Gifts that speak the Occasion
            </h2>
            <p className="text-slate-600 text-base" style={{ fontFamily: 'Lato, sans-serif' }}>
              Not seeing your moment here? Don't worry, there's a gift for that too.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left: Gift Box Image */}
            <div className="w-full lg:w-[48%]">
              <div className="flex justify-center">
                <img
                  src={giftBox}
                  alt="Gift Box"
                  className="w-full h-auto max-w-xl object-contain"
                />
              </div>
            </div>

            {/* Right: Occasion Grid */}
            <div className="w-full lg:w-[52%]">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: birthday, title: 'Birthday', desc: 'Celebrate another year with a thoughtful gift.' },
                  { icon: anniversary, title: 'Anniversary', desc: 'Love and Togetherness.' },
                  { icon: milestone, title: 'Personal Milestones', desc: 'Let yours be unforgettable' },
                  { icon: justBecause, title: 'Just Because', desc: 'Spontaneous gifts to show affection.' },
                  { icon: babyShower, title: 'Baby Showers', desc: 'Welcome new life with meaningful jewellery.' },
                  { icon: festive, title: 'Festive', desc: 'Make every festival special' }
                ].map((occasion, idx) => (
                  <Link
                    key={idx}
                    to="/collections"
                    className="flex flex-col items-center p-5 transition-all duration-300 group"
                  >
                    <img src={occasion.icon} alt={occasion.title} className="w-18 h-18 object-contain mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-slate-800 mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>
                        {occasion.title}
                      </p>
                      <p className="text-base text-slate-600" style={{ fontFamily: 'Lato, sans-serif' }}>
                        {occasion.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Find It Here Button */}
              <div className="flex justify-center">
                <a
                  href="/collections"
                  className="relative inline-flex items-center justify-center px-12 py-3 mt-8 text-white text-[14px] font-semibold tracking-[2px] uppercase rounded-full group overflow-hidden transition-all duration-300"
                  style={{
                    WebkitTapHighlightColor: 'transparent',
                    letterSpacing: '2px',
                    minWidth: '160px',
                    border: '1.5px solid #4abccd',
                    animation: 'glowPulse 2s ease-in-out infinite',
                    backgroundColor: '#000000'
                  }}
                >
                  {/* Hover fill */}
                  <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ background: '#4abccd' }}
                  />
                  <span className="relative z-10 text-white">Find it here!</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Assurance Section */}
      <section className="w-full py-16 bg-white">
        <div className="w-full px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full">
            {[
              { icon: certifiedIcon, title: "Certified Jewellery" },
              { icon: exchangeIcon, title: "Lifetime Exchange" },
              { icon: refundIcon, title: "100% Refund*" },
              { icon: shippingIcon, title: "International Shipping" },
              { icon: trustIcon, title: "Trust of Kalyan Jewellers" },
              { icon: returnIcon, title: "15 Day Return" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center h-40">
                <div className="w-14 h-14 flex items-center justify-center mb-4">
                  <img src={item.icon} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <p className="text-[10px] text-slate-700 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Locator Section */}
      <section id="nh_desktop_store_section" className="w-full relative overflow-hidden">
        <div className="absolute inset-0 -z-10 rounded-t-[60px] overflow-hidden">
          <img src={storeSectionBg} alt="Store Background" className="w-full h-auto object-contain rounded-t-[60px]" />
        </div>

        <section className="store store_locator relative z-10 py-12 pt-16">
          <div className="max-w-[1100px] mx-auto px-4 mt-[55px]">
            <div className="store--wrapper bg-black/70 rounded-2xl px-10 py-12">
              <div className="insideWrapper">
                <p className="store--head text-center text-2xl md:text-[32px] font-semibold text-white mb-10" style={{ fontFamily: 'Lato, sans-serif' }}>
                  Discover the magic In-Person! <br /> at a Store Near You!
                </p>

                <div className="inputBox flex gap-3 max-w-[480px] mx-auto mb-10">
                  <input
                    type="text"
                    className="form-control nearBySearch flex-1 px-6 py-4 border border-white rounded-full bg-black/40 text-white placeholder-white/80 focus:outline-none focus:border-cyan-400"
                    placeholder="Enter Pincode"
                  />
                  <button
                    type="submit"
                    className="inputBox-submit locateMe px-7 py-4 bg-white text-black rounded-full font-semibold transition hover:bg-gray-100"
                  >
                    submit
                  </button>
                </div>

                <StoreList />
              </div>
            </div>
          </div>

          <div className="store--btnContainer flex flex-col items-center mt-10 relative">
            <div className="flex items-center w-full justify-center">
              <div className="flex-1 h-[2px] mx-4" style={{ background: '#4abccd', boxShadow: '0 0 4px #4abccd' }}></div>
              <button
                className="primaryBtn btnGlow viewDesign view_design relative inline-flex items-center justify-center px-14 py-4 text-white text-[15px] font-semibold tracking-[2px] uppercase rounded-full cursor-pointer"
                style={{
                  background: '#000000',
                  border: '1.5px solid #4abccd',
                  animation: 'glowPulse 2s ease-in-out infinite',
                }}
                title="Discover NOW!"
                id="view_design"
              >
                Discover NOW!
              </button>
              <div className="w-8"></div>
              <button
                className="primaryBtn book__appointment btnGlow relative inline-flex items-center justify-center px-14 py-4 text-white text-[15px] font-semibold tracking-[2px] uppercase rounded-full cursor-pointer"
                title="Book an Appointment"
                style={{
                  background: '#000000',
                  border: '1.5px solid #4abccd',
                  animation: 'glowPulse 2s ease-in-out infinite',
                }}
              >
                Book an Appointment
              </button>
              <div className="flex-1 h-[2px] mx-4" style={{ background: '#4abccd', boxShadow: '0 0 4px #4abccd' }}></div>
            </div>

            {/* Social Icons below buttons */}
            <div className="store--social flex justify-center gap-3 mt-3" id="shareIt">
              <a
                href="https://www.google.com/maps/place/Candere+By+Kalyan+Jewellers+-+Infiniti+Mall,+Malad/@19.184879,72.834614,16z/data=!4m5!3m4!1s0x0:0x4e1b02b2e6e43c6a!8m2!3d19.1848791!4d72.8346139?hl=en"
                title="Directions"
                className="store--social-box w-14 h-14 bg-transparent flex items-center justify-center transition-all"
                id="storeDirection"
                target="_blank"
                rel="noreferrer"
              >
                <img src={directionsIcon} alt="Directions" className="w-9 h-9" />
              </a>

              <a
                href="https://wa.me/8657007424?text=Hey%20Alia%2C%20Let%E2%80%99s%20Start"
                target="_blank"
                rel="noreferrer"
                title="Whatsapp Us"
                className="store--social-box w-14 h-14 bg-transparent flex items-center justify-center transition-all"
                id="storeWhatsapp"
              >
                <img src={whatsappIcon} alt="Whatsapp" className="w-9 h-9" />
              </a>
            </div>
          </div>
        </section>

        {/* Solitaire Image Section */}
        <div className="bg-black w-full px-4 py-4 md:px-5 md:py-5">
          <div className="max-w-[95%] mx-auto rounded-[3.3rem] overflow-hidden">
            <img
              src={solitaire}
              alt="Classy Solitaires"
              className="w-full h-auto object-cover block"
            />
          </div>
        </div>
      </section>


     

      {/* 8. Testimonials Section (Happy Stories) */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left phone graphics */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-[450px]">
              {/* shadow phone */}
              <img
                src={shadowphone}
                alt="Phone Shadow"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              />
              {/* back phone */}
              <img
                src={backphone}
                alt="Phone Back side representation"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none translate-x-4 -translate-y-4 opacity-80 scale-95"
              />
              {/* front phone */}
              <img
                src={frontphone}
                alt="Candere Store mobile application view mockup"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              />
            </div>
          </div>

          {/* Right stories list */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900">
                1 Lakh+ Happy Stories & Service
              </h2>
              <div className="w-16 h-1 bg-cyan-500 mt-3 mb-4"></div>
              <p className="text-slate-600">
                Our customers adore their jewelry experiences with us. Read their honest feedback.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  stars: 5,
                  comment:
                    'Extremely pleased with my purchase. The diamond ring sparkles beautifully, and the certificate gave me confidence. Perfect delivery packing!',
                  author: 'Aruna R., Mumbai',
                },
                {
                  stars: 5,
                  comment:
                    'Loved the virtual consultation session. It was like shopping in a physical store. I was able to inspect the pendant from all sides.',
                  author: 'Priya K., Bangalore',
                },
                {
                  stars: 5,
                  comment:
                    'The lifetime exchange feature is great. I just traded in my gold bracelet for a new design. Process was seamless and very transparent.',
                  author: 'Vikram S., Pune',
                },
                {
                  stars: 4,
                  comment:
                    'Wide variety of collections. I bought the Glo earrings and got compliments everywhere. Fast delivery and secure verification.',
                  author: 'Sneha J., Chennai',
                },
              ].map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <img
                          key={i}
                          src={i < rev.stars ? starFill : starOutline}
                          alt="star"
                          className="w-4.5 h-4.5"
                        />
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm italic leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                  <span className="block font-semibold text-slate-800 text-xs mt-4">
                    — {rev.author}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 9. Instagram Diaries Section */}
      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-slate-900">
            #canderediaries
          </h2>
          <div className="w-12 h-1 bg-cyan-500 mx-auto mt-3 mb-4"></div>
          <p className="text-slate-600 max-w-md mx-auto mb-10 text-sm">
            Tag us in your custom style posts on Instagram to get featured in our global shopper diaries feed.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {socialImages.map((img, idx) => (
              <div
                key={idx}
                className="insta-item group relative aspect-square border border-slate-200/60 bg-white shadow-sm"
              >
                <img
                  src={img.src}
                  alt={`Diaries ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="insta-overlay absolute inset-0 bg-slate-950/60 flex items-center justify-center flex-col p-4 text-white">
                  <span className="text-cyan-400 text-sm font-semibold">❤️ Love</span>
                  <span className="text-xs text-slate-200 mt-1">{img.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Occasion Selector Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center border-t border-slate-200">
        <h2 className="text-3xl font-serif font-bold text-slate-900">
          Gift by Occasion
        </h2>
        <div className="w-12 h-1 bg-cyan-500 mx-auto mt-3 mb-10"></div>

        <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
          {[
            { img: anniversary, name: 'Anniversary' },
            { img: birthday, name: 'Birthday' },
            { img: festive, name: 'Festive' },
            { img: justBecause, name: 'Just Because' },
            { img: milestone, name: 'Personal Milestone' },
            { img: babyShower, name: 'Baby Shower' },
          ].map((occ, idx) => (
            <Link
              key={idx}
              to="/collections"
              className="occasion-link flex flex-col items-center max-w-[120px]"
            >
              <div className="occasion-icon-wrap w-16 h-16 rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center p-3.5">
                <img
                  src={occ.img}
                  alt={occ.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-semibold text-slate-600 group-hover:text-cyan-600 transition-colors mt-3">
                {occ.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-6 z-50 bg-cyan-600 hover:bg-cyan-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all animate-scaleIn"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
          </svg>
        </button>
      )}

    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
