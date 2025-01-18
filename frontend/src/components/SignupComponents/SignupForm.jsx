import React from 'react'
import { Link } from 'react-router-dom'

const SignupForm = ({ loading, signup, handleChange, handleSubmit, formData }) => {
    return (
        <div>
            <form>
                {/* fullname Section  */}
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-gray-300'>Full Name</span>
                    </label>
                    <input name="fullName" onChange={handleChange} value={formData.fullName ? formData.fullName : ""} type="text" placeholder='Enter full name' className='input input-bordered w-full max-w-xs h-10' />
                </div>

                {/* userName section  */}
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-gray-300'>Username</span>
                    </label>
                    <input name="userName" onChange={handleChange} value={formData.userName ? formData.userName : ""} type="text" placeholder='Enter username' className='input input-bordered w-full max-w-xs h-10' />
                </div>

                {/* email section  */}
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-gray-300'>Email</span>
                    </label>
                    <input name="email" value={formData.email} type="email" placeholder='Enter email' className='input input-bordered w-full max-w-xs h-10' readOnly/>
                </div>

                {/* password section  */}
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-gray-300'>Password</span>
                    </label>
                    <input name="Password" onChange={handleChange} value={formData.Password ? formData.Password : ""} type="password" placeholder='Enter password' className='input input-bordered w-full max-w-xs h-10' />
                </div>

                {/* confirm password section  */}
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-gray-300'>Confirm Password</span>
                    </label>
                    <input name="confirmPassword" onChange={handleChange} value={formData.confirmPassword ? formData.confirmPassword : ""} type="password" placeholder='Enter password again' className='input input-bordered w-full max-w-xs h-10' />
                </div>

                {/* Gender Checkbox Goes Here  */}
                <label className='label px-2 pt-2 pb-0'>
                    <span className='text-base label-text text-gray-300'>Select Gender</span>
                </label>
                <div className="flex p-2">
                    <div className="flex items-center me-4">
                        <input id="inline-radio" type="radio" name="Gender" value={"male"} onChange={handleChange} checked={formData.Gender && formData.Gender === 'male'} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="inline-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                    </div>
                    <div className="flex items-center me-4">
                        <input id="inline-2-radio" type="radio" name="Gender" value={"female"} onChange={handleChange} checked={formData.Gender && formData.Gender === 'female'} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="inline-2-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                    </div>
                </div>

                <Link className='text-sm hover:underline hover:text-green-300 mt-2 inline-block px-2' to='/pages/login'>Already have an account?</Link>
                <div className='h-5 flex w-full items-center justify-center mt-2'>
                    <button onClick={handleSubmit} type="button" className="focus:outline-none text-gray-300 bg-outline bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-4 py-2" disabled={loading}>{loading ? <span className="loading loading-spinner"></span> : "SignUp"}</button>
                </div>
            </form>
        </div>
    )
}

export default SignupForm
