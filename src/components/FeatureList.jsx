import React from 'react';
import {
  Wallet,
  Tag,
  Truck,
  MapPin,
  ShieldCheck,
  Award,
  Headset,
  Banknote,
  Clock,
  Tent,
  Smartphone,
  Star,
} from 'lucide-react';

// This component displays a list of key features in a responsive, modern design.
const FeatureList = () => {
  // Array of feature objects with a title, description, and an icon component.
  const features = [
    {
      title: 'No Minimum Order',
      description: 'Say Goodbye to restrictions.',
      icon: <Wallet size={24} className="text-red-600" />,
    },
    {
      title: 'Double Discount',
      description: 'Double the delight with exclusive discounts.',
      icon: <Tag size={24} className="text-red-600" />,
    },
    {
      title: 'Free Delivery',
      description: 'No Delivery, Platform & Convenience fee. Save 60 rs per order just because of this.',
      icon: <Truck size={24} className="text-red-600" />,
    },
    {
      title: 'Order Live Tracking',
      description: 'Track your order in real time.',
      icon: <MapPin size={24} className="text-red-600" />,
    },
    {
      title: 'Guaranteed Delivery',
      description: 'Get assured delivery or 100 rs in wallet.',
      icon: <ShieldCheck size={24} className="text-red-600" />,
    },
    {
      title: 'Quality Assurance',
      description: 'Get refund up to 50% in case of complain',
      icon: <Award size={24} className="text-red-600" />,
    },
    {
      title: '24 x 7 Customer Support',
      description: 'Your satisfaction is our priority, day or night!',
      icon: <Headset size={24} className="text-red-600" />,
    },
    {
      title: '25% Cashback on Delivery',
      description: 'Get flat 25% of order value in wallet',
      icon: <Banknote size={24} className="text-red-600" />,
    },
    {
      title: 'Easy Cancellation',
      description: 'Cancel order upto 1 hr before train arrival.',
      icon: <Clock size={24} className="text-red-600" />,
    },
    {
      title: '350+ Stations across India',
      description: 'Choose your meal from 1000+ restaurants',
      icon: <Tent size={24} className="text-red-600" />,
    },
    {
      title: 'Multiple Payment Options',
      description: 'Pay via UPI, Netbanking, cards or COD',
      icon: <Smartphone size={24} className="text-red-600" />,
    },
    {
      title: '100% Genuinely rated restaurants',
      description: 'No manipulations in restaurants rating',
      icon: <Star size={24} className="text-red-600" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-10 lg:p-12 mt-10">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-8 md:mb-10">
        Your culinary journey starts with RailFeast
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 hover:bg-red-50"
          >
            <div className="flex-shrink-0 mt-1">{feature.icon}</div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm md:text-base text-gray-600">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default FeatureList;
