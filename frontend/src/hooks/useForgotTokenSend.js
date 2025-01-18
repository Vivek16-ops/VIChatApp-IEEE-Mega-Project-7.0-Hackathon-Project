import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useForgotTokenSend = () => {
    const [sendingForgotTokenLoading, setsendingForgotTokenLoading] = useState(false)

    const forgotTokenSend = async (email, setistokenSend) => {
        setsendingForgotTokenLoading(true);
        try {
            const response = await fetch("/api/auth/sendForgotToken", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();
            if (result.success) {
                setistokenSend(true)
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Something went wrong while sending token! Please try again after some time")
        } finally {
            setsendingForgotTokenLoading(false)
        }
    }

    const [verifyingForgotTokenLoading, setverifyingForgotTokenLoading] = useState(false)
    const verifyingForgotTokenfunction = async (email, token, setisEmailVerified) => {
        setverifyingForgotTokenLoading(true)
        try {
            const response = await fetch("/api/auth/verficationforgotToken", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, token }),
            });

            const result = await response.json();
            if (result.success) {
                setisEmailVerified(true)
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Something went wrong while verifying token! Please try again after some time")
        } finally {
            setverifyingForgotTokenLoading(false)
        }

    }

    return { forgotTokenSend, sendingForgotTokenLoading, verifyingForgotTokenfunction, verifyingForgotTokenLoading }
}

export default useForgotTokenSend
