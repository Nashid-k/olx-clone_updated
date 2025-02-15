import React, { useState, useEffect, lazy, Suspense } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";
import { useLocation } from "react-router-dom";

const ProductCard = lazy(() => import("../components/ProductCard"));

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsQuery = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(productsQuery);
        const dataList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(dataList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.description.toLowerCase().includes(searchQuery)
      )
    : products;

  return (
    <div className="bg-gray-200 min-h-screen py-4 sm:py-6">
      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-600 text-base sm:text-lg font-medium">Loading Products...</p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <h1 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Trending Listings</h1>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 justify-items-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Suspense 
                  key={product.id} 
                  fallback={
                    <div className="w-full h-48 bg-gray-100 rounded-md animate-pulse"></div>
                  }
                >
                  <ProductCard product={product} />
                </Suspense>
              ))
            ) : (
              <div className="text-gray-500 text-center col-span-full py-8">
                <p className="text-sm sm:text-base">
                  No products found for "{searchQuery}".
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
