import useConversation from "../zustand/useConversation";
import { useState } from "react";
import { toast } from 'react-hot-toast';

const useSendMessage = () => {

    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                setMessages([...messages, data.newMessage]);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { sendMessage, loading }
}

export default useSendMessage