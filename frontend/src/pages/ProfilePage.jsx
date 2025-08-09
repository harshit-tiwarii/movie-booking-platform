import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import { setUser } from '../features/user/userSlice'; // We'll use this to update the store

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    photo: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    const uploadData = new FormData();
    uploadData.append('name', formData.name);
    if (formData.photo) {
      uploadData.append('photo', formData.photo);
    }

    try {
      const response = await axios.put(
        'http://localhost:3101/api/v1/userAuth/update-profile',
        uploadData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      // Update the user state in Redux with the new user data from the backend
      const updatedUser = {
        ...response.data.user,
        photo: response.data.user.photo.secure_url,
      };
      dispatch(setUser(updatedUser));

      alert('Profile updated successfully!');
      setIsEditing(false);
      setPreviewImage(null);

    } catch (error) {
      console.error('Failed to update profile:', error);
      alert(error.response?.data?.message || 'Failed to update profile.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ name: user?.name || '', photo: null });
    setPreviewImage(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-300 p-4 sm:p-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg"
      >
        <div className="flex flex-col items-center ">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>

          {/* This form is used for both viewing and editing */}
          <form onSubmit={handleUpdateProfile} className="w-full">
            {/* Profile Picture Section */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <img
                src={previewImage || user.photo}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-indigo-500 shadow-md"
              />
              {isEditing && (
                <label
                  htmlFor="photo-upload"
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 cursor-pointer hover:bg-indigo-700 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                  <input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              )}
            </div>

            {/* User Info Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${!isEditing ? 'bg-gray-100 border-gray-300' : 'border-gray-300'}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}