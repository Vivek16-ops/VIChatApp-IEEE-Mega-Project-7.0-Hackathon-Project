import React, { useEffect } from 'react'
import Sidebar from '../components/SidebarComponents/Sidebar'
import MessageContainer from '../components/MessageComponents/MessageContainer'
import { useAuthContext } from '../context/AuthContext'
import Chatbot from '../components/chatbotComponent/chatbot'
import useDropBoxTokenRegeneration from '../hooks/useDropBoxTokenRegeneration'
import useConversation from '../zustand/useConversation'

const Home = () => {
    const [authUser, setauthUser, isEmailVerified, setisEmailVerified] = useAuthContext()
    const { selectedConversation, setSelectedConversation } = useConversation()
    const { dropboxTokenRegnerationFunction } = useDropBoxTokenRegeneration();

    if (!authUser) {
        window.location.href = "/pages/login";
    }

    useEffect(() => {
        async function fetchDropBoxToken() {
            const token = await dropboxTokenRegnerationFunction();
        }
        fetchDropBoxToken();
    }, [])
    return (
        <>
            <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <div className={`flex ${selectedConversation ? 'hidden' : 'flex'} lg:flex lg:w-1/3`}>
                    <Sidebar />
                </div>
                <div className={`flex ${selectedConversation ? 'flex' : 'hidden'} lg:flex flex-grow`}>
                    <MessageContainer />
                </div>
            </div>
            <div className="fixed bottom-5 right-5">
                <Chatbot />
            </div>


        </>
    )
}

export default Home