import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../Skeleton/MessageSkeleton'

const Messages = () => {
    const { messages, loading } = useGetMessages()
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }, [messages])

    return (
        <div className='px-4 flex-1 overflow-auto h-full sm:h-[calc(100vh-100px)] md:h-auto max-h-[70vh] sm:max-h-[50vh]'>
            {!loading && messages.length > 0 && messages.map((message) => {
                return <div key={message._id} ref={lastMessageRef}>
                    <Message message={message} />
                </div>
            })}

            {/* Showing empty message template while loading */}
            {loading && [...Array(10)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {!loading && messages.length === 0 && (
                <p className='text-center text-gray-300'>Send a message to start the conversation</p>
            )}
        </div>
    )
}

export default Messages