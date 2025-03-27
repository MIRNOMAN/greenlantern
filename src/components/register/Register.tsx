"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Eye, EyeOff, Upload } from "lucide-react"
import Link from "next/link"
import { useRegisterMutation } from "@/redux/api/authApi"
import { toast } from "sonner"
import uploadFormData from "@/utils/uploadFormData"

export default function Register() {
  const [registerData] = useRegisterMutation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    PhotoUrl: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      console.log(e.target.files);
      formData.append("file", e.target.files[0]);

      const url = await uploadFormData(formData);
      setFormData((prev) => ({ ...prev, PhotoUrl: url }));
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form and password confirmation
    if (validateForm()) {
      if (formData.password !== formData.confirmPassword) {
        // If passwords do not match, set an error and return
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
        return;
      }

      try {
        // Prepare the data to be sent, including both passwords if they match
        const formDataToSend = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          photoUrl: formData.PhotoUrl,
          phone: formData.phone,
          password: formData.password, // Send the password since both match now
        };

        // Dispatch the register mutation with the form data
        const response = await registerData(formDataToSend);
       console.log(response)
        if (response.error) {
          console.error("Registration failed", response.error);
          toast.error("Registration failed. Please try again.");
        } else {
          // Handle successful registration (redirect, success message, etc.)
          console.log("Registration successful:", response.data);
          toast.success("Sign up successful!");
          // You can also redirect or do something else after successful registration
        }
      } catch (err) {
        console.error("Error during registration:", err);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen dark:text-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-semibold mb-2">Sign Up</h1>
          <p className="text-xl text-gray-600">Please enter your email and password below!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className={`w-full px-3 py-2 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-md border-[#ECECEC] focus:outline-none focus:ring-1 focus:ring-yellow-500`}
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className={`w-full px-3 py-2 border ${errors.lastName ? "border-red-500" : "border-gray-300"} border-[#ECECEC] rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500`}
            />
            {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@example.com"
              className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} border-[#ECECEC] rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+123456789"
              className={`w-full px-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} border-[#ECECEC] rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500`}
            />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Your Image</label>
            <div
              className={`border rounded-md p-6 text-center border-[#ECECEC] cursor-pointer ${isDragging ? "border-yellow-500 bg-yellow-50" : "border-gray-300"}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleBrowseClick}
            >
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              {file ? (
                <div className="flex flex-col items-center">
                  <Upload className="h-6 w-6 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">{file.name}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="h-6 w-6 text-gray-400 mb-2" />
                  <p className="text-sm font-medium">Browse Files</p>
                  <p className="text-xs text-gray-500 mt-1">Drag and drop files here</p>
                  <p className="text-xs">{formData.PhotoUrl}</p>
                </div>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} border-[#ECECEC]  rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 pr-10`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} border-[#ECECEC] rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 pr-10`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-300 text-black mt-2 py-2 px-4 rounded-3xl hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <div className="text-center rounded-3xl border border-[#ECECEC]">
            <Link href="/login">
              <button
                type="button"
                className="text-gray-600 w-full py-2 px-4 rounded-md hover:text-gray-900 focus:outline-none"
              >
                Log In
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
