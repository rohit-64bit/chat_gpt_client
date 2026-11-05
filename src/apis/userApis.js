import { errorHandler, apiOptions } from "../utils/common"

const apiPrefix = "users/"

const handleLogin = async({ email, password }) => {

    try {

        const response = await fetch(apiOptions.url(`${apiPrefix}auth/login`), {
            method: 'POST',
            headers: apiOptions.headers,
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (!res.ok || data.status !== 'success') {
            throw new Error(data.message || 'Login failed')
        }

        // data {message,data,status}

        return data

    } catch (error) {
        errorHandler(error)
    }

}

const handleRegister = async ({ email, password }) => {

    try {

        const res = await fetch(apiOptions.url(`${apiPrefix}auth/register`), {
            method: 'POST',
            headers: apiOptions.headers,
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            throw new Error(data.message || 'Registration failed');
        }

        return data;

    } catch (error) {
        errorHandler(error)
    }

}

const handleVerify = async ({ otp }) => {

    try {

        const res = await fetch(apiOptions.url(`${apiPrefix}auth/verify`), {
            method: 'POST',
            headers: apiOptions.headers,
            body: JSON.stringify({ otp })
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            throw new Error(data.message || 'Verification failed');
        }

        return data;

    } catch (error) {
        errorHandler(error)
    }

}

const getMyProfile = async () => {

    try {

        const res = await fetch(apiOptions.url(`${apiPrefix}me`), {
            method: 'GET',
            headers: apiOptions.headers
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            throw new Error(data.message || 'Failed to fetch profile');
        }

        return data;

    } catch (error) {
        errorHandler(error)
    }

}

export { handleLogin, handleRegister, handleVerify, getMyProfile }