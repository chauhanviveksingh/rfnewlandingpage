import React, { useState, useRef, useCallback, useLayoutEffect, useEffect } from 'react';

const CouponCard = React.memo(({ coupon, index, copiedIndex, onCopy }) => {
  const isCopied = copiedIndex === index;
  return (
    <div className="relative bg-white rounded-xl p-6 shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]">
      <div className="absolute top-0 right-0 bg-red-500 text-xs font-bold text-white px-3 py-1 rounded-bl-lg">
        {coupon.badge ?? 'Limited Time'}
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{coupon.title}</h3>
          <p className="text-sm text-gray-600">{coupon.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <code className="flex-1 px-3 py-2 rounded-lg bg-gray-50 text-gray-900 font-mono tracking-wider border border-gray-100">
            {coupon.code}
          </code>
          <button
            onClick={() => onCopy(coupon.code, index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              isCopied ? 'bg-green-500 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'
            }`}
          >
            {isCopied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>
    </div>
  );
});

export default function SpecialOffers() {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const containerRef = useRef(null);

  const coupons = [
    { title: 'Flat 33% Off', code: 'RFEAST33', description: 'Get Flat 33% Off on prepaid orders. Min ₹99.'},
    { title: 'Flat 20% Off', code: 'RFEAST20', description: 'Flat 20% Off on prepaid orders. Min ₹999.'},
    { title: 'Flat 15% Off', code: 'RFEAST15', description: 'Flat 15% Off on prepaid orders. Min ₹499.'},
    { title: 'Flat 25% Off', code: 'RFEAST25', description: 'Flat 25% Off on prepaid orders. Min ₹2499.'},
    { title: 'Flat 30% Off', code: 'RFEAST30', description: 'Flat 30% Off on prepaid orders. Min ₹4999.'},
    { title: 'Welcome Discount', code: 'SAVE20', description: '20% off on first order'},
    { title: 'Free Shipping', code: 'FREESHIP', description: 'Free shipping over ₹50.' },
    { title: 'Meal Combo Deal', code: 'MEAL10', description: 'Flat ₹10 off on meal combos.'},
    { title: 'Festive Offer', code: 'FESTIVE50', description: '₹50 off festive combos' },
    { title: 'Loyalty Bonus', code: 'LOYAL10', description: 'Extra 10% for loyal members.'},
    { title: 'Weekend Special', code: 'WEEKEND5', description: '₹50 off on weekends.' },
  ];

  const onCopy = useCallback(async (code, idx) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 1400);
    } catch {
      console.error('Copy failed');
    }
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function updatePadding() {
      const card = container.querySelector('.slider-card');
      const cardWidth = card ? card.getBoundingClientRect().width : 300;
      const offset = Math.max((container.clientWidth - cardWidth) / 2, 12);
      container.style.scrollPaddingLeft = `${offset}px`;
      container.style.scrollPaddingRight = `${offset}px`;
    }

    updatePadding();
    window.addEventListener('resize', updatePadding);
    return () => window.removeEventListener('resize', updatePadding);
  }, []);

  const scrollByStep = useCallback((direction = 'next') => {
    const container = containerRef.current;
    if (!container) return;
    const card = container.querySelector('.slider-card');
    const cardWidth = card ? card.getBoundingClientRect().width : 320;
    const amount = cardWidth + 32;
    container.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const auto = setInterval(() => scrollByStep('next'), 3500);
    return () => clearInterval(auto);
  }, [scrollByStep]);

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Special Offers & Discounts</h2>

        {/* Arrow Buttons */}
        <button
          onClick={() => scrollByStep('prev')}
          className="absolute left-0 top-1/2 -translate-y-1/2 ml-2 p-3 z-10 bg-white rounded-full shadow border"
        >
          ‹
        </button>
        <button
          onClick={() => scrollByStep('next')}
          className="absolute right-0 top-1/2 -translate-y-1/2 mr-2 p-3 z-10 bg-white rounded-full shadow border"
        >
          ›
        </button>

        {/* Slider track */}
        <div
  ref={containerRef}
  className="overflow-x-auto flex gap-4 px-4 snap-x snap-mandatory scroll-smooth w-full"
>
  {coupons.map((coupon, idx) => (
    <div
      key={coupon.code}
      className="slider-card snap-center flex-shrink-0 w-full sm:w-[320px]"
    >
      <CouponCard coupon={coupon} index={idx} copiedIndex={copiedIndex} onCopy={onCopy} />
    </div>
  ))}
</div>
      </div>
    </section>
  );
}
