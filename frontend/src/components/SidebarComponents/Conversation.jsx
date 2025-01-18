import React from 'react'
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({ conversation, emoji, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const isSelected = selectedConversation?._id === conversation._id;
  return (
    <>
      <div className={`flex items-center gap-2 hover:bg-[#B771E5] rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-[#AEEA94]" : ""}`} onClick={() => setSelectedConversation(conversation)}>
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt='Image' />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className={`font-bold  ${isSelected ? "text-black" : "text-white"}`}>{conversation.userName}</p>
            <span text-xl>{emoji}</span>
          </div>
        </div>
      </div>

      {/* Divider Line  */}
      {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>
  )
}

export default Conversation
