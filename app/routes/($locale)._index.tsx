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
              <Link key={`col1-${idx}`} to="/collections" className="group w-full focus:outline-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
                <div className="w-full overflow-hidden">
                  <img src={imgSrc} alt="category" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
                </div>
              </Link>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            {[prettyPendants, versatileEarrings].map((imgSrc, idx) => (
              <Link key={`col2-${idx}`} to="/collections" className="group w-full focus:outline-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
                <div className="w-full overflow-hidden">
                  <img src={imgSrc} alt="category" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
                </div>
              </Link>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            {[chainsofcharm, stylishBracelets].map((imgSrc, idx) => (
              <Link key={`col3-${idx}`} to="/collections" className="group w-full focus:outline-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
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
      <section className="w-full bg-black py-24 px-4">
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
            className="btn-glow-teal relative inline-flex items-center justify-center px-12 py-4 text-white font-semibold text-[15px] uppercase rounded-full transition-all duration-300 hover:text-white"
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
      <section className="w-full bg-white py-16 px-4 relative overflow-hidden">
        {/* Decorative background elements (white ribbons) */}
        <div className="absolute inset-0 opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-[32px] font-bold text-slate-800 mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>
              Gifts that speak the Occasion
            </h2>
            <p className="text-slate-600 text-base" style={{ fontFamily: 'Lato, sans-serif' }}>
              Not seeing your moment here? Don't worry, there's a gift for that too.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Gift Box Image */}
            <div className="lg:col-span-4">
              <img
                src={giftBox}
                alt="Gift Box"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Right: Occasion Grid */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
                    className="flex flex-col items-center p-6 rounded-xl transition-all duration-300 hover:shadow-md group"
                  >
                    <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <img src={occasion.icon} alt={occasion.title} className="w-10 h-10 object-contain" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {occasion.title}
                    </h3>
                    <p className="text-sm text-slate-600 text-center" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {occasion.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 3. Interactive Video Section */}
      <section className="bg-slate-900 text-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video flex items-center justify-center">
            <video
              ref={videoRef}
              src="https://assets.mixkit.co/videos/preview/mixkit-luxury-fashion-jewelry-shopper-handling-ring-41662-large.mp4"
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
            />
            {/* Play/Pause overlay */}
            <button
              onClick={toggleVideoPlay}
              className={`video-play-btn absolute bg-cyan-500/90 hover:bg-cyan-600 text-white p-5 rounded-full shadow-lg transition-colors z-10 flex items-center justify-center ${isVideoPlaying ? 'opacity-80' : ''}`}
              aria-label={isVideoPlaying ? 'Pause Video' : 'Play Video'}
            >
              {isVideoPlaying ? (
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 fill-current translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            {!isVideoPlaying && (
              <div className="absolute inset-0 bg-slate-950/40 flex items-end p-6 pointer-events-none">
                <span className="text-xs tracking-wider uppercase bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700">
                  Preview Store Experience
                </span>
              </div>
            )}
          </div>
          <div className="space-y-6 text-left">
            <span className="text-sm font-semibold tracking-wider text-cyan-400 uppercase">
              Exclusive In-Store Experience
            </span>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white">
              Discover Candere Virtual Try-On & Booking
            </h2>
            <p className="text-slate-300">
              Need personalized advice? Book a video call with our jewelry consultants, or request an in-store reservation at your nearest Kalyan Jewellers showroom to view collections in person.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('showroom-booking');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold px-8 py-3 rounded-full transition-all"
              >
                Book Store Visit
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('showroom-booking');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 font-semibold px-8 py-3 rounded-full transition-all"
              >
                Video Call Consultant
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Collections & Promotions */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="text-left">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900">
              Collections & Promotions
            </h2>
            <div className="w-16 h-1 bg-cyan-500 mt-3 mb-2"></div>
            <p className="text-slate-600">
              Explore our custom collections tailored for every story and style.
            </p>
          </div>
          <Link to="/collections" className="text-cyan-600 font-semibold hover:underline mt-4 md:mt-0 inline-flex items-center">
            View All Collections <span className="ml-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { img: glo, name: 'Glo Collection', desc: 'Dazzling everyday wear' },
            { img: aruna, name: 'Aruna Collection', desc: 'Traditional golden shine' },
            { img: traditionReimagined, name: 'Tradition Reimagined', desc: 'Craft heritage reborn' },
            { img: curated, name: 'Curated Selection', desc: 'Handpicked favorites' },
            { img: solitaire, name: 'Solitaire Shine', desc: 'Gems of absolute purity' },
          ].map((col, idx) => (
            <Link
              key={idx}
              to="/collections"
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden bg-slate-50 relative">
                <img
                  src={col.img}
                  alt={col.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-xxs px-2.5 py-1 rounded-full uppercase tracking-wider">
                  New Arrival
                </div>
              </div>
              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-cyan-600 transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">{col.desc}</p>
                </div>
                <span className="text-cyan-600 text-sm font-semibold mt-4 inline-flex items-center">
                  Explore <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Why Trust Candere Section */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900">
              Why Trust Candere?
            </h2>
            <div className="w-16 h-1 bg-cyan-500 mx-auto mt-3 mb-4"></div>
            <p className="text-slate-600 max-w-xl mx-auto">
              Our assurance of fine craftsmanship, authenticated gems, and customer care.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left box */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-sm rounded-2xl overflow-hidden shadow-xl bg-white p-6 border border-slate-200/80 group">
                <img
                  src={giftBox}
                  alt="Luxury Blue Candere Gift Box"
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                />
                <div className="mt-4 text-center">
                  <h4 className="font-serif font-bold text-lg text-slate-900">Premium Packaging</h4>
                  <p className="text-slate-500 text-xs mt-1">
                    Every piece is sent with specialized care in secure, luxury packaging.
                  </p>
                </div>
              </div>
            </div>

            {/* Right badges */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: exchangeIcon,
                  title: 'Lifetime Exchange',
                  desc: 'Upgrade your jewelry anytime with our customer exchange assurance policy.',
                },
                {
                  icon: certifiedIcon,
                  title: '100% Certified',
                  desc: 'Every gemstone & diamond is fully certified by internationally recognized labs.',
                },
                {
                  icon: returnIcon,
                  title: 'Easy Returns',
                  desc: 'Hassle-free 15-day return policy to buy jewelry with complete confidence.',
                },
                {
                  icon: shippingIcon,
                  title: 'Free Shipping',
                  desc: 'Fully insured, complimentary shipping directly to your doorstep across India.',
                },
                {
                  icon: refundIcon,
                  title: 'Secure Payments',
                  desc: '100% encrypted, secure transactions with multiple payment methods supported.',
                },
                {
                  icon: trustIcon,
                  title: 'Trusted Brand',
                  desc: 'Backed by the legacy of Kalyan Jewellers for guaranteed honesty and trust.',
                },
              ].map((trust, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-5 bg-white rounded-xl border border-slate-200/60 shadow-sm"
                >
                  <div className="w-12 h-12 flex-shrink-0 bg-cyan-50 rounded-full flex items-center justify-center p-2.5">
                    <img src={trust.icon} alt={trust.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-900 text-base">{trust.title}</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{trust.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Virtual Showrooms & callback Forms */}
      <section id="showroom-booking" className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 p-8 lg:p-12 relative">

          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Find showroom form */}
            <div className="space-y-6 text-left lg:border-r lg:border-slate-800 lg:pr-12">
              <span className="text-sm font-semibold tracking-wider text-cyan-400 uppercase">
                Locate Us
              </span>
              <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white">
                Visit Our Showrooms
              </h3>
              <p className="text-slate-400 text-sm">
                Explore the touch and feel of luxury. Enter your pin code to discover the nearest Candere or Kalyan Jewellers showroom in your city.
              </p>

              <form onSubmit={handleSearchStores} className="flex gap-3 mt-4">
                <input
                  type="text"
                  placeholder="Enter Pin Code (e.g. 400001)"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="bg-slate-800/80 border border-slate-700 text-white rounded-xl px-4 py-3 flex-1 focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold px-6 py-3 rounded-xl transition-all"
                >
                  Find Stores
                </button>
              </form>

              {showroomResults.length > 0 && (
                <div className="space-y-3 mt-6 bg-slate-800/40 p-4 rounded-xl border border-slate-700/60 animate-fadeIn">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Nearby Showrooms found:
                  </span>
                  {showroomResults.map((store, index) => (
                    <div key={index} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-cyan-500 mt-1">📍</span>
                      <span>{store}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Request Callback form */}
            <div className="space-y-6 text-left lg:pl-4">
              <span className="text-sm font-semibold tracking-wider text-cyan-400 uppercase">
                Expert Advice
              </span>
              <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white">
                Talk to our Jewelry Experts
              </h3>
              <p className="text-slate-400 text-sm">
                Book a customized video call. Enter your contact details and our dedicated consultants will call you back to walk you through our best designs.
              </p>

              <form onSubmit={handleRequestCallback} className="flex flex-col gap-4 mt-4">
                <div className="flex gap-3">
                  <input
                    type="tel"
                    placeholder="Enter Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number."
                    className="bg-slate-800/80 border border-slate-700 text-white rounded-xl px-4 py-3 flex-1 focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    disabled={callbackRequested}
                    className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold px-6 py-3 rounded-xl transition-all disabled:opacity-50"
                  >
                    {callbackRequested ? 'Sending...' : 'Request Call'}
                  </button>
                </div>
                <span className="text-slate-500 text-xs text-left">
                  * By clicking Request Call, you agree to receive automated calls/SMS messages for support.
                </span>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Classy Solitaires Banner */}
      <section className="relative overflow-hidden w-full h-[320px] lg:h-[400px] bg-slate-950 flex items-center justify-center">
        <img
          src={solitaireBanner}
          alt="Classy Solitaires Showcase Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-slate-950/40"></div>
        <div className="relative text-center max-w-xl px-4 space-y-4">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-white tracking-wide">
            Classy Solitaires
          </h2>
          <p className="text-slate-200 text-sm lg:text-base leading-relaxed">
            Elegance is an attitude. Indulge in our sparkling solitaires that represent absolute luxury and pure beauty.
          </p>
          <div className="pt-2">
            <Link
              to="/collections"
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold px-8 py-3 rounded-full transition-all inline-block shadow-md hover:shadow-lg"
            >
              Discover Solitaires
            </Link>
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
