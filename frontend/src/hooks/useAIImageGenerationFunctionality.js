import toast from 'react-hot-toast'

const useAIImageGenerationHook = () => {
    const InvokeAIImageGenerationAPIFunction = async (description, setAIImageResponseGenerated, setAIGeneratedImageUrl,setAiLoading) => {
        const chekcedInput = handleInputError(description);
        if (!chekcedInput) {
            return
        }

        setAiLoading(true)
        setAIImageResponseGenerated(true)
        toast.success("AI is processing your request...")
        try {
            const response = await fetch("/api/ai/useAIImageGeneration", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: description }),
            });

            const result = await response.json();
            
            if (result.success) {
                setAIGeneratedImageUrl(result.AIGeneratedImageUrl)
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
        InvokeAIImageGenerationAPIFunction
    }
}

function handleInputError(description) {
    if (description === '') {
        toast.error("Please enter a description of Image to generate")
        return false
    }
    return true
}

export default useAIImageGenerationHook