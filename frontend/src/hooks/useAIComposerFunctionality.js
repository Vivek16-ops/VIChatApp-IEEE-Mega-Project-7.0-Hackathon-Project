import toast from 'react-hot-toast'

const useAIComposerHook = () => {
    const InvokeAIComposerAPIFunction = async (work, setAIResponseGenerated, setAIGeneratedResults,setAiLoading) => {
        const chekcedInput = handleInputError(work);
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
                body: JSON.stringify({ work: work }),
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
        InvokeAIComposerAPIFunction
    }
}

function handleInputError(work) {
    if (work === '') {
        toast.error("Please mention what you want to generate")
        return false
    }
    return true
}

export default useAIComposerHook