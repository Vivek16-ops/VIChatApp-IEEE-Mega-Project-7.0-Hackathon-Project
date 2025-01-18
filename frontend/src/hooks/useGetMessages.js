import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast'

const useGetMessages = () => {
    const [loading, setloading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setloading(true);
            try {
                const response = await fetch(`/api/messages/${selectedConversation._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                if (data.success) {
                    setMessages(data.messages);
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setloading(false)
            }
        }

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages])

    return { messages, loading }
}

export default useGetMessages
