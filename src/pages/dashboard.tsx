import React, { useEffect, useState } from "react";
import { graphqlClient } from "../../clients/api";
import { InsertNewEmployee } from "../../graphql/mutation/employees";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [token, setToken] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedInProfile: "",
    profileImageUrl: "",
    aadharNumber: 0,
    password: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("_admin_token")) {
      router.back();
    } else {
      setToken(true);
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name == "aadharNumber") {
      setFormData({
        ...formData,
        [name]: Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e: any) => {
    setFormData({
      ...formData,
      profileImageUrl: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      formData.aadharNumber &&
      formData.email &&
      formData.linkedInProfile &&
      formData.name &&
      formData.profileImageUrl
    ) {
      const insert = await graphqlClient.request(InsertNewEmployee, {
        employee: formData,
      });

      setFormData({
        name: "",
        email: "",
        linkedInProfile: "",
        profileImageUrl: "",
        aadharNumber: 0,
        password: "",
      });
    }
  };
  if (!token) return;
  return (
    <div className="bg-black min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Dashboard
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 rounded-lg shadow-md p-8"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-white mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded bg-gray-700 px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded bg-gray-700 px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="linkedInProfile" className="block text-white mb-2">
              LinkedIn Profile:
            </label>
            <input
              type="text"
              id="linkedInProfile"
              name="linkedInProfile"
              value={formData.linkedInProfile}
              onChange={handleChange}
              className="w-full rounded bg-gray-700 px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="aadharNumber" className="block text-white mb-2">
              Aadhar Number:
            </label>
            <input
              type="number"
              id="aadharNumber"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              className="w-full rounded bg-gray-700 px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="uploadImage" className="block text-white mb-2">
              Upload Image:
            </label>
            <input
              type="file"
              id="uploadImage"
              name="uploadImage"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-gray-700 py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          {formData.profileImageUrl && (
            <img
              src={formData.profileImageUrl}
              alt="Uploaded Profile"
              className="w-32 h-32 mx-auto mb-4 rounded-full"
            />
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
