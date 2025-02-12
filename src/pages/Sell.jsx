import React, { useState } from "react";
import { storage, db } from "../services/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Sell() {
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !price || !description || !location) {
      toast.error("All fields are required!");
      return;
    }
    setLoading(true);

    try {
      const storageRef = ref(storage, `products/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload error:", error);
          toast.error("Failed to upload image!");
          setLoading(false);
        },
        async () => {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, "products"), {
            imageUrl,
            price,
            description,
            location,
            timestamp: new Date(),
          });
          toast.success("Product listed successfully!");
          setImage(null);
          setPrice("");
          setDescription("");
          setLocation("");
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to list product!");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Post Your Ad</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Upload */}
          <label className="block text-gray-700 font-semibold">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          {/* Price Input */}
          <label className="block text-gray-700 font-semibold">Price (INR)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          {/* Location Input */}
          <label className="block text-gray-700 font-semibold">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or area"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          {/* Description Input */}
          <label className="block text-gray-700 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your product"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 h-24"
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all cursor-pointer"
          >
            {loading ? "Uploading..." : "Post Ad"}
          </button>
        </form>
      </div>
    </div>
  );
}
