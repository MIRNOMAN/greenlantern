"use client"

import Link from "next/link"
import type React from "react"

import { useState, useRef, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { verifyCode, resendCode } from "@/lib/redux/slices/authSlice"
// import type { RootState } from "@/lib/redux/store"

export default function VerificationForm() {
  const [code, setCode] = useState<string[]>(Array(6).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
//   const dispatch = useDispatch()
//   const { loading, error, email } = useSelector((state: RootState) => state.auth)

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6)
  }, [])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    // Take only the last character if multiple are pasted
    newCode[index] = value.slice(-1)
    setCode(newCode)

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a number and has correct length
    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.split("").slice(0, 6)
    const newCode = [...code]

    digits.forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit
      }
    })

    setCode(newCode)

    // Focus the next empty input or the last one if all filled
    const nextEmptyIndex = newCode.findIndex((val) => !val)
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     const verificationCode = code.join("")
//     if (verificationCode.length === 6) {
//       dispatch(verifyCode(verificationCode))
//     }
//   }

//   const handleResend = () => {
//     dispatch(resendCode())
//   }

  return (
  

    <div className="flex min-h-screen flex-col items-center justify-center p-4">

    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold mb-4">Verification Code</h1>
        <p className="text-gray-600">
          We have sent a verification code to your{" "}
          {/* <span className="text-yellow-400">{email || "support@gmail.com"}</span> */}
        </p>
      </div>

      <form  className="space-y-8">
        <div className="flex justify-center gap-2 sm:gap-4">
          {[...Array(6)].map((_, index) => (
              <input
              key={index}
              //   ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={code[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
              />
            ))}
        </div>

        {/* {error && <p className="text-red-500 text-center text-sm">{error}</p>} */}

        <Link href="/login/forgot-password/verification-form/change-password">
        <button
          type="submit"
          //   disabled={loading || code.some((digit) => !digit)}
          className="w-full bg-yellow-300 hover:bg-yellow-400 py-3 mt-4 rounded-3xl font-medium transition-colors disabled:opacity-70"
          >
          {/* {loading ? "Verifying..." : "Verify"} */ } Verifying
        </button>
        </Link>

        <div className="text-center text-gray-600">
          Don&apos;t receive the code?{" "}
          <button type="button"  className="text-yellow-400 hover:underline focus:outline-none">
            Resent
          </button>
        </div>
      </form>
    </div>
</div>
          
  )
}




{/* <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-center gap-2 sm:gap-4">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={code[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading || code.some((digit) => !digit)}
          className="w-full bg-yellow-300 hover:bg-yellow-400 py-3 rounded font-medium transition-colors disabled:opacity-70"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <div className="text-center text-gray-600">
          Don&apos;t receive the code?{" "}
          <button type="button" onClick={handleResend} className="text-yellow-400 hover:underline focus:outline-none">
            Resent
          </button>
        </div>
      </form> */}