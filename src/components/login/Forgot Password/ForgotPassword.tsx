"use client"

import type React from "react"

import { useState } from "react"

import Link from "next/link"


export default function ForgotPassword() {
  const [email, setEmail] = useState("")
//   const dispatch = useDispatch()
//   const { loading, error } = useSelector((state: RootState) => state.auth)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     dispatch(sendResetCode(email))
//   }

  return (
     <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-semibold mb-2">Forget Password!</h1>
        <p className="text-muted-foreground text-xl">Enter your registered email below</p>
      </div>

      <form  className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndylan@example.com"
            className="w-full p-2 border border-[#ECECEC] rounded"
            required
            />
        </div>

        <div className="text-sm">
          <span>Remember the password? </span>
          <Link href="/login" className="text-yellow-500 hover:underline">
            Sign in
          </Link>
        </div>

        {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}

       <Link href="/login/forgot-password/verification-form">
       <button
          type="submit"
          //   disabled={loading}
          className="w-full bg-yellow-300 hover:bg-yellow-400 py-3 mt-3 rounded-3xl font-medium transition-colors"
        
          >
            send code
          {/* {loading ? "Sending..." : "Send Code"} */}
        </button>
       </Link>
      </form>
    </div>

</div>
  )
}

