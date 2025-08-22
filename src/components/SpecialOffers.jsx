import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";

/* ========== Card ========== */
const CouponCard = React.memo(function CouponCard({ coupon, onCopy, isCopied }) {
  return (
    <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="absolute top-0 right-0 bg-red-500 text-xs font-bold text-white px-3 py-1 rounded-bl-lg">
        {coupon.badge ?? "Limited Time"}
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {coupon.title}
          </h3>
          <p className="text-sm text-gray-600">{coupon.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <code className="flex-1 px-3 py-2 rounded-lg bg-gray-50 text-gray-900 font-mono tracking-wider border border-gray-100">
            {coupon.code}
          </code>
          <button
            type="button"
            onClick={onCopy}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-200 ${
              isCopied
                ? "bg-green-500 text-white"
                : "bg-red-50 text-red-700 hover:bg-red-100"
            }`}
            aria-label={`Copy coupon code ${coupon.code}`}
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </div>

        {coupon.expiry && (
          <p className="text-xs text-gray-500 italic">Valid until: {coupon.expiry}</p>
        )}
      </div>
    </div>
  );
});

/* ========== Slider ========== */
export default function SpecialOffersSlider({ coupons: inputCoupons = [] }) {
  const containerRef = useRef(null);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const coupons = React.useMemo(
    () =>
      inputCoupons.length > 0
        ? inputCoupons
        : [
            {
              title: "Flat 33% Off",
              code: "RFEAST33",
              description: "Get Flat 33% Off on prepaid orders. Min ₹99.",
        
            },
            {
              title: "Flat 20% Off",
              code: "RFEAST20",
              description: "Flat 20% Off on prepaid orders. Min ₹999.",
            },
            {
              title: "Flat 15% Off",
              code: "RFEAST15",
              description: "Flat 15% Off on prepaid orders. Min ₹499.",
            },
            {
              title: "Flat 25% Off",
              code: "RFEAST25",
              description: "Flat 25% Off on prepaid orders. Min ₹2499.",
            },
            {
              title: "Flat 30% Off",
              code: "RFEAST30",
              description: "Flat 30% Off on prepaid orders. Min ₹4999.",
            },
            {
              title: "Welcome Discount",
              code: "SAVE20",
              description: "20% off on first order",
            },
            {
              title: "Free Shipping",
              code: "FREESHIP",
              description: "Free shipping over ₹50.",
            },
          ],
    [inputCoupons]
  );

  // Tripled list for seamless infinite effect
  const list = React.useMemo(() => [...coupons, ...coupons, ...coupons], [coupons]);
  const baseLen = coupons.length;

  // Helpers
  const getCards = () =>
    containerRef.current?.querySelectorAll(".slider-card") ?? [];

  const centerCard = useCallback((idx, behavior = "smooth") => {
    const container = containerRef.current;
    if (!container) return;
    const cards = getCards();
    const card = cards[idx];
    if (!card) return;

    const left =
      card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
    container.scrollTo({ left, behavior });
  }, []);

  const updateScrollPadding = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const firstCard = container.querySelector(".slider-card");
    const cardW = firstCard
      ? firstCard.getBoundingClientRect().width
      : Math.min(container.clientWidth * 0.9, 360);
    const offset = Math.max((container.clientWidth - cardW) / 2, 12);
    container.style.scrollPaddingLeft = `${offset}px`;
    container.style.scrollPaddingRight = `${offset}px`;
  }, []);

  // Initial mount → center to middle block
  useLayoutEffect(() => {
    updateScrollPadding();
    const container = containerRef.current;
    if (!container) return;

    // Center first card of the middle segment
    const startIdx = baseLen; // middle block start
    // timeout to ensure layout paints
    const t = setTimeout(() => centerCard(startIdx, "auto"), 50);

    const onResize = () => {
      updateScrollPadding();
      // After resize, re-center nearest
      centerNearest("auto");
    };

    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseLen, updateScrollPadding, centerCard]);

  // Find nearest card to current viewport center
  const getNearestIndex = useCallback(() => {
    const container = containerRef.current;
    const cards = getCards();
    if (!container || !cards.length) return 0;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let nearest = 0;
    let minDist = Infinity;
    cards.forEach((c, i) => {
      const cCenter = c.offsetLeft + c.clientWidth / 2;
      const d = Math.abs(cCenter - containerCenter);
      if (d < minDist) {
        minDist = d;
        nearest = i;
      }
    });
    return nearest;
  }, []);

  const normalizeToMiddle = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const idx = getNearestIndex();
    // Pull the index back to the middle segment [baseLen .. 2*baseLen-1]
    if (idx < baseLen) {
      centerCard(idx + baseLen, "auto");
    } else if (idx >= 2 * baseLen) {
      centerCard(idx - baseLen, "auto");
    }
  }, [baseLen, centerCard, getNearestIndex]);

  const centerNearest = useCallback(
    (behavior = "smooth") => {
      const idx = getNearestIndex();
      centerCard(idx, behavior);
    },
    [centerCard, getNearestIndex]
  );

  // Auto slide every 1s (pause on interaction)
  useEffect(() => {
    if (isInteracting) return;
    const id = setInterval(() => {
      const idx = getNearestIndex();
      centerCard(idx + 1, "smooth");
      // After the scroll, snap back to middle if we drift to an edge (no flicker)
      setTimeout(normalizeToMiddle, 350);
    }, 2000); // 1s as requested
    return () => clearInterval(id);
  }, [centerCard, getNearestIndex, normalizeToMiddle, isInteracting]);

  // Interaction handlers: pause auto when user drags/scrolls; resume after
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let interactionTimeout;
    const pause = () => {
      setIsInteracting(true);
      if (interactionTimeout) clearTimeout(interactionTimeout);
    };
    const resumeSoon = () => {
      if (interactionTimeout) clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => setIsInteracting(false), 400);
    };

    const onPointerDown = () => pause();
    const onPointerUp = () => resumeSoon();
    const onTouchStart = () => pause();
    const onTouchEnd = () => resumeSoon();
    const onWheel = () => pause();
    const onScroll = () => {
      // keep things centered after manual scroll stops
      if (interactionTimeout) clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        centerNearest("smooth");
        normalizeToMiddle();
        setIsInteracting(false);
      }, 250);
    };

    container.addEventListener("pointerdown", onPointerDown, { passive: true });
    container.addEventListener("pointerup", onPointerUp, { passive: true });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    container.addEventListener("wheel", onWheel, { passive: true });
    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("scroll", onScroll);
      if (interactionTimeout) clearTimeout(interactionTimeout);
    };
  }, [centerNearest, normalizeToMiddle]);

  const handleCopy = useCallback(async (code, idx) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const ta = document.createElement("textarea");
        ta.value = code;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1200);
    } catch (e) {
      console.error("Copy failed", e);
    }
  }, []);

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
          Special Offers &amp; Discounts
        </h2>

        {/* Track */}
        <div
          ref={containerRef}
          className="
            w-full overflow-x-auto scroll-smooth snap-x snap-mandatory
            -mx-4 px-4 py-2
            [scrollbar-width:none] [-ms-overflow-style:none]
          "
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Hide scrollbar in webkit (optional). Add this CSS globally if you want:
              .no-scrollbar::-webkit-scrollbar { display: none; }
           */}
          <div className="flex items-stretch gap-6">
            {list.map((c, i) => (
              <div
                key={`${c.code}-${i}`}
                className="
                  slider-card snap-center flex-shrink-0
                  w-[90%] sm:w-[60%] md:w-[45%] lg:w-[30%] xl:w-[24%]
                  max-w-[360px]
                "
              >
                <CouponCard
                  coupon={c}
                  onCopy={() => handleCopy(c.code, i)}
                  isCopied={copiedIdx === i}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
