import React, { useState } from "react";

const CollapsibleContent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleContent = () => setIsExpanded(!isExpanded);
  const toggleFaq = (index) =>
    setOpenFaqIndex(openFaqIndex === index ? null : index);

  const faqData = [
    {
      q: "What are the payment methods available to order food on train?",
      a: "You can pay using cards, UPI, net banking or wallets. Swiggy offers multiple options for hassle-free checkout.",
    },
    {
      q: "How can I track my food on train order?",
      a: "Once your order is placed, the app shows live tracking as food is prepared, dispatched and delivered.",
    },
    {
      q: "Can I book food for someone else travelling by train?",
      a: "Yes, you can enter their PNR number and Swiggy will deliver to their seat even if you are not travelling.",
    },
    {
      q: "How do I raise a complaint about the food ordered through Swiggy?",
      a: "Use the Help section in the Swiggy App to raise a complaint. Swiggy will assist or refund if needed.",
    },
    {
      q: "What are the cancellation and refund policies when you order food on train?",
      a: "You can cancel before the meal is prepared. If delivery fails, Swiggy refunds the full amount.",
    },
  ];

  return (
    <div className="bg-white py-10 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Happy travel! <br />
        See you on your train ride{" "}
        <span role="img" aria-label="heart">
          🚊
        </span>
      </h2>

      {!isExpanded ? (
        <button
          onClick={toggleContent}
          className="mt-6 px-8 py-3 border-2 border-red-600 text-[#cb212e] font-semibold rounded-xl hover:bg-red-100 transition-all duration-200"
        >
          Explore More ➜
        </button>
      ) : (
        <div className="w-full max-w-4xl space-y-6 mt-10">
          {/* Benefits Card */}
          <div className="bg-white shadow-md rounded-2xl p-6 space-y-3">
            <h3 className="text-xl font-bold mb-2">
              Benefits of Ordering Food on Train Using RailFeast
            </h3>
            <ol className="list-decimal ml-5 space-y-2 text-gray-700">
              <li>
                <strong>Breakfast to Dinner:</strong> Meals from 6AM–11PM
                delivered to your seat.
              </li>
              <li>
                <strong>100+ Railway Stations:</strong> Swiggy partners with
                IRCTC for wide coverage.
              </li>
              <li>
                <strong>Delivery to Seat:</strong> Order through the app, get
                food at your train seat.
              </li>
              <li>
                <strong>Wide Cuisines:</strong> North, South, Chinese,
                Continental and more.
              </li>
              <li>
                <strong>Refund Policy:</strong> Full refund if delivery fails or
                is cancelled early.
              </li>
            </ol>
          </div>

          {/* How to Use Card */}
          <div className="bg-white shadow-md rounded-2xl p-6 space-y-3">
            <h3 className="text-xl font-bold mb-2">
              How to Use RailFeast for Railway Food Delivery
            </h3>
            <p>
              <strong>Step 1:</strong> Search “Train” and enter your PNR in the
              Swiggy app.
            </p>
            <p>
              <strong>Step 2:</strong> Select a restaurant and add items you
              want.
            </p>
            <p>
              <strong>Step 3:</strong> Place the order and track the delivery in
              real-time.
            </p>
          </div>

          {/* Menu Options Card */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-2">
              Menu Options for Train Food Delivery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-gray-700">
              <p>North Indian Cuisine</p>
              <p>South Indian Cuisine</p>
              <p>Chinese Cuisine</p>
              <p>Continental Cuisine</p>
              <p>Snacks & Beverages</p>
              <p>Italian Cuisine</p>
              <p>Mexican Cuisine</p>
              <p>Mediterranean Cuisine</p>
              <p>Thai Cuisine</p>
              <p>Mughlai Cuisine</p>
            </div>
          </div>

          {/* Install App Section */}
          <div className="bg-white shadow-md rounded-2xl p-6 space-y-2">
            <h3 className="text-xl font-bold">
              Get Food on Train! Install RailFeast App
            </h3>
            <p className="text-gray-700">
              Search “Train”, enter PNR & order your food. Experience fresh
              meals delivered without leaving your seat.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="block text-blue-600 underline font-semibold"
              >
                Download RailFeast for iOS
              </a>
              <a
                href="#"
                className="block text-blue-600 underline font-semibold"
              >
                Download RailFeast for Android
              </a>
            </div>
          </div>

          {/* FAQ Card */}
          <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6">
            <h3 className="text-xl font-bold mb-4 text-center">FAQ's</h3>
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-300 last:border-none py-3"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left font-medium"
                >
                  {faq.q}
                  <span>{openFaqIndex === index ? "⌃" : "⌵"}</span>
                </button>
                {openFaqIndex === index && (
                  <p className="mt-2 text-gray-700">{faq.a}</p>
                )}
              </div>
            ))}
          </div>

          {/* Train List Card */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-2">
              Top Trains on which RailFeast is Delivering
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              {[
                "Order Food at KONARK EXPRESS – 11019",
                "Order Food at JYOTI EXPRESS – 12565",
                "Order Food at MANGALA LDWEEP EXP – 12602",
                "Order Food at MAS HYB SF EXP – 12603",
                "Order Food at NIZAMUDDIN EXPRESS – 12615",
                "Order Food at TAMILNADU EXP – 12622",
                "Order Food at KERALA EXPRESS – 12625",
                "Order Food at NAVJEEVAN EXP – 12655",
                "Order Food at HUSSAIN SAGAR – 12702",
                "Order Food at FALAKNUMA EXP – 12704",
                "Order Food at GODAVARI EXP – 12728",
                "Order Food at HAZRAT NIZAMUDDIN EXP – 12862",
                "Order Food at CAPE MUMBAI EXPRESS – 16382",
                "Order Food at BANGALORE EXPRESS – 16525",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border border-gray-300 rounded-lg p-3 hover:bg-orange-50 transition"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Station List Card */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-2">
              Top Stations on which RailFeast is Delivering
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              {[
                "Order Food at Surat railway station",
                "Order Food at Nagpur railway station",
                "Order Food at Vadodara railway station",
                "Order Food at Bhopal railway station",
                "Order Food at Vijayawada railway station",
                "Order Food at Kanpur railway station",
                "Order Food at Delhi railway station",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border border-gray-300 rounded-lg p-3 hover:bg-orange-50 transition"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Show Less Button */}
          <div className="text-center">
            <button
              onClick={toggleContent}
              className="mt-4 px-8 py-3 border-2 border-red-600 text-[#cb212e] font-semibold rounded-xl hover:bg-red-100 transition-all duration-200"
            >
              Show Less ⌃
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollapsibleContent;
