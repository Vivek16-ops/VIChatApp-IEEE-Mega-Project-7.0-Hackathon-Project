import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import { toast } from 'react-hot-toast';

const useLogin = () => {
    const [loading, setloading] = useState(false)
    const [ authUser, setauthUser, isEmailVerified, setisEmailVerified ] = useAuthContext()

    const login = async (Credential) => {
        const { email, password } = Credential
        const success = handleInputErrors({ email, password })
        if (!success) {
            return;
        }
        setloading(true)
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, Password: password }),
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
    return { login, loading }
}

function handleInputErrors({ email, password }) {
    if (!email || !password) {
        toast.error("Please fill all the fields")
        return false
    }

    if (password.length < 6) {
        toast.error("Password should be atleast 6 characters long")
        return false
    }

    return true
}

export default useLogin