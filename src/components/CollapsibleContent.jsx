import React, { useState } from "react";

const CollapsibleContent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleContent = () => setIsExpanded(!isExpanded);

  // Toggle a specific faq answer by index
  const toggleFaq = (index) =>
    setOpenFaqIndex(openFaqIndex === index ? null : index);

  const faqData = [
    {
      q: "What are the payment methods available to order food on train?",
      a:
        "You can pay using credit/debit cards, UPI, net banking and even digital wallets. Swiggy offers multiple payment options for a smooth checkout."
    },
    {
      q: "How can I track my food on train order?",
      a:
        "Once you place the order, you will get live tracking in your Swiggy App showing when your meal is being prepared, dispatched, and delivered."
    },
    {
      q: "Can I book food for someone else travelling by train?",
      a:
        "Yes, simply enter their PNR number and select the boarding station. Food will be delivered directly to their train seat even if you are not the traveler."
    },
    {
      q: "How do I raise a complaint about the food ordered through Swiggy?",
      a:
        "You can contact Swiggy customer support through the app help section. They will assist with refunds or replacements if there is any issue."
    },
    {
      q: "What are the cancellation and refund policies when you order food on train?",
      a:
        "Orders can be cancelled before the food is prepared. If the train is delayed or food cannot be delivered, Swiggy provides a full refund."
    },
    {
      q: "What happens to my food order if my train is cancelled?",
      a:
        "If the train is cancelled or does not reach the station, the order is automatically cancelled and a full refund is initiated."
    },
    {
      q: "Whom do I contact to receive my order at my train seat?",
      a:
        "The delivery executive will contact you on your phone number and deliver the food directly at your seat number mentioned in your PNR."
    },
    {
      q: "What will happen if Swiggy cannot deliver my order?",
      a:
        "In the rare case of non-delivery, Swiggy will refund your amount in full and you will be notified through the app."
    },
    {
      q: "My train is scheduled for next week. When can I place my order?",
      a:
        "You can pre-order meals usually 24 hours before your travel date so that food gets delivered fresh on the day of your journey."
    }
  ];

  return (
    <div className="text-center my-10">
      {/* Always visible heading */}
      <h2 className="text-2xl md:text-3xl font-bold">
        Happy travel! <br />
        See you on your train ride <span role="img" aria-label="heart">💗</span>
      </h2>

      {/* Explore More */}
      {!isExpanded && (
        <button
          onClick={toggleContent}
          className="mt-6 px-8 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-xl hover:bg-orange-100 transition-all duration-200 inline-flex items-center gap-2"
        >
          Explore More <span>➜</span>
        </button>
      )}

      {/* Expanded entire block */}
      {isExpanded && (
        <div className="mt-10 text-left max-w-3xl mx-auto space-y-8">

          {/* Benefits Section */}
          <div>
            <h3 className="text-xl font-bold mb-2">Benefits of Ordering Food on Train Using Swiggy</h3>
            <p>Let's explore some of the key advantages:</p>
            <ol className="list-decimal ml-6 space-y-2">
              <li>
                <strong>Breakfast to Dinner from 6AM to 11PM</strong> Verify your
                PNR and get the best meals for you, your kids or your elderly
                parents – delivered to your train seat from 6AM to 11PM across
                100+ railway stations.
              </li>
              <li>
                <strong>Order to your Train Seat at 100+ Railway Stations</strong>{" "}
                Swiggy has partnered with IRCTC to deliver Food on Train at
                Vijayawada, Kanpur, Bhopal, Nagpur, and a hundred more stations.
              </li>
              <li>
                <strong>Delivery to your Train Seat</strong> Skip crowded
                platforms to buy food. Search “IRCTC” on the Swiggy App, enter
                PNR and place your order. Get up to 60% off on meals that will
                be delivered to your train seat.
              </li>
              <li>
                <strong>Variety of Cuisines and Dishes</strong> Craving Biryani
                or Pizza, Idlis or Noodles? Be it{" "}
                <u>North Indian</u>, <u>South Indian</u>, <u>Chinese</u>, or{" "}
                <u>Continental</u> – explore the widest menu options only on the
                Swiggy App.
              </li>
              <li>
                <strong>Assured Delivery, or Full Refund</strong> Rest assured
                with Swiggy’s promise of full refund if we are not able to
                deliver food to you. You can also cancel your order if meal
                preparation hasn’t started.
              </li>
            </ol>
          </div>

          {/* How To Use Section */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold">How to Use Swiggy for Railway Food Delivery on Trains?</h3>
            <p>Here are the simple steps to follow to place your order through the App:</p>

            <p><strong>Step 1:</strong> Search “Train’’ in the Swiggy app and enter your PNR to proceed.</p>
            <p><strong>Step 2:</strong> Select a restaurant at the selected station and add items to your cart.</p>
            <p><strong>Step 3:</strong> Place your order, make payment and track your delivery live in the app.</p>

            <p>Now enjoy tasty food delivered right to your train seat in partnership with IRCTC.</p>
          </div>

          {/* Menu Options */}
          <div>
            <h3 className="text-xl font-bold">Menu Options for Train Food Delivery</h3>
            <ol className="list-decimal ml-6 space-y-1">
              <li>North Indian Cuisine</li>
              <li>South Indian Cuisine</li>
              <li>Chinese Cuisine</li>
              <li>Continental Cuisine</li>
              <li>Snacks and Beverages</li>
              <li>Italian Cuisine</li>
              <li>Mexican Cuisine</li>
              <li>Mediterranean Cuisine</li>
              <li>Thai Cuisine</li>
              <li>Mughlai Cuisine</li>
            </ol>
          </div>

          {/* FAQ Section */}
          <div>
            <h3 className="text-xl font-bold text-center mb-4">FAQ'S</h3>
            <div className="border border-gray-300 rounded-xl p-4 space-y-2">
              {faqData.map((faq, index) => (
                <div key={index} className="border-b last:border-none pb-2">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center text-left font-medium"
                  >
                    {faq.q}
                    <span className="text-xl">
                      {openFaqIndex === index ? "▲" : "▼"}
                    </span>
                  </button>
                  {openFaqIndex === index && (
                    <p className="mt-2 text-gray-700">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Train List */}
          <div>
            <h3 className="text-xl font-bold">Top trains on which Swiggy is delivering</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Order food in KONARK EXPRESS – 11019</li>
              <li>Order food in JYOTI EXPRESS – 12565</li>
              <li>Order food in MANGALA LDWEEP EXP – 12602</li>
              <li>Order food in MAS HYB SF EXP – 12603</li>
              <li>Order food in NIZAMUDDIN EXPRESS – 12615</li>
              <li>Order food in TAMILNADU EXP – 12622</li>
              <li>Order food in KERALA EXPRESS – 12625</li>
              <li>Order food in NAVJEEVAN EXP – 12655</li>
              <li>Order food in HUSSAIN SAGAR – 12702</li>
              <li>Order food in FALAKNUMA EXP – 12704</li>
              <li>Order food in GODAVARI EXP – 12728</li>
              <li>Order food in HAZRAT NIZAMUDDIN EXPRESS – 12862</li>
              <li>Order food in CAPE MUMBAI EXPRESS – 16382</li>
              <li>Order food in BANGALORE EXPRESS – 16525</li>
            </ul>
          </div>

          {/* Stations List */}
          <div>
            <h3 className="text-xl font-bold">Top stations on which Swiggy is delivering</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Order food at Surat railway station</li>
              <li>Order food at Nagpur railway station</li>
              <li>Order food at Vadodara railway station</li>
              <li>Order food at Bhopal railway station</li>
              <li>Order food at Vijayawada railway station</li>
              <li>Order food at Kanpur railway station</li>
              <li>Order food at Delhi railway station</li>
              {/* Add more stations as needed */}
            </ul>
          </div>

          {/* Show Less Button */}
          <div className="text-center">
            <button
              onClick={toggleContent}
              className="mt-6 px-8 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-xl hover:bg-orange-100 transition-all duration-200 inline-flex items-center gap-2"
            >
              Show Less <span>▲</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default CollapsibleContent;
