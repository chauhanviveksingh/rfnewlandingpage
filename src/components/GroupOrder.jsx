import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  X,
  Phone,
  Calendar,
  Mail,
  User,
  ClipboardList,
} from "lucide-react";

const GroupBulkOrder = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative flex flex-col items-center justify-center py-16 px-6 lg:px-20 font-sans">
      {/* Floating animated background circles */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-20 left-12 w-32 h-32 bg-red-200 rounded-full blur-3xl opacity-30"
      />
      <motion.div
        animate={{ x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-20 right-12 w-40 h-40 bg-red-300 rounded-full blur-3xl opacity-20"
      />

      {/* Main Group Order Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-10 max-w-2xl text-center border border-red-100"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg">
            <Users size={42} strokeWidth={2.5} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900">
          Group <span className="text-red-600">Order</span>
        </h2>

        {/* Highlighted description box */}
        <div className="mt-4 bg-gradient-to-r from-red-50 to-white border-l-4 border-red-500 shadow-sm rounded-xl px-6 py-4">
          <p className="text-gray-700 text-lg leading-relaxed">
            Planning food for a group? <br />
            Place a bulk order in just a few clicks. <br />
            Perfect for families, office teams, and friends traveling together.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg"
          >
            Bulk Order
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="tel:+919999999999" // replace with your number
            className="px-6 py-3 bg-white border-2 border-red-500 text-red-600 rounded-xl font-semibold shadow-md hover:bg-red-50 flex items-center justify-center gap-2"
          >
            <Phone size={20} />
            Call Us
          </motion.a>
        </div>
      </motion.div>

      {/* Modal Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              >
                <X size={24} />
              </button>

              {/* Heading */}
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                Bulk Order for Groups in Train Request Form
              </h2>
              <p className="text-gray-600 mb-6">
                Please fill this form to order food for groups in bulk quantity.
                We will get in touch with you with details and offers as per
                your journey plan.
              </p>

              {/* Form */}
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex items-center border rounded-xl px-3 py-2">
                  <User className="text-red-500 mr-2" size={20} />
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full outline-none"
                    required
                  />
                </div>

                {/* PNR */}
                <div className="flex items-center border rounded-xl px-3 py-2">
                  <ClipboardList className="text-red-500 mr-2" size={20} />
                  <input
                    type="text"
                    placeholder="PNR Number"
                    className="w-full outline-none"
                    required
                  />
                </div>

                {/* Email */}
                <div className="flex items-center border rounded-xl px-3 py-2">
                  <Mail className="text-red-500 mr-2" size={20} />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full outline-none"
                    required
                  />
                </div>

                {/* Mobile */}
                <div className="flex items-center border rounded-xl px-3 py-2">
                  <Phone className="text-red-500 mr-2" size={20} />
                  <input
                    type="tel"
                    placeholder="Mobile"
                    className="w-full outline-none"
                    required
                  />
                </div>

                {/* Passengers */}
                <div className="flex items-center border rounded-xl px-3 py-2">
                  <Users className="text-red-500 mr-2" size={20} />
                  <input
                    type="number"
                    placeholder="Number of Passengers"
                    className="w-full outline-none"
                    required
                  />
                </div>

                {/* Date */}
                <div className="flex items-center border rounded-xl px-3 py-2">
                  <Calendar className="text-red-500 mr-2" size={20} />
                  <input type="date" className="w-full outline-none" required />
                </div>

                {/* Preferences */}
                <div className="md:col-span-2 flex items-start border rounded-xl px-3 py-2">
                  <textarea
                    placeholder="Your Preferences (Ex. Thalis, Biryani, Burger, etc.)"
                    className="w-full outline-none resize-none"
                    rows="3"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 flex justify-center mt-4">
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-8 py-3 rounded-xl shadow hover:bg-red-700 transition font-semibold"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GroupBulkOrder;
