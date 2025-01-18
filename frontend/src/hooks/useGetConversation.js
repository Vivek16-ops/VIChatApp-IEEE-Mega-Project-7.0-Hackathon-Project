import React, { useEffect, useState } from "react"
import { toast } from 'react-hot-toast';

const useGetConversation = () => {
    const [loading, setloading] = useState(false);
    const [conversations, setconversations] = useState([]);

    useEffect(() => {
        const getConversation = async () => {
            setloading(true)
            try {
                const response = await fetch("/api/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                if (data.success) {
                    setconversations(data.usersInfo);
                }
                else {
                    toast.error(data.message);
                }
            } catch {
                toast.error(error.message)
            } finally {
                setloading(false)
            }
        }

        getConversation();
    }, [])

    return { loading, conversations }
}

export default useGetConversation