import React, { useState } from "react";
import { Users, Phone, Mail, Calendar, Hash, User, Users2 } from "lucide-react";

export default function GroupOrder() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="w-full flex flex-col items-center py-10 bg-gray-50">
      {/* Collapsed View */}
      {!openForm && (
        <div className="text-center space-y-4">
          <Users className="w-14 h-14 text-red-600 mx-auto" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Travelling as a group of 10 or more people?
          </h2>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setOpenForm(true)}
              className="flex items-center gap-2 px-5 py-2 border-2 border-red-600 text-red-600 font-semibold rounded-xl hover:bg-red-600 hover:text-white transition"
            >
              <Mail className="w-5 h-5" /> Bulk Order
            </button>
            <a
              href="tel:+918448440386"
              className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
            >
              <Phone className="w-5 h-5" /> +91-8448440386
            </a>
          </div>
        </div>
      )}

      {/* Expanded Form */}
      {openForm && (
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-red-600 mb-2">
            Bulk Order for Groups in Train Request Form
          </h3>
          <p className="text-gray-600 mb-6">
            Please fill this form to order food for groups in bulk. We will get in
            touch with you with details and offers as per your journey plan.
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="flex items-center border rounded-lg px-3">
              <User className="w-5 h-5 text-red-500 mr-2" />
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full p-2 outline-none"
              />
            </div>

            {/* PNR */}
            <div className="flex items-center border rounded-lg px-3">
              <Hash className="w-5 h-5 text-red-500 mr-2" />
              <input
                type="text"
                placeholder="PNR Number"
                required
                className="w-full p-2 outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex items-center border rounded-lg px-3">
              <Mail className="w-5 h-5 text-red-500 mr-2" />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full p-2 outline-none"
              />
            </div>

            {/* Mobile */}
            <div className="flex items-center border rounded-lg px-3">
              <Phone className="w-5 h-5 text-red-500 mr-2" />
              <input
                type="tel"
                placeholder="Mobile"
                required
                className="w-full p-2 outline-none"
              />
            </div>

            {/* Passengers */}
            <div className="flex items-center border rounded-lg px-3 md:col-span-1">
              <Users2 className="w-5 h-5 text-red-500 mr-2" />
              <input
                type="number"
                placeholder="Number of Passengers"
                required
                className="w-full p-2 outline-none"
              />
            </div>

            {/* Date */}
            <div className="flex items-center border rounded-lg px-3 md:col-span-1">
              <Calendar className="w-5 h-5 text-red-500 mr-2" />
              <input
                type="date"
                required
                className="w-full p-2 outline-none"
              />
            </div>

            {/* Preferences */}
            <textarea
              placeholder="Your Preferences (Ex. Thalis, Biryani, Burger, etc.)"
              className="border rounded-lg p-3 col-span-1 md:col-span-2 outline-none"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="col-span-1 md:col-span-2 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Submit Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
