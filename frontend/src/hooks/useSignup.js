import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setloading] = useState(false)
    const [ authUser, setauthUser, isEmailVerified, setisEmailVerified ] = useAuthContext()

    const signup = async (credentials) => {
        const { fullName, userName, Password, confirmPassword, Gender, email } = credentials
        const success = handleInputErrors({ fullName, userName, Password, confirmPassword, Gender })
        if (!success) {
            return;
        }
        setloading(true)
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fullName, userName, Password, confirmPassword, Gender, email }),
            });

            const data = await response.json();
            if (data.success) {
                toast.success(data.message)
                localStorage.setItem("chat-user", JSON.stringify(data))
                setauthUser(data)
                window.location.href = "/pages/home"
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setloading(false)
        }
    }

    return { signup, loading }
};

export default useSignup

function handleInputErrors({ fullName, userName, Password, confirmPassword, Gender }) {
    if (!fullName || !userName || !Password || !confirmPassword || !Gender) {
        toast.error("Please fill all the fields")
        return false
    }

    if (Password !== confirmPassword) {
        toast.error("Passwords do not match")
        return false
    }

    if (Password.length < 6) {
        toast.error("Password should be atleast 6 characters long")
        return false
    }
    return true
}