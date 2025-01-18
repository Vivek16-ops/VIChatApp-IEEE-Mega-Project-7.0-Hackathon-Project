import toast from 'react-hot-toast'

const useChatBOTAPIHook = () => {
    const InvokeChatBOTAPIFunction = async (prompt, filetype, attachmentShareableLink, setAPIResponseLoading, setMessages) => {
        const chekcedInput = handleInputError(prompt);
        if (!chekcedInput) {
            return
        }

        setAPIResponseLoading(true)
        try {
            if (attachmentShareableLink) {
                // If this true the chat with pdf enables
                console.log("Yaha chat with file me control aaya")
                const response = await fetch("https://vichat-backend.onrender.com/chat", {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        question: prompt,
                        file_type: filetype,
                        file_url_or_path: attachmentShareableLink
                    }),
                });

                const result = await response.json();

                if (result.answer) {
                    const apiMessage = { text: result.answer, sender: 'api' };
                    setMessages(prevMessages => [...prevMessages, apiMessage]);
                } else if (!result.answer) {
                    const apiMessage = { text: "The uploaded file does not contain the information needed to address your query. Please consider asking a different question or reverting to the general conversation by detaching the file.", sender: 'api' };
                    setMessages(prevMessages => [...prevMessages, apiMessage]);
                } else {
                    const apiMessage = { text: "We apologize for the inconvenience, but a technical issue has occurred. Please visit again later as we are actively working to resolve it.", sender: 'api' };
                    setMessages(prevMessages => [...prevMessages, apiMessage]);
                }
            } else {
                // If this happen then standard interaction enabled
                const response = await fetch("https://vichat-backend.onrender.com/chatbot", {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question: prompt }),
                });

                const result = await response.json();
                console.log("API response: ", result.answer)
                if (result.answer) {
                    const apiMessage = { text: result.answer, sender: 'api' };
                    setMessages(prevMessages => [...prevMessages, apiMessage]);
                } else if (!result.answer) {
                    const apiMessage = { text: "We apologize, but we were unable to find the answer to your query at this time. Kindly allow us some time to further investigate.", sender: 'api' };
                    setMessages(prevMessages => [...prevMessages, apiMessage]);
                } else {
                    const apiMessage = { text: "We apologize for the inconvenience, but a technical issue has occurred. Please visit again later as we are actively working to resolve it.", sender: 'api' };
                    setMessages(prevMessages => [...prevMessages, apiMessage]);
                }
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setAPIResponseLoading(false)
        }
    }
    return {
        InvokeChatBOTAPIFunction
    }
}

function handleInputError(prompt) {
    if (prompt === '') {
        toast.error("Please enter the prompt before send request to our VICChat BOT")
        return false
    }
    return true
}

export default useChatBOTAPIHook