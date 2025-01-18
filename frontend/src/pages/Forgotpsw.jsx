import React, { useState } from 'react'
import useForgotTokenSend from '../hooks/useForgotTokenSend'
import Forgotpswemailverificationsection from '../components/ForgotPasswordSection/Forgotpswemailverificationsection'
import PasswordTakingsection from '../components/ForgotPasswordSection/PasswordTakingsection'

const Forgotpsw = () => {
    const [email, setemail] = useState("")
    const [token, settoken] = useState("")
    const [istokenSend, setistokenSend] = useState(false)
    const [isEmailVerified, setisEmailVerified] = useState(false)
    const { forgotTokenSend, sendingForgotTokenLoading, verifyingForgotTokenfunction, verifyingForgotTokenLoading } = useForgotTokenSend()

    const sendTokenFunction = async (e) => {
        e.preventDefault()
        await forgotTokenSend(email, setistokenSend);
    }

    const forgottokenverificationfunction = async (e) => {
        e.preventDefault();
        await verifyingForgotTokenfunction(email, token, setisEmailVerified);
    }
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto p-4 sm:p-6 md:p-8 lg:p-10'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-white'>Reset
                    <span className='text-green-300 px-0.5'> Password</span>
                </h1>
                {!isEmailVerified && <Forgotpswemailverificationsection email={email} setemail={setemail} token={token} settoken={settoken} sendTokenFunction={sendTokenFunction} loading={sendingForgotTokenLoading} istokenSend={istokenSend} forgottokenverificationfunction={forgottokenverificationfunction} verifyingForgotTokenLoading={verifyingForgotTokenLoading} />}
                {isEmailVerified && <PasswordTakingsection email={email} />}
            </div>
        </div>
    )
}

export default Forgotpsw
