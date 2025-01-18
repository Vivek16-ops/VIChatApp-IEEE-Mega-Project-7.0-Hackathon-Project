import React, { useState } from 'react'
import useResetPassword from '../../hooks/useResetPassword'

const PasswordTakingsection = ({ email }) => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { resetPasswordFunction, loading } = useResetPassword()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await resetPasswordFunction(email, password, confirmPassword)
  }
  return (
    <form onSubmit={handleSubmit}>

      {/* Password Input Box */}
      <div>
        <label className='label p-2'>
          <span className='text-base label-text text-gray-300'>Enter new password</span>
        </label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password ? password : ""} placeholder="Enter Password" className="input input-bordered w-full max-w-xs h-10" />
      </div>

      {/* Confirm Password Input Box */}
      <div>
        <label className='label p-2'>
          <span className='text-base label-text text-gray-300'>Confirm Password</span>
        </label>
        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword ? confirmPassword : ""} placeholder="Confirm Password" className="input input-bordered w-full max-w-xs h-10" />
      </div>

      {/* Change Button  */}
      <div className='h-5 flex w-full items-center justify-center mt-2'>
        <button type="submit" className="focus:outline-none text-white bg-outline bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5" disabled={loading}>{loading ? <span className='loading loading-spinner'></span> : "Change"}</button>
      </div>
    </form>
  )
}

export default PasswordTakingsection
