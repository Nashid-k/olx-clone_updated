import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(product.price);

  const handleClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const capitalizedSeller = (name) => {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "Seller";
  };

  return (
    <div
      className="bg-white rounded-lg border border-gray-300 shadow-sm hover:shadow-lg transition-shadow duration-200 w-full max-w-[280px] cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative pb-[75%]">
        <img
          src={product.imageUrl}
          alt={product.description}
          className="absolute top-0 left-0 w-full h-full object-contain bg-white rounded-t-lg p-2"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-2 right-2 bg-gray-100 p-1.5 sm:p-2 rounded-full shadow-md hover:bg-gray-200 z-10"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 cursor-pointer text-sm sm:text-base" />
          ) : (
            <FaRegHeart className="text-gray-600 cursor-pointer text-sm sm:text-base" />
          )}
        </button>
      </div>
      <div className="p-3">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">
          ₹{formattedPrice}
        </h2>
        <p className="text-xs sm:text-sm text-gray-700 font-semibold mt-1 line-clamp-2 min-h-[32px]">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span className="truncate max-w-[45%]">
            {capitalizedSeller(product.sellerName)}
          </span>
          <span className="truncate max-w-[45%]">
            {product.location || "Unknown"}
          </span>
        </div>
      </div>
    </div>
  );
}
