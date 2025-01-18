import React, { useState, useEffect, useRef } from 'react';
import { BsPaperclip, BsSend, BsX, BsChatDots } from 'react-icons/bs';
import toast from 'react-hot-toast'
import useUploadFileToCloudHook from '../../hooks/useStoreFiletoCloud';
import useChatBOTAPIHook from '../../hooks/ChatbotAPICall';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWelcomeMessageExecuted, setIsWelcomeMessageExecuted] = useState(false)
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [APIResponseLoading, setAPIResponseLoading] = useState(true);
  const [attachedFile, setAttachedFile] = useState(null);
  const [attachmentShareableLink, setattachmentshareableLink] = useState("")
  const [filetype, setfiletype] = useState("")
  const [suggestionQuestions, setSuggestionQuestions] = useState([
    "What is this document about?",
    "Can you summarize this document?",
    "Are there any key points in this document?",
    "Can you provide an analysis of this document?"]);

  const { InvokeChatBOTAPIFunction } = useChatBOTAPIHook()
  const fileInputRef = useRef(null);
  const endOfMessagesRef = useRef(null);

  const {
    UploadFileToCloudAPICall, cloudUploadLoading
  } = useUploadFileToCloudHook();

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = { text: inputMessage, sender: 'user' };
      setMessages([...messages, newMessage]);
      const prompt = inputMessage
      setInputMessage('');
      await InvokeChatBOTAPIFunction(prompt, filetype, attachmentShareableLink, setAPIResponseLoading, setMessages);
    }
  };

  // Loading effect functionality 
  const LoadingDots = ({ background }) => (
    <div className={`flex items-center justify-center ${background} rounded-full p-2`} style={{ height: '32px' }}>
      <div className="dot bg-black w-2 h-2 rounded-full mx-1 animate-bounce-delay1"></div>
      <div className="dot bg-black w-2 h-2 rounded-full mx-1 animate-bounce-delay2"></div>
      <div className="dot bg-black w-2 h-2 rounded-full mx-1 animate-bounce-delay3"></div>
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce-delay1 {
          animation: bounce 1s infinite;
        }
        .animate-bounce-delay2 {
          animation: bounce 1s infinite 0.2s;
        }
        .animate-bounce-delay3 {
          animation: bounce 1s infinite 0.4s;
        }
      `}</style>
    </div>
  );

  // Showing Welcome Message functionality
  const showWelcomeMessage = () => {
    setIsWelcomeMessageExecuted(true)
    setTimeout(() => {
      setAPIResponseLoading(false);
    }, 2000);
    setTimeout(() => {
      setMessages([
        { text: 'Welcome to ViChat BOT, your personalized AI assistant. With ViChat, you can ask any question, analyze documents, and receive precise answers or comprehensive summaries tailored to your needs.', sender: 'api' }
      ]);
    }, 2000);
  };

  // Function to validate file extension 
  const getFileExtensionChecked = async (givenFile) => {
    const fileName = givenFile.name;
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (['pdf', 'txt', 'csv'].includes(extension)) {
      setfiletype(extension)
      return true;
    } else {
      const newMessage = {
        sender: 'api',
        text: 'Apologies for the inconvenience, but as my capabilities are still evolving, I currently do not support this file format. Please try using .pdf, .txt, or .csv files.',
      };
      setTimeout(() => {
        setAPIResponseLoading(false);
      }, 2000);
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }, 2000);
      return false;
    }
  }

  // Uploading file function 
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setAPIResponseLoading(true)
    if (await getFileExtensionChecked(file)) {
      setAttachedFile(file);
      setAPIResponseLoading(true)
      const dropBoxSharableLink = await UploadFileToCloudAPICall(file);
      const downloadLink = dropBoxSharableLink.replace(/\?dl=\d$/, "?dl=1");
      const finalDownloadLink = downloadLink.endsWith("?dl=1") ? downloadLink : `${downloadLink}&dl=1`
      setattachmentshareableLink(finalDownloadLink)
      if (!cloudUploadLoading) {
        const newMessage = {
          sender: 'api',
          text: 'Your document has been successfully uploaded. You can now interact with its contents. Should you wish to revert to standard interactions, please detach the document',
        };
        setTimeout(() => {
          setAPIResponseLoading(false);
        }, 2000);
        setTimeout(() => {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }, 2000);

        // if csv file detected then displaying special message
        if (file.name.includes('.csv')) {
          const newMessage2 = {
            sender: 'api',
            text: 'Received file is in CSV format. Please specify the appropriate row and column details. For example, provide a list of all names from the column titled "Name."',
          };
          setTimeout(() => {
            setAPIResponseLoading(true);
          }, 2100);
          setAPIResponseLoading(true);
          setTimeout(() => {
            setAPIResponseLoading(false);
          }, 3000);
          setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, newMessage2]);
          }, 3000);
        }
      }
    }
  };

  // Function to ensure only one file is attached at a time
  const handleAttachmentClick = (event) => {
    if (attachedFile) {
      event.preventDefault();
      toast.error("Remove the currently attached document to attach a new one.");
    } else {

    }
  };

  // Detaching file functionality
  const handleFileDetach = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setAPIResponseLoading(true)
    const newMessage = {
      sender: 'api',
      text: 'Your document has been successfully detached. Standard interactions are now enabled.',
    };
    setTimeout(() => {
      setAPIResponseLoading(false);
    }, 2000);
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }, 2000);
  };

  // Suggestion questions functionality
  const handleQuestionClick = async (question) => {
    const newMessage = { text: question, sender: 'user' };
    setMessages([...messages, newMessage]);
    await InvokeChatBOTAPIFunction(question, filetype, attachmentShareableLink, setAPIResponseLoading, setMessages);
  };

  useEffect(() => { if (isOpen && !isWelcomeMessageExecuted) { showWelcomeMessage(); } }, [isOpen]);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, APIResponseLoading]);

  return (
    <div>
      {!isOpen && (
        <button
          className="fixed bottom-5 right-5 bg-white text-black py-2 px-4 rounded-full shadow-lg md:bottom-8 md:right-8"
          onClick={toggleChatbot}
        >
          <BsChatDots size={20} />
        </button>
      )}
      {isOpen && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-5 sm:translate-x-0 md:bottom-5 md:right-5 md:translate-x-0 w-full sm:w-10/12 md:w-2/3 lg:w-1/3 xl:w-1/4 h-[42rem] max-h-[90vh] bg-white bg-opacity-60 backdrop-blur-md border border-gray-300 rounded-lg shadow-lg flex flex-col justify-between mx-2 sm:mx-4">

          {/* Chatbot Navigation Bar */}
          <div className="bg-[#4635B1] p-2 flex items-center">
            <button onClick={toggleChatbot} className="text-white">
              <BsX size={20} />
            </button>
            <div className="ml-2 flex items-center">
              <img
                src="/bot.png"
                alt="Logo"
                className="w-8 h-8 rounded-full flex-shrink-0"
                style={{ height: '32px', width: '32px' }}
              />
              <div className="ml-2 text-white font-bold">ViChat BOT</div>
            </div>
          </div>

          {/* Message Container */}
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
              >
                {msg.sender === 'user' ? (
                  <>
                    <div
                      className={`p-2 mr-2 rounded-lg bg-[#AEEA94] text-black`}
                    >
                      {msg.text}
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500">
                      <img
                        src="/user.png"
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FFFBCA] text-black"
                      style={{ minHeight: '40px', minWidth: '40px' }}>
                      <span>VC</span>
                    </div>
                    <div
                      className={`p-2 ml-2 rounded-lg bg-[#FFFBCA] text-black`}
                    >
                      {msg.text}
                    </div>
                  </>
                )}
              </div>
            ))}
            {APIResponseLoading && (
              <div className="flex mb-4 justify-start items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FFFBCA] text-black mr-2"
                  style={{ minHeight: '40px', minWidth: '40px' }}>
                  <span>VC</span>
                </div>
                <LoadingDots background="bg-[#FFFBCA]" />
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          {/* Container for Question Suggestions and Display Attached File Information */}
          <div className="flex flex-col">

            {/* Question Suggestion Section */}
            {attachedFile && !cloudUploadLoading && (
              <div className="py-2 px-1 sticky bottom-0 flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-transparent custom-scrollbar">
                {suggestionQuestions.map((question, index) => (
                  <div key={index} className="flex-shrink-0">
                    <button
                      onClick={() => handleQuestionClick(question)}
                      className="whitespace-nowrap px-4 py-2 bg-[#AEEA94] text-black rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
                    >
                      {question}
                    </button>
                  </div>
                ))}
                <style jsx>
                  {`.custom-scrollbar {
                            margin-right: 10px;
                            margin-left: 10px; 
                            padding-bottom: 10px;
                        }

                        .custom-scrollbar::-webkit-scrollbar {
                            height: 5px; 
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: #AEEA94; 
                        } 
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: transparent; 
                        }`}
                </style>
              </div>
            )}

            {/* Display Attached File Information Section */}
            {attachedFile && !cloudUploadLoading && (
              <div className="p-2 m-2 bg-gray-300 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src="/docs.png"
                    alt="Document"
                    className="w-8 h-8 mr-2"
                  />
                  <span className="text-gray-700">{attachedFile.name}</span>
                </div>
                <button onClick={handleFileDetach} className="text-red-500">
                  <BsX size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className='p-2'>
            <form className="w-full relative" onSubmit={handleSendMessage}>
              <div className="relative flex items-center">
                <label htmlFor="file-upload2" className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer" onClick={handleAttachmentClick} > <BsPaperclip />
                  <input
                    id="file-upload2"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={fileInputRef} />
                </label>
                <input
                  type="text"
                  className="border text-sm rounded-lg block w-full pl-10 p-2.5 bg-gray-700 border-gray-600 text-white"
                  placeholder={APIResponseLoading ? "Wait Response Fetching" : "Type a message"}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={APIResponseLoading}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <BsSend size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
