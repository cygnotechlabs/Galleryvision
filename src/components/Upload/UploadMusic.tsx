import React, { useRef, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/apiConfig";
import { MauthInstance } from "../../hooks/axiosInstances";
import toast, { Toaster } from "react-hot-toast";

const UploadMusic: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (
      !fileInputRef.current ||
      !fileInputRef.current.files ||
      fileInputRef.current.files.length === 0
    ) {
      console.error("No file selected.");
      return;
    }

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setShowModal(true);
      await axios.post(API_ENDPOINTS.UPLOADMUSIC, formData, {
        headers: MauthInstance(),
      });
      console.log("File uploaded successfully!");
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file:");
    } finally {
      setUploading(false);
      setShowModal(false);
    }
  };

  return (
    <div className="flex flex-col items-center my-8 rounded-2xl px-7 py-4 bg-white">
      <Toaster />
      <h2 className="text-sm font-bold mb-4 ">Upload Music XLXS File</h2>
      <div
        onClick={handleBrowseClick}
        className="relative bg-green-100 rounded-lg w-full px-8 border-2 border-dashed border-gray-300 flex flex-col items-center cursor-pointer"
      >
        <div className="flex flex-col items-center pt-4">
          <div className="text-red-500 rounded-full flex justify-center items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="green"
              className="w-[70px] h-[60px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          <div className="flex">
            <p className="text-black font-medium text-sm mb-">
              Select your File here,
            </p>
            <a className="text-red-600 font-medium text-sm hover:underline pl-1">
              Browse
            </a>
          </div>
        </div>
        <p className="text-gray-500 text-xs pb-4 mt-4">
          Supported formats: XLXS files
        </p>
        <input
          type="file"
          accept=".xlsx"
          ref={fileInputRef}
          className="hidden"
        />
      </div>
      <button
        className="bg-black text-white w-[304px] py-2 px-8 rounded-md mt-4"
        onClick={handleSubmit}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload file"}
      </button>

      {showModal && (
        <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 flex flex-col items-center">
            <p className="mb-4">Uploading Music...</p>
            <div className="w-full h-4 bg-gray-200 rounded-full">
              <div className="loader">
                <div className="inner_loader"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadMusic;
