import React from 'react';
import { Facebook, Youtube, Twitter, Rss, Instagram, Phone, Mail } from 'lucide-react';

// This is the main Footer component that renders the entire footer section.
const Footer = () => {
  return (
    <footer className="bg-[#2a2a2a] text-white py-12 px-4 sm:px-6 lg:px-8 font-[Inter] rounded-t-xl">
      <div className="container mx-auto max-w-7xl">
        {/* Top section: Logo, description, and link columns */}
        <div className="flex flex-col lg:flex-row justify-between mb-8 space-y-8 lg:space-y-0 lg:space-x-8">
          {/* RailFeast branding and description */}
          <div className="flex-shrink-0 w-full lg:w-1/4">
            <div className="flex items-center mb-4">
              {/* This is a simple SVG for the logo, as per best practices. A proper image would be loaded here. */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#e52822]">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M8 21h8"></path>
                <path d="M12 17v4"></path>
              </svg>
              <span className="ml-2 text-2xl font-bold">RAILFEAST</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              RailFeast is an E-catering service provider that delivers hot and delicious food in trains right at your berth sourced only from the trusted FSSAI-approved restaurants across India.
            </p>
          </div>

          {/* Link columns section */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 flex-grow">
            {/* Company links column */}
            <div>
              <h3 className="text-base font-semibold mb-4 text-[#8f8f8f]">COMPANY</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Career</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Blogs</a></li>
              </ul>
            </div>

            {/* Legal links column */}
            <div>
              <h3 className="text-base font-semibold mb-4 text-[#8f8f8f]">LEGAL</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Refund & Cancellation</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Offer Terms</a></li>
              </ul>
            </div>

            {/* Help & Support links column */}
            <div>
              <h3 className="text-base font-semibold mb-4 text-[#8f8f8f]">HELP & SUPPORT</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Offers</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Callback Request</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Cancellation Request</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Feedback</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Complaint</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Faqs</a></li>
              </ul>
            </div>

            {/* Partnerships links column */}
            <div>
              <h3 className="text-base font-semibold mb-4 text-[#8f8f8f]">PARTNERSHIPS</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Restaurant Signup</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Tour Operator Signup</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Affiliate Program</a></li>
              </ul>
              <h3 className="text-base font-semibold mb-4 mt-8 text-[#8f8f8f]">OTHERS</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Group Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Pure Veg Food</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Jain Food</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social media icons and contact info */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mb-8 pt-8 border-t border-gray-700">
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors duration-200">
              <Facebook size={24} />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors duration-200">
              <Youtube size={24} />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors duration-200">
              <Twitter size={24} />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors duration-200">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-400 transition-colors duration-200">
              <Rss size={24} />
            </a>
          </div>
        </div>

        {/* Bottom copyright and tagline section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 border-t pt-8 border-gray-700">
          <p className="text-center sm:text-left mb-2 sm:mb-0">
            Copyright © 2025, RailFeast.All Rights Reserved. | Recognised by DIPP, Govt of India - DIPP81825
          </p>
          <div className="flex items-center text-center sm:text-right">
            <img src="https://placehold.co/30x30/FFFFFF/000000?text=Logo" alt="Deliver happiness logo" className="h-6 w-6 mr-2" />
            <span>Delivering Happiness at your Berth</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App component to render the Footer

export default Footer;
