import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import useLogin from '../hooks/useLogin'

const Login = () => {
    const [authUser, setauthUser, isEmailVerified, setisEmailVerified] = useAuthContext()
    const [email, setemail] = useState("")
    const [password, setPassword] = useState("")
    const { login, loading } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login({ email, password })
    }

    useEffect(() => {
        if (authUser) {
            //If this is happen then redirect the user into the home page 
            window.location.href = "/pages/home"
        }
    }, [])

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto p-4 sm:p-6 md:p-8 lg:p-10'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-white'>Login
                    <span className='text-green-300 px-0.5'>ViChat</span>
                </h1>

                <form onSubmit={handleSubmit} className='space-y-4'>

                    {/* Email Input Box */}
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-gray-300'>Email</span>
                        </label>
                        <input type="email" onChange={(e) => setemail(e.target.value)} value={email ? email : ""} placeholder="Enter email" className="input input-bordered w-full max-w-xs h-10" />
                    </div>

                    {/* Password Input Box */}
                    <div>
                        <div className='flex justify-between'>
                            <label className='label p-2'>
                                <span className='text-base label-text text-gray-300'>Password</span>
                            </label>
                            <Link to="/pages/Forgotpsw"><label className='label py-2 pl-1 pr-[23px] hover:cursor-pointer hover:font-semibold'>
                                <span className='text-base label-text text-gray-300'>Forgot Password</span>
                            </label></Link>
                        </div>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password ? password : ""} placeholder="Enter password" className="input input-bordered w-full max-w-xs h-10" />
                    </div>

                    <Link to="/pages/signup" className='text-sm text-gray-300 inline-block px-2 mt-2 hover:underline hover:text-green-500'>{"Don't"} have an account?</Link>

                    {/* Login Button  */}
                    <div className='h-5 flex w-full items-center justify-center mt-2'>
                        <button type="submit" className="focus:outline-none text-white bg-outline bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5" disabled={loading}>{loading ? <span className='loading loading-spinner'></span> : "Login"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
