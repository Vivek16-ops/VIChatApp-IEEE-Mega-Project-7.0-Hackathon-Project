import React, { useState } from 'react'
import toast from 'react-hot-toast'

const useResetPassword = () => {
    const [loading, setloading] = useState(false)

    const resetPasswordFunction = async (email, password, confirmPassword) => {
        if (!handleInputErrors({ email, password, confirmPassword })) {
            return;
        }
        setloading(true)
        try {
            const response = await fetch("/api/auth/resetpassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            console.log(result)
            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setloading(false)
        }
    }

    return { resetPasswordFunction, loading }
}

function handleInputErrors({ email, password, confirmPassword }) {
    if (!email || !password || !confirmPassword) {
        toast.error("Please fill all the fields")
        return false
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        return false
    }
    if (password.length < 6) {
        toast.error("Password should be atleast 6 characters long")
        return false
    }
    return true
}

export default useResetPassword