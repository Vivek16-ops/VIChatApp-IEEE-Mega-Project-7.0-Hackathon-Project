import React, { useEffect, useState } from 'react'
import useSignup from '../hooks/useSignup';
import { useAuthContext } from '../context/AuthContext';
import SignupForm from '../components/SignupComponents/SignupForm';
import EmailVerificationPage from '../components/SignupComponents/EmailVerificationPage';
import useTokenSendHook from '../hooks/useTokenSendHook';
import useTokenVerificationHook from '../hooks/useTokenVerificationHook';

const Signup = () => {
    const [formData, setformData] = useState({});
    const [emailVerificationformData, setemailVerificationformData] = useState({});
    const { loading, signup } = useSignup()
    const [istokenSend, setistokenSend] = useState(false)
    const [authUser, setauthUser, isEmailVerified, setisEmailVerified] = useAuthContext()
    const { tokenSendFunction, loading2 } = useTokenSendHook();
    const { verifyTokenFunction, loading3 } = useTokenVerificationHook();

    // Handle Change For FormData which can be used after verifcation
    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    // Handle Submit For Signup form after verification
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(formData)
    }

    // Handle Change For Email Verification form
    const handleChange2 = (e) => {
        setemailVerificationformData({ ...emailVerificationformData, [e.target.name]: e.target.value })
    }

    // Function truggered for sending token 
    const triggerTokenSendFunction = async (e) => {
        e.preventDefault();
        await tokenSendFunction(emailVerificationformData.email, setistokenSend);
    }

    //Function for verification of the email and token provided by the user
    const tirggerverifcationFunction = async (e) => {
        e.preventDefault();
        await verifyTokenFunction(emailVerificationformData.email, emailVerificationformData.token, formData, setformData)
    }

    useEffect(() => {
        if (authUser) {
            //If this is happen then redirect the user into the home page 
            window.location.href = "/pages/home"
        }
    }, [])

    return (
        <>
            <div className='flex flex-col items-center justify-center min-w-96 mx-auto p-4 sm:p-6 md:p-8 lg:p-10'>
                <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                    <h1 className='text-3xl font-semibold text-center text-gray-300'>SignUp<span className='text-green-300 px-1'>ViChatApp</span></h1>
                    {!isEmailVerified && <EmailVerificationPage handleChange={handleChange2} triggerTokenSendFunction={triggerTokenSendFunction} emailVerificationformData={emailVerificationformData} tokenSendloading={loading2} istokenSend={istokenSend} tokenVerificationLoading={loading3} triggerTokenVerifcationFunction={tirggerverifcationFunction} />}

                    {isEmailVerified && <SignupForm loading={loading} signup={signup} handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />}
                </div>
            </div>
        </>
    )
}

export default Signup
