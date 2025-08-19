import React from 'react';

// New React component for the "How It Works" section with a different design.
const HowItWorksV2 = () => {
    // Data for each step, including custom SVG icons.
    const steps = [
        {
            title: "Enter PNR/Train",
            description: "Provide your PNR or train number and select your boarding date.",
            icon: (
                <img
                    src="https://placehold.co/64x64/4F46E5/ffffff?text=Train"
                    alt="Train Icon"
                    className="w-16 h-16 rounded-full"
                />
            )
        },
        {
            title: "Choose Your Food",
            description: "Browse a variety of delicious meals from FSSAI-approved restaurants.",
            icon: (
                <img
                    src="https://placehold.co/64x64/F97316/ffffff?text=Food"
                    alt="Food Icon"
                    className="w-16 h-16 rounded-full"
                />
            )
        },
        {
            title: "Place Your Order",
            description: "Finalize your order with convenient online payment or Cash on Delivery.",
            icon: (
                <img
                    src="https://placehold.co/64x64/34D399/ffffff?text=Order"
                    alt="Order Icon"
                    className="w-16 h-16 rounded-full"
                />
            )
        },
        {
            title: "Get Food On Your Seat",
            description: "Your hot, fresh meal will be delivered directly to your train seat.",
            icon: (
                <img
                    src="https://placehold.co/64x64/EF4444/ffffff?text=Delivery"
                    alt="Delivery Icon"
                    className="w-16 h-16 rounded-full"
                />
            )
        }
    ];

    // SVG icon for the arrow with a new animation
    const ArrowIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300 transform rotate-90 lg:rotate-0 animate-pulse-horizontal lg:animate-pulse-vertical" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    );

    return (
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
            {/* Tailwind CSS CDN script for styling */}
            <script src="https://cdn.tailwindcss.com"></script>
            {/* Custom styles and animations */}
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }

                @keyframes slideInUp {
                    from {
                        transform: translateY(20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .step-card {
                    animation: slideInUp 0.6s ease-out forwards;
                }

                @keyframes pulse-horizontal {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    50% {
                        transform: translateX(5px);
                    }
                }

                @keyframes pulse-vertical {
                    0%, 100% {
                        transform: translateY(0) rotate(90deg);
                    }
                    50% {
                        transform: translateY(5px) rotate(90deg);
                    }
                }

                .animate-pulse-horizontal {
                    animation: pulse-horizontal 1.5s infinite;
                }
                .animate-pulse-vertical {
                    animation: pulse-vertical 1.5s infinite;
                }
                `}
            </style>
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Get food in three easy steps
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    Order delicious meals from FSSAI approved restaurants across India.
                </p>
            </div>

            <div className="mt-12 flex flex-col items-center lg:flex-row lg:justify-center lg:gap-8">
                {steps.map((step, index) => (
                    <React.Fragment key={index}>
                        <div
                            style={{ animationDelay: `${index * 0.2}s` }}
                            className="step-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col items-center text-center w-full max-w-sm lg:w-auto my-4 lg:my-0"
                        >
                            <div className="flex-shrink-0">
                                <div className="h-20 w-20 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                    {step.icon}
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                                <p className="mt-2 text-base text-gray-500">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="flex-shrink-0 text-gray-400 my-4 lg:my-0">
                                <ArrowIcon />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
};

// Main App component to render the new section
const App = () => {
  return (
    <div className="h-auto bg-gray-100 flex items-center justify-center p-4">
      <HowItWorksV2 />
    </div>
  )
}

export default App;
