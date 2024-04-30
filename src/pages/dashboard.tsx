import React, { useCallback, useEffect, useState } from "react";
import { graphqlClient } from "../../clients/api";
import { InsertNewEmployee } from "../../graphql/mutation/employees";
import { useRouter } from "next/router";
import { getSignedURLForTweetQuery } from "../../graphql/query/employee";
import toast from "react-hot-toast";
import axios from "axios";

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

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;

      const { getSignedURLForTweet } = await graphqlClient.request(
        getSignedURLForTweetQuery,
        {
          imageName: file.name,
          imageType: file.type,
        }
      );

      console.log(getSignedURLForTweet, " new tweet is occuring ");

      if (getSignedURLForTweet) {
        toast.loading("Uploading...");
        await axios.put(getSignedURLForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        toast.success("Upload Completed");
        const url = new URL(getSignedURLForTweet);
        const myFilePath = `${url.origin}${url.pathname}`;
        setFormData(prevFormData => ({
          ...prevFormData,
          profileImageUrl: myFilePath,
        }));
      } else {
        toast.error("Not Uploaded");
      }
    };
  }, []);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData, " formdata ");

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
    } else {
      toast.error("fill all the details");
    }
  };

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    const handlerFn = handleInputChangeFile(input);
    input.addEventListener("change", handlerFn);
    input.click();
  }, [handleInputChangeFile]);

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
          <div className="mb-4 flex justify-end">
            <button
              onClick={handleSelectImage}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Upload Image
            </button>
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
