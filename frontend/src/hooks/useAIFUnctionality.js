import toast from 'react-hot-toast'

const useAIFUnctionality = () => {

    const InvokeOpenAIFunctionality = async (message, work, setAIResponseGenerated, setAIGeneratedResults,setAiLoading) => {
        const chekcedInput = handleInputError(message, work);
        if (!chekcedInput) {
            return
        }

        setAiLoading(true)
        setAIResponseGenerated(true)
        toast.success("AI is processing your request...")
        try {
            const response = await fetch("/api/ai/useAIModel", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message, work: work }),
            });

            const result = await response.json();
            if (result.success) {
                setAIGeneratedResults(result.AIResponse)
            }
            else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setAiLoading(false)
        }
    }
    return {
        InvokeOpenAIFunctionality
    }
}

function handleInputError(message, work) {
    if (!message) {
        toast.error("Please enter a message")
        return false
    }
    if (!work) {
        toast.error("Please select a which AI fucntionality you want to use")
        return false
    }
    return true
}

export default useAIFUnctionality