import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import NoChatSelected from './NoChatSelected'
import useConversation from '../../zustand/useConversation'

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  return (
    <div className='md:min-w-[700px] flex flex-col'> {!selectedConversation ? (<NoChatSelected />) : (<> <div className='bg-[#4635B1] px-4 py-2 mb-2'> <button onClick={() => setSelectedConversation(null)} className='text-black p-2 sm:inline-block md:hidden'> Back </button> <span className='label-text text-grey-300'>To: </span> <span className='text-white font-bold'>{selectedConversation.fullName}</span> </div> <Messages /> <MessageInput /> </>)} </div>
  )
}

export default MessageContainer
