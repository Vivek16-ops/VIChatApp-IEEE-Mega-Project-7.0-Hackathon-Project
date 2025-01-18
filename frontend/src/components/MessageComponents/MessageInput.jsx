import React, { useRef, useState } from 'react'
import { BsSend, BsPaperclip, BsXCircle } from "react-icons/bs";
import { MdGeneratingTokens } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import useSendMessage from '../../hooks/useSendMessage';
import toast from 'react-hot-toast';
import useAIFUnctionality from '../../hooks/useAIFUnctionality';
import AIResponseSkeleton from '../Skeleton/AIResponseSkeleton';
import useUploadFileToCloudHook from '../../hooks/useStoreFiletoCloud';
import useAIComposerHook from '../../hooks/useAIComposerFunctionality';
import useAIImageGenerationHook from '../../hooks/useAIImageGenerationFunctionality';
import { Link } from 'react-router-dom';
const MessageInput = () => {
    const [message, setmessage] = useState("");
    const { sendMessage, loading } = useSendMessage();
    const [AIFunctionalityInitiated, setAIFunctionalityInitiated] = useState(false);
    const [AITranslateFunctionIntiated, setAITranslateFunctionInitiated] = useState(false);
    const [AIWritingStyleFunctionIntiated, setAIWritingStyleFunctionIntiated] = useState(false);
    const [AIComposerFunctionInitiated, setAIComposerFunctionInitiated] = useState(false)
    const [AIImageGenerationfunctionInitiated, setAIImageGenerationfunctionInitiated] = useState(false)
    const [AIPromptUserInput, setAIPromptUserInput] = useState("")
    const [AiLoading, setAiLoading] = useState(false)
    const [AIGeneratedImageUrl, setAIGeneratedImageUrl] = useState("")
    const [AIImageResponseGenerated, setAIImageResponseGenerated] = useState(false)
    let AIAssingedWork = useRef();
    const [AIResponseGenerated, setAIResponseGenerated] = useState(false);
    const [AIGeneratedResults, setAIGeneratedResults] = useState("")
    const {
        InvokeOpenAIFunctionality
    } = useAIFUnctionality();
    const {
        InvokeAIComposerAPIFunction
    } = useAIComposerHook();

    const {
        InvokeAIImageGenerationAPIFunction
    } = useAIImageGenerationHook();
    const {
        UploadFileToCloudAPICall, cloudUploadLoading
    } = useUploadFileToCloudHook();
    const [file, setFile] = useState(null);
    const [attachmentShareableLink, setattachmentshareableLink] = useState("")

    // Function for handle Attachment 
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const dropBoxSharableLink = await UploadFileToCloudAPICall(selectedFile);

            // Replace the dl parameter value correctly so that when user clicks on the link it directly downloads to the system
            const downloadLink = dropBoxSharableLink.replace(/\?dl=\d$/, "?dl=1");

            // Ensuring the URL ends with ?dl=1 
            const finalDownloadLink = downloadLink.endsWith("?dl=1") ? downloadLink : `${downloadLink}&dl=1`

            setattachmentshareableLink(`<a href="${finalDownloadLink}">${selectedFile.name}</a>`);
        }
    }

    // Function for remove attached file 
    const handleRemoveFile = () => { setFile(null); setattachmentshareableLink("") };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (attachmentShareableLink) {
            await sendMessage(attachmentShareableLink);
            setmessage("");
            handleRemoveFile();
            return;
        }
        if (!message) {
            toast.error("Please enter a message");
            return;
        }
        await sendMessage(message);
        setmessage("");
        setFile(null);
    }

    // Functions for other AI Functionality
    const SubmitAIWorkFunction = async () => {
        await InvokeOpenAIFunctionality(message, AIAssingedWork.current, setAIResponseGenerated, setAIGeneratedResults, setAiLoading)
    }

    // Function for AI Composer Functionality 
    const AIComposerAPIFunction = async () => {
        await InvokeAIComposerAPIFunction(AIPromptUserInput, setAIResponseGenerated, setAIGeneratedResults, setAiLoading)
        setAIPromptUserInput("")
    }

    // Function for Image Generation functionality
    const AIImageGenerationAPIFunction = async () => {
        await InvokeAIImageGenerationAPIFunction(AIPromptUserInput, setAIImageResponseGenerated, setAIGeneratedImageUrl, setAiLoading)
        setAIPromptUserInput("")
    }

    // Function to maintain the proper format of AiGenerated response
    const doAiResponseFormatting = () => {
        const formattedText = AIGeneratedResults.replace(/\\n/g, '\n').replace(/\\t/g, ' ');

        return formattedText
    }
    return (
        <>
            {/* All AI Functionality Section  */}
            <div className='flex justify-center items-center gap-2 flex-wrap md:flex-nowrap'>
                {/* AI Button */}
                <button onClick={() => { setAIFunctionalityInitiated(!AIFunctionalityInitiated); setAITranslateFunctionInitiated(false); setAIWritingStyleFunctionIntiated(false); setAIResponseGenerated(false); setAIComposerFunctionInitiated(false); setAIImageGenerationfunctionInitiated(false); setAIGeneratedImageUrl(""); setAIGeneratedResults(""); setAIImageResponseGenerated(false) }} type='submit' className='ps-6'>
                    {!loading ? (!AIFunctionalityInitiated ? <MdGeneratingTokens /> : <IoCloseSharp />) : <span className='loading loading-spinner'></span>}
                </button>

                {/* Different AI Functionality */}
                {AIFunctionalityInitiated && !AITranslateFunctionIntiated && !AIWritingStyleFunctionIntiated && !AIResponseGenerated && !AIComposerFunctionInitiated && !AIImageGenerationfunctionInitiated &&
                    <div className="bg-gray-200 bg-opacity-20 rounded-lg px-2 py-1 w-full md:w-fit text-center">
                        <button onClick={() => { AIAssingedWork.current = "Check Grammar & Spelling of provided para"; SubmitAIWorkFunction() }} className="bg-gray-700 bg-opacity-75 text-white rounded-md mx-1 my-1 px-4 py-2">Grammar & Spelling</button>
                        <button onClick={() => setAITranslateFunctionInitiated(!AITranslateFunctionIntiated)} className="bg-gray-700 bg-opacity-75 text-white rounded-md mx-1 my-1 px-4 py-2">Translate</button>
                        <button onClick={() => setAIWritingStyleFunctionIntiated(!AIWritingStyleFunctionIntiated)} className="bg-gray-700 bg-opacity-75 text-white rounded-md mx-1 my-1 px-4 py-2">Writing Style</button>
                        <button onClick={() => setAIComposerFunctionInitiated(!AIComposerFunctionInitiated)} className="bg-gray-700 bg-opacity-75 text-white rounded-md mx-1 my-1 px-4 py-2">Composer</button>
                        <button onClick={() => setAIImageGenerationfunctionInitiated(!AIImageGenerationfunctionInitiated)} className="bg-gray-700 bg-opacity-75 text-white rounded-md mx-1 my-1 px-4 py-2">Image Generation</button>
                    </div>
                }

                {/* Different Translate Function */}
                {AITranslateFunctionIntiated && !AIResponseGenerated &&
                    <div className="bg-gray-200 bg-opacity-20 rounded-lg px-2 py-1 w-full md:w-fit text-center">
                        <button onClick={() => { AIAssingedWork.current = "Translate the given para into english language"; SubmitAIWorkFunction() }} className="bg-gray-700 bg-opacity-75 text-white rounded-md mx-1 my-1 px-4 py-2">English</button>
                        <button onClick={() => { AIAssingedWork.current = "Translate the given para into hindi language"; SubmitAIWorkFunction() }} className="bg-gray-700 bg-opacity-75 text-white rounded-md mx-1 my-1 px-4 py-2">Hindi</button>
                        <button onClick={() => { AIAssingedWork.current = "Trasnlate the given para into french language"; SubmitAIWorkFunction() }} className="bg-gray-700 bg-opacity-75 text-white rounded-md mx-1 my-1 px-4 py-2">French</button>
                    </div>
                }

                {/* Different Writing Style Function */}
                {AIWritingStyleFunctionIntiated && !AIResponseGenerated &&
                    <div className="bg-gray-200 bg-opacity-20 rounded-lg px-2 py-1 w-full md:w-fit text-center">
                        <button onClick={() => { AIAssingedWork.current = "Write the given para in social style for posting"; SubmitAIWorkFunction() }} className="bg-gray-700 bg-opacity-75 text-white rounded-md mx-1 my-1 px-4 py-2">Social</button>
                        <button onClick={() => { AIAssingedWork.current = "Write the given para in professional style"; SubmitAIWorkFunction() }} className="bg-gray-700 bg-opacity-75 text-white rounded-md mx-1 my-1 px-4 py-2">Professional</button>
                        <button onClick={() => { AIAssingedWork.current = "Write the given para in emotional style"; SubmitAIWorkFunction() }} className="bg-gray-700 bg-opacity-75 text-white rounded-md mx-1 my-1 px-4 py-2">Emotional</button>
                        <button onClick={() => { AIAssingedWork.current = "Rewrite the given para in presentable form"; SubmitAIWorkFunction() }} className="bg-gray-700 bg-opacity-75 text-white rounded-md mx-1 my-1 px-4 py-2">Normal</button>
                    </div>
                }

                {/* Taking Composer user Input Section */}
                {AIComposerFunctionInitiated && !AIResponseGenerated && <div className="bg-gray-200 bg-opacity-20 rounded-lg px-4 py-3 w-full md:w-1/2">
                    <textarea value={AIPromptUserInput} onChange={(e) => setAIPromptUserInput(e.target.value)} placeholder='what do you want?' className="w-full h-32 p-2 bg-transparent text-white border rounded-md mb-3 placeholder-white text-center"></textarea>
                    <div className="flex justify-center">
                        <button onClick={() => AIComposerAPIFunction()} className="bg-green-500 text-white rounded-md px-4 py-2 mx-1 my-1">Submit</button>
                    </div>
                </div>
                }

                {/* Taking Image Generation user Input Section */}
                {AIImageGenerationfunctionInitiated && !AIImageResponseGenerated && <div className="bg-gray-200 bg-opacity-20 rounded-lg px-4 py-3 w-full md:w-1/2">
                    <textarea value={AIPromptUserInput} onChange={(e) => setAIPromptUserInput(e.target.value)} placeholder='For getting better quality image provide the description of the Image' className="w-full h-32 p-2 bg-transparent text-white border rounded-md mb-3 placeholder-white text-center"></textarea>
                    <div className="flex justify-center">
                        <button onClick={() => AIImageGenerationAPIFunction()} className="bg-green-500 text-white rounded-md px-4 py-2 mx-1 my-1">Generate</button>
                    </div>
                </div>
                }

                {/* AI Response display section */}
                {AIResponseGenerated && <div className="bg-gray-200 bg-opacity-20 rounded-lg px-2 py-1 max-w-md overflow-y-auto h-20">
                    {AiLoading && <AIResponseSkeleton />}
                    {!AiLoading && <p className="text-white">
                        {doAiResponseFormatting()}
                    </p>}
                    {!AiLoading && <div className='flex justify-end items-center w-full'>
                        <button onClick={() => setmessage(doAiResponseFormatting())} className='text-green-500 font-bold transition-smooth animate-zoom mx-1 my-1'>Use Response</button>
                    </div>}
                </div>}

                {/* AI Image Response display section */}
                {AIImageResponseGenerated && (
                    <div className="bg-gray-200 bg-opacity-20 rounded-lg px-2 py-1 max-w-md">
                        {AiLoading && <AIResponseSkeleton />}
                        {!AiLoading && <img
                            src={AIGeneratedImageUrl}
                            alt='Generated Image'
                            className="w-full cursor-pointer"
                        />}
                        {!AiLoading && <div className="flex justify-center mt-2">
                            <Link to={AIGeneratedImageUrl} target='_blank'>
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 mx-1 my-1"
                                >
                                    Open Image to Download
                                </button></Link>
                        </div>}
                    </div>
                )}
            </div>

            {/* Message Input Box */}
            <form className="px-4 my-3" onSubmit={handleSubmit}>
                <div className="w-full relative">
                    {file && (<div className="relative flex items-center mb-2"> <span className="mr-2">{file.name}</span>
                        <button type="button" onClick={handleRemoveFile} className="text-red-600 hover:text-red-800" > <BsXCircle size={20} /> </button>
                    </div>
                    )}
                    <div className="relative flex items-center">
                        <label htmlFor="file-upload" className="absolute inset-y-0 start-0 flex items-center ps-3 cursor-pointer" > <BsPaperclip color={file ? 'gray' : 'currentColor'} /> <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={!!file} />
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setmessage(e.target.value)}
                            value={message}
                            disabled={!!file}
                            className="border text-sm rounded-lg block w-full pl-10 p-2.5 bg-gray-700 border-gray-600 text-white"
                            placeholder={file ? 'First send or remove attachment to write message' : 'Type a message'} />
                        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3" > {!loading ? <BsSend size={20} /> :
                            <span className="loading loading-spinner"></span>}
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default MessageInput
