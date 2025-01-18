import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useTokenVerificationHook = () => {
  const [loading3, setloading3] = useState(false)
  const [authUser, setauthUser, isEmailVerified, setisEmailVerified] = useAuthContext()

  const verifyTokenFunction = async (email, token, formData, setformData) => {
    setloading3(true)
    try {
      const response = await fetch("/api/auth/verifyemail", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token }),
      });

      const result = await response.json();
      if (result.success) {
        setisEmailVerified(true)
        setformData({ ...formData, email: email })
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setloading3(false)
    }
  }
  return { verifyTokenFunction, loading3 }
}

export default useTokenVerificationHook