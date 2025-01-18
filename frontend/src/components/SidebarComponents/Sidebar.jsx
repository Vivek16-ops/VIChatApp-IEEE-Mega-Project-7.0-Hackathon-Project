import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'
import AddFriends from './AddFriend'

const Sidebar = () => {
    return (
        <>
            <div className='flex flex-col justify-center py-6 p-4 sm:p-6 md:p-8 lg:p-10'>
                <SearchInput />
                <div className='divider px-3'></div>
                <Conversations />
                <div className='mt-auto'>
                    <AddFriends />
                    <LogoutButton />
                </div>
            </div>
        </>
    )
}

export default Sidebar
