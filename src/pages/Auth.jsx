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
            <form action="">
                <div>
                    Sign In
                </div>
                <input type="email" name='email' />
                <input type="password" name='password' />
                <Button>Sign In</Button>

                <button onClick={() => formMode("signup")}>Don't have an account? Sign Up</button>

            </form>
        </>
    )
}

const SignUpForm = ({ formMode }) => {

    return (
        <form action="">
            <div>
                Sign Up
            </div>
            <button onClick={() => formMode("login")}>Already have an account? Log In</button>
        </form>
    )

}

const Auth = () => {

    const [formMode, setFormMode] = useState("login")

    return (
        <div className='h-screen'>

            <div>

                {
                    formMode === "login" ? <LoginForm formMode={setFormMode} /> : <SignUpForm formMode={setFormMode} />
                }

            </div>

        </div>
    )
}

export default Auth