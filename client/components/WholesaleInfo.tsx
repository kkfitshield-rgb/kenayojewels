import { Package, Percent, Clock } from 'lucide-react';

export default function WholesaleInfo() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-gray-900 text-3xl font-bold leading-9 mb-6 text-center">
            Wholesale Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="flex items-center justify-center bg-slate-800 rounded-full w-12 h-12 mx-auto mb-4">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-center">
                Minimum Order
              </h3>
              <p className="text-gray-600 text-sm leading-5 text-center">
                Starting from 50 pieces per design
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="flex items-center justify-center bg-slate-800 rounded-full w-12 h-12 mx-auto mb-4">
                <Percent className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-center">
                Volume Discounts
              </h3>
              <p className="text-gray-600 text-sm leading-5 text-center">
                Up to 30% off for bulk orders
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="flex items-center justify-center bg-slate-800 rounded-full w-12 h-12 mx-auto mb-4">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-center">
                Lead Time
              </h3>
              <p className="text-gray-600 text-sm leading-5 text-center">
                2-4 weeks production time
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
