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
import onChangeHandler from '../utils/onChangeHandler';
import { useMainContext } from '../contexts/MainContext';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const LoginForm = ({ formMode }) => {

    const {
        loginMutation
    } = useMainContext()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    return (
        <>
            <form onSubmit={() => {
                loginMutation.mutate(formData);
            }} className="auth-form">

                <h2>
                    Sign In
                </h2>

                <input type="email" name='email' placeholder="Email" value={formData.email} onChange={(e) => onChangeHandler(e, setFormData)} />
                <input type="password" name='password' placeholder="Password" value={formData.password} onChange={(e) => onChangeHandler(e, setFormData)} />

                <Button type='submit' isLoading={loginMutation.isPending} isDisabled={loginMutation.isPending}>
                    Sign In
                </Button>

                <button type='button' onClick={() => formMode("signup")}>Don't have an account? Sign Up</button>

                <button type='button' onClick={() => formMode("reset")}>Forgot Password?</button>

            </form>
        </>
    )
}

const SignUpForm = ({ formMode }) => {

    const {
        registerMutation
    } = useMainContext()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })



    return (
        <form onSubmit={() => {
            if (formData.password !== formData.confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
            registerMutation.mutate(formData);
        }} className="auth-form">
            <h2>
                Sign Up
            </h2>
            <input type="email" name='email' placeholder="Email" value={formData.email} onChange={(e) => onChangeHandler(e, setFormData)} />
            <input type="password" name='password' placeholder="Password" value={formData.password} onChange={(e) => onChangeHandler(e, setFormData)} />
            <input type="password" name='confirmPassword' placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => onChangeHandler(e, setFormData)} />
            <Button type='submit' isLoading={registerMutation.isPending} isDisabled={registerMutation.isPending}>
                Sign Up
            </Button>
            <button type='button' onClick={() => formMode("login")}>Already have an account? Log In</button>
            <button type='button' onClick={() => formMode("reset")}>Forgot Password?</button>
        </form>
    )

}

const ResetPasswordForm = ({ formMode }) => {
    const [formData, setFormData] = useState({
        email: ''
    })

    return (
        <form onSubmit={() => {
            // Handle reset password logic here
        }} className="auth-form">
            <h2>
                Reset Password
            </h2>
            <input type="email" name='email' placeholder="Email" value={formData.email} onChange={(e) => onChangeHandler(e, setFormData)} />
            <Button type='submit'>
                Send Reset Link
            </Button>
        </form>
    )

}

const VerifyForm = ({ formMode }) => {

    const {
        verifyMutation
    } = useMainContext()

    const [formData, setFormData] = useState({
        otp: ''
    })

    return (
        <form className="auth-form" onSubmit={() => {
            verifyMutation.mutate(formData);
        }}>
            <h2>
                Verify Account
            </h2>
            <input type="text" name='otp' placeholder="Enter OTP" value={formData.otp} onChange={(e) => onChangeHandler(e, setFormData)} />
            <Button type='submit' isLoading={verifyMutation.isPending} isDisabled={verifyMutation.isPending}>
                Verify
            </Button>
        </form>
    )

}

const Auth = () => {

    const {
        temptoken
    } = useParams()

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
                                ((formMode === "verify") && temptoken) ?
                                    <VerifyForm formMode={setFormMode} /> :
                                    <div>Invalid form mode</div>
                }

            </div>

        </div>
    )
}

export default Auth