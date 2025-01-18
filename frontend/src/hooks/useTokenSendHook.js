import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

const useTokenSendHook = () => {
    const [loading2, setloading2] = useState(false)

    const tokenSendFunction = async (email, setistokenSend) => {
        setloading2(true)
        const correct = handleInputErrors(email);
        if (!correct) {
            return;
        }
        try {
            const response = await fetch("/api/auth/tokenSend", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            });

            const result = await response.json();

            if (result.success) {
                setistokenSend(true)
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setloading2(false)
        }
    }

    return { tokenSendFunction, loading2 }
}

function handleInputErrors(email) {
    if (!email) {
        toast.error("Please provide email")
        return false
    }
    return true
}

export default useTokenSendHook