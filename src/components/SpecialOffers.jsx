import React, { useState } from 'react';
import { Copy, Tag } from 'lucide-react';

// New component for special offers and discounts
const SpecialOffersSection = () => {
    // State to manage the "Copied!" message for each coupon
    const [copiedIndex, setCopiedIndex] = useState(null);

    const coupons = [
        {
            code: "FIRST15",
            description: "Get 15% off on your first order. Max discount ₹50.",
        },
        {
            code: "FOOD20",
            description: "Flat 20% off on all orders over ₹200.",
        },
        {
            code: "TRAIN50",
            description: "₹50 off on orders above ₹250. Limited time offer!",
        },
        {
            code: "COMBO75",
            description: "₹75 off on all combo meals. Hurry up!",
        },
        {
            code: "SAVEBIG",
            description: "Save big on your order. Limited to 1 use per user.",
        },
        {
            code: "DELICIOUS10",
            description: "Get 10% off on selected desserts and beverages.",
        },
    ];

    const handleCopyClick = (code, index) => {
        // Use a temporary textarea to copy the text to the clipboard
        const el = document.createElement('textarea');
        el.value = code;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        // Show "Copied!" message for a few seconds
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 3000);
    };

    return (
        <section className="bg-gradient-to-br from-red-50 to-pink-100 py-16 px-4 sm:px-6 lg:px-8 font-sans">
            {/* Tailwind CSS CDN script for styling */}
            <script src="https://cdn.tailwindcss.com"></script>
            {/* Custom styles for the app */}
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
                `}
            </style>
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Special Offers & Discounts
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    Exciting deals and coupon codes for your next food order.
                </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coupons.map((coupon, index) => (
                    <div
                        key={index}
                        className="relative bg-white p-6 rounded-lg shadow-xl border-t-4 border-red-500 transform transition duration-300 hover:scale-105"
                    >
                        <div className="absolute top-0 right-0 p-4">
                            <Tag size={24} className="text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 tracking-wide flex items-center">
                            <Copy size={20} className="mr-2 text-gray-500" />
                            {coupon.code}
                        </h3>
                        <p className="mt-2 text-gray-600">{coupon.description}</p>
                        <button
                            onClick={() => handleCopyClick(coupon.code, index)}
                            className="mt-4 w-full py-2 px-4 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            {copiedIndex === index ? "Copied!" : "Copy Code"}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

// Main App component to render the section
const App = () => {
    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <SpecialOffersSection />
        </div>
    );
};

export default App;
