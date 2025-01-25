import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const features = [
  { name: "Unlimited contacts", included: true },
  { name: "Full CRM suite", included: true },
  { name: "Complete integration", included: true },
  { name: "Mobile app access", included: true },
  { name: "API access", included: true },
  { name: "Advanced analytics", included: true },
  { name: "Custom reporting", included: true },
  { name: "Dedicated support", included: true },
];

function PricingCard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">Enterprise</h2>
          <div className="mt-4 text-center">
            <span className="text-4xl font-bold">$199</span>
            <span className="text-gray-600 ml-2">/month</span>
          </div>
          <p className="mt-4 text-gray-600 text-center">
            Advanced features for large organizations
          </p>
        </div>

        <div className="px-8 py-6 bg-gray-50">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="ml-3 text-gray-600">{feature.name}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setShowModal(true)}
            className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Upgrade Now
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Complete your purchase</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card number
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry date
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="123"
                  />
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Pay $199
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PricingCard;
