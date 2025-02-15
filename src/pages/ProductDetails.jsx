import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaWhatsapp, FaShoppingCart } from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <p className="text-center text-gray-500">Product not found.</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        {/* Product Image & Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="w-full flex justify-center bg-gray-100 p-4 rounded-lg">
            <img
              src={product.imageUrl}
              alt={product.description}
              className="w-full max-h-[400px] object-contain rounded-md"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.description}</h1>
            <p className="text-xl md:text-2xl font-semibold text-blue-600 mt-2">₹{product.price}</p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Location:</span> {product.location || "Unknown Location"}
            </p>

            {/* Seller Info */}
            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Seller Information</h3>
              <p className="text-gray-700 mt-2">
                <span className="font-semibold">Name:</span> {product.username || "Seller"}
              </p>
              <p className="text-gray-600">Member since {product.joinedDate || "Unknown"}</p>

              {/* Chat & Buy Buttons */}
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition cursor-pointer">
                  <FaWhatsapp size={18} /> Chat Now
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition cursor-pointer">
                  <FaShoppingCart size={18} /> Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Extra Info */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900">Product Description</h2>
          <p className="text-gray-700 mt-2">{product.description || "No additional details provided."}</p>
        </div>
      </div>
    </div>
  );
}
