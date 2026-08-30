/*
    default
        auth form email password
    exisiting user mode ()
    new user mode (sign up)
    
    2FA mode for OTP email verification

    finally redirect to home
*/

import { Button } from '@heroui/react';
import React, { useState } from 'react'

const LoginForm = ({ formMode }) => {
    return (
        <>
            <form action="" className="auth-form">
                <h2>
                    Sign In
                </h2>
                <input type="email" name='email' placeholder="Email" />
                <input type="password" name='password' placeholder="Password" />
                <Button type='submit'>Sign In</Button>

                <button type='button' onClick={() => formMode("signup")}>Don't have an account? Sign Up</button>

                <button type='button' onClick={() => formMode("reset")}>Forgot Password?</button>

            </form>
        </>
    )
}

const SignUpForm = ({ formMode }) => {

    return (
        <form action="" className="auth-form">
            <h2>
                Sign Up
            </h2>
            <input type="email" name='email' placeholder="Email" />
            <input type="password" name='password' placeholder="Password" />
            <input type="password" name='confirmPassword' placeholder="Confirm Password" />
            <Button type='submit'>Sign Up</Button>
            <button type='button' onClick={() => formMode("login")}>Already have an account? Log In</button>
            <button type='button' onClick={() => formMode("reset")}>Forgot Password?</button>
        </form>
    )

}

const ResetPasswordForm = ({ formMode }) => {

    return (
        <form action="" className="auth-form">
            <h2>
                Reset Password
            </h2>
            <input type="email" name='email' placeholder="Email" />
            <Button type='submit'>Send Reset Link</Button>
        </form>
    )

}

const Auth = () => {

    const [formMode, setFormMode] = useState("login")

    return (
        <div className='auth-page'>

            <div>

                {
                    formMode === "login" ? <LoginForm formMode={setFormMode} /> :
                        formMode === "signup" ?
                            <SignUpForm formMode={setFormMode} /> :
                            formMode === "reset" ?
                                <ResetPasswordForm formMode={setFormMode} /> :
                                <div>Invalid form mode</div>
                }

            </div>

        </div>
    )
}

export default Auth