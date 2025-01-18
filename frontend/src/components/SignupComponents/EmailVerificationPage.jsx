import React from 'react'
import { Link } from 'react-router-dom'

const EmailVerificationPage = ({ handleChange, triggerTokenSendFunction, emailVerificationformData, tokenSendloading, istokenSend, tokenVerificationLoading, triggerTokenVerifcationFunction }) => {
    return (
        <form onSubmit={!istokenSend ? triggerTokenSendFunction : triggerTokenVerifcationFunction}>
            {/* email Input Box */}
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text text-gray-300'>Email</span>
                </label>
                <input type="email" name='email' onChange={handleChange} value={emailVerificationformData.email ? emailVerificationformData.email : ""} placeholder="Enter your email" className="input input-bordered w-full max-w-xs h-10" />
            </div>

            {/* Token Input Box */}
            {istokenSend && <div>
                <label className='label p-2'>
                    <span className='text-base label-text text-gray-300'>Token(Check Your Mail)</span>
                </label>
                <input type="text" name='token' onChange={handleChange} value={emailVerificationformData.token ? emailVerificationformData.token : ""} placeholder="Enter token" className="input input-bordered w-full max-w-xs h-10" />
            </div>}

            <Link to="/pages/login" className='text-sm text-gray-300 inline-block px-2 mt-2 hover:underline hover:text-green-500'>Have an account?</Link>

            {/* Login Button  */}
            <div className='h-5 flex w-full items-center justify-center mt-2'>
                <button
                    type="submit"
                    className="focus:outline-none text-white bg-outline bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5"
                    disabled={tokenSendloading || tokenVerificationLoading}
                >
                    {tokenSendloading || tokenVerificationLoading ? <span className='loading loading-spinner'></span> : (istokenSend ? "Verify" : "Next")}
                </button>
            </div>
        </form>
    )
}

export default EmailVerificationPage