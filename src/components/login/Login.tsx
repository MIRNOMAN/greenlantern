/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useLoginMutation } from "@/redux/api/authApi";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rememberMe) {
      toast.error("You must agree to be remembered.");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();

      if (rememberMe) {
        // Set the token as a cookie (expires in 7 days for example)
        Cookies.set("userToken", res.data.accessToken, { expires: 7 });
        console.log(res);
      }

      toast.success("Login successful!");
      router.push("/");
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen dark:text-black items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-900">
            Log In
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Enter your credentials below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-[#ECECEC] px-3 py-2 shadow-sm focus:border-yellow-300 focus:ring-yellow-300"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border px-3 py-2 border-[#ECECEC] shadow-sm focus:border-yellow-300 focus:ring-yellow-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[#ECECEC] text-yellow-400 focus:ring-yellow-300"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-700"
                >
                  Remember Me
                </label>
              </div>
              {/* <Link
                href="/login/forgot-password"
                className="text-sm text-yellow-400 hover:text-yellow-500"
              >
                Forgot Password?
              </Link> */}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-3xl bg-yellow-400 py-2 text-sm font-medium text-white hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <Link
          href="/register"
          className="block text-center mt-5 text-yellow-400 hover:text-yellow-500"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </div>
    </div>
  );
}
