import React from "react";

export default function Footer() {
  const footerData = {
    popularLocations: ["Kolkata", "Mumbai", "Chennai", "Pune"],
    trending: ["Mobile Phones", "Cars", "Bikes", "Houses"],
    about: ["About OLX", "Contact Us", "Careers"],
    help: ["Help", "Sitemap", "Legal & Privacy"],
  };

  return (
    <footer className="bg-gray-100 py-6 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* Footer Links Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm text-gray-700">
          {/* Popular Locations */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 mb-3">POPULAR</h3>
            <ul className="space-y-1">
              {footerData.popularLocations.map((location) => (
                <li key={location}>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    {location}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trending */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 mb-3">TRENDING</h3>
            <ul className="space-y-1">
              {footerData.trending.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 mb-3">ABOUT</h3>
            <ul className="space-y-1">
              {footerData.about.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 mb-3">HELP</h3>
            <ul className="space-y-1">
              {footerData.help.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Social Media & App Download Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Social Links */}
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
          </div>

        
        </div>
      </div>
    </footer>
  );
}
