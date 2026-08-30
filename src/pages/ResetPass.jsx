/*
handles reset password flow for user
form with input email -> otp verification (auth-page) -> new password input -> success message
*/

import { Button } from '@heroui/react'
import React from 'react'

const ResetPass = () => {
    return (
        <div className="auth-page">
            <form action="" className="auth-form">

                <h2>
                    Reset Password
                </h2>

                <input type="password" name="newPassword" id="" placeholder="New Password" />
                <input type="password" name="confirmPassword" id="" placeholder="Confirm Password" />

                <Button type="submit">Reset Password</Button>

            </form>
        </div>
    )
}

export default ResetPass