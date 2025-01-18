import React from 'react'

const Forgotpswemailverificationsection = ({ email, setemail, token, settoken, sendTokenFunction, loading, istokenSend, forgottokenverificationfunction, verifyingForgotTokenLoading }) => {
    return (
        <form onSubmit={!istokenSend ? sendTokenFunction : forgottokenverificationfunction}>
            {/* Email Input Box */}
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text text-gray-300'>Enter Your Email</span>
                </label>
                <input type="email" onChange={(e) => setemail(e.target.value)} value={email ? email : ""} placeholder="Enter email" className="input input-bordered w-full max-w-xs h-10" readOnly={istokenSend} />
            </div>

            {/* Token Input Box */}
            {istokenSend && <div>
                <label className='label p-2'>
                    <span className='text-base label-text text-gray-300'>Enter token(Check your mail)</span>
                </label>
                <input type="text" onChange={(e) => settoken(e.target.value)} value={token ? token : ""} placeholder="Enter token" className="input input-bordered w-full max-w-xs h-10" />
            </div>}

            {/* Login Button  */}
            <div className='h-5 flex w-full items-center justify-center mt-2'>
                <button type="submit" className="focus:outline-none text-white bg-outline bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5" disabled={loading || verifyingForgotTokenLoading}>{loading || verifyingForgotTokenLoading ? <span className='loading loading-spinner'></span> : istokenSend ? "Verify" : "Next"}</button>
            </div>
        </form>
    )
}

export default Forgotpswemailverificationsection
