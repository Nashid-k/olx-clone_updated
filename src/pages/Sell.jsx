import React, { useState } from "react";
import { storage, db } from "../services/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth

export default function Sell() {
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from auth context

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
    if (!user) {
      toast.error("Please login to post an ad!");
      return;
    }
    setLoading(true);

    try {
      const storageRef = ref(storage, `products/${Date.now()}_${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error("Upload error:", error);
          toast.error("Failed to upload image!");
          setLoading(false);
        },
        async () => {
          try {
            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            
           
            await addDoc(collection(db, "products"), {
              imageUrl,
              price,
              description,
              location,
              createdAt: new Date(),
              sellerId: user.uid,
              sellerName: user.displayName || user.email, 
              sellerEmail: user.email
            });

            toast.success("Product listed successfully!");
            setImage(null);
            setPrice("");
            setDescription("");
            setLocation("");
            setLoading(false);
            navigate("/");
          } catch (error) {
            console.error("Error in completion handler:", error);
            toast.error("Failed to complete product listing!");
            setLoading(false);
          }
        }
      );
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to list product!");
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Post Your Ad</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Price Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Price (INR)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or area"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your product"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 h-24"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Post Ad"}
          </button>
        </form>
      </div>
    </div>
  );
}