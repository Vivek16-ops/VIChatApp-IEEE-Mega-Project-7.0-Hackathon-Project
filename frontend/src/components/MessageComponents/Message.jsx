import React from 'react'
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';
import useListenMessage from '../../hooks/useListenMessage';
import parse from "html-react-parser";

const Message = ({ message }) => {
    const [authUser, setauthUser] = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderID === authUser.id;
    const chatClassName = fromMe ? "chat chat-end" : "chat chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-[#AEEA94]" : "";
    const textColor = fromMe ? "black" : "white";
    const formatTime = extractTime(message.createdAt);
    const shakeClass = message.shouldShake ? "shake" : "";


    // Socket io functinality for real time messaging 
    useListenMessage();

    // Function that renders the message when anchor tag is encountered 
    const renderMessageContent = (text) => {
        return parse(text, {
            replace: (node) => {
                if (node.name === "a" && node.attribs?.href) {
                    return (
                        <div
                            key={node.attribs.href}
                            className="flex items-center justify-between p-3 bg-gray-100 border border-gray-300 rounded-md"
                        >
                            <span className="font-medium text-gray-800 truncate">
                                {node.children[0]?.data}
                            </span>
                            <a
                                href={node.attribs.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 px-2 hover:underline"
                            >
                                Open
                            </a>
                        </div>
                    );
                }
            },
        });
    };

    return (
        <>
            <div className={`${chatClassName}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component" src={profilePic} />
                    </div>
                </div>
                <div className="chat-header">
                    <span className='text-white'>{fromMe ? authUser.fullName : selectedConversation?.fullName}</span>
                    <time className="text-xs opacity-50 text-white"> {formatTime}</time>
                </div>
                <div className={`chat-bubble text-${textColor} ${bubbleBgColor} ${shakeClass}`}>{renderMessageContent(message.message)}</div>
                <div className="chat-footer opacity-50 text-white">
                    {fromMe ? "Sent" : ""}
                </div>
            </div>
        </>
    )
}

export default Message
