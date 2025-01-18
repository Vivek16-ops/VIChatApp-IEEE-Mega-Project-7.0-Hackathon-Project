import React from 'react'
import { RiLogoutBoxLine } from "react-icons/ri";
import useLogout from '../../hooks/useLogout'

// To-do:Logout button is not working on clicking please check
const LogoutButton = () => {
    const { loading, logout } = useLogout();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await logout()
    }
    return (
        <>
            <div className='px-2'>
                {!loading ? (<RiLogoutBoxLine className='w-6 h-6 text-white cursor-pointer' onClick={handleSubmit} />) : (<span className='loading loading-spinner'></span>)}
            </div>
        </>
    )
}

export default LogoutButton
