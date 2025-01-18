import { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
    const [loading, setloading] = useState(false);
    const [ authUser, setauthUser, isEmailVerified, setisEmailVerified ] = useAuthContext()

    const logout = async () => {
        setloading(true);
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                localStorage.removeItem("chat-user");
                setauthUser(null);
                window.location.href = "/pages/Login";
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setloading(false)
        }
    }
    return { logout, loading }
}

export default useLogout