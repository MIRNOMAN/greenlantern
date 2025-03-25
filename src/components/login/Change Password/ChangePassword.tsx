"use client"

import type React from "react"

import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"


export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")

//   const dispatch = useDispatch()
//   const { loading, error, success } = useSelector((state: RootState) => state.auth)

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const validatePassword = (password: string) => {
    // Password validation rules
    const hasMinLength = password.length >= 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (!hasMinLength) {
      return "Password must be at least 8 characters long"
    }

    if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
      return "Password must include uppercase, lowercase, number, and special character"
    }

    return ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate password
    const validationError = validatePassword(newPassword)
    if (validationError) {
      setPasswordError(validationError)
      return
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match")
  return
  }

  // setPasswordError("")
  // dispatch(resetPassword(newPassword))
}

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-semibold mb-2">Change New Password!</h1>
        <p className="text-muted-foreground text-xl">Enter a different password with the previous!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="new-password" className="block text-sm">
            New Password
          </label>
          <div className="relative">
            <input
              id="new-password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 pr-10 border border-[#ECECEC] rounded"
              placeholder="Aslijk237hjh%^****"
              required
            />
            <button
              type="button"
              onClick={toggleNewPasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
            >
              {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirm-password" className="block text-sm">
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 pr-10 border border-[#ECECEC] rounded"
              placeholder="Aslijk237hjh%^****"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
        {/* {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">Password reset successfully!</p>} */}

        <Link href="/login">
          <button
            type="submit"
            // disabled={loading || !newPassword || !confirmPassword}
            className="w-full bg-yellow-300 hover:bg-yellow-400 py-3 mt-3 rounded-3xl font-medium transition-colors disabled:opacity-70"
          >
            {/* {loading ? "Resetting..." : "Reset Password"} */}Reset Password
          </button>
        </Link>
      </form>
    </div>
    </div>
  )
}

