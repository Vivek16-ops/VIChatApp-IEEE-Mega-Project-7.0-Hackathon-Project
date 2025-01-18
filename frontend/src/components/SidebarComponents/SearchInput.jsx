import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useConversation from '../../zustand/useConversation';
import { toast } from 'react-hot-toast';
import useGetConversation from '../../hooks/useGetConversation';

const SearchInput = () => {
    const [search, setSearch] = useState("")
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversation();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!search) {
            toast.error("Please enter a search query")
            return
        }
        if (search.length < 3) {
            toast.error("Please enter at least 3 characters")
            return
        }

        const conversation = conversations.filter((conversation) => {
            return conversation.userName.toLowerCase().includes(search.toLowerCase())
        })
        if (conversation.length > 0) {
            console.log(conversation)
            setSelectedConversation(conversation[0])
            setSearch("")
            return
        }
        toast.error("No conversation found! Please try again")
        setSearch("")
    }
    return (
        <>
            <form className='flex items-center gap-2 px-1' onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setSearch(e.target.value)} value={search ? search : ""} placeholder='Search' className='input input-bordered rounded-full' />
                <button type='submit' className='btn btn-circle bg-[#FFFBCA] text-black'>
                    <FaSearch />
                </button>
            </form>
        </>
    )
}

export default SearchInput
