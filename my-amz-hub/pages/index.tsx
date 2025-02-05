import Link from 'next/link';
import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to My Amz Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/data-tool">
          <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-100">
            <h2 className="text-xl font-semibold mb-2">Data Tool</h2>
            <p>Analyze and manage your Amazon data.</p>
          </div>
        </Link>
        <Link href="/forecasting-tool">
          <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-100">
            <h2 className="text-xl font-semibold mb-2">Forecasting Tool</h2>
            <p>Predict future sales and optimize inventory.</p>
          </div>
        </Link>
        <Link href="/seo-tool">
          <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-100">
            <h2 className="text-xl font-semibold mb-2">SEO Tool</h2>
            <p>Improve your product's visibility on Amazon.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
