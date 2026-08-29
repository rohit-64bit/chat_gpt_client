import React, { useState, useCallback } from 'react'
import './Auth.css'

const GoogleIcon = () => (
    <svg className="social-icon" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
)

const AppleIcon = () => (
    <svg className="social-icon" viewBox="0 0 24 24" fill="#000000">
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
)

const PhoneIcon = () => (
    <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
)

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
)

const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
)

const EyeOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
)


const LoginForm = ({ onSwitchMode }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const validateForm = useCallback(() => {
        const newErrors = {}
        if (!email.trim()) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email'
        if (!password) newErrors.password = 'Password is required'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }, [email, password])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validateForm()) return
        setLoading(true)
        setTimeout(() => setLoading(false), 2000)
    }

    return (
        <div className="auth-form-content" key="login">
            <div className="auth-header">
                <img src="/favicon.svg" alt="Logo" className="auth-logo" />
                <h1 className="auth-title">Log in or sign up</h1>
                <p className="auth-subtitle">
                    You'll get smarter responses and can upload files,
                    images, and more.
                </p>
            </div>

            <div className="auth-social-buttons">
                <button type="button" className="auth-social-btn" id="google-login-btn">
                    <GoogleIcon />
                    <span>Continue with Google</span>
                </button>
                <button type="button" className="auth-social-btn" id="apple-login-btn">
                    <AppleIcon />
                    <span>Continue with Apple</span>
                </button>
                <button type="button" className="auth-social-btn" id="phone-login-btn">
                    <PhoneIcon />
                    <span>Continue with phone</span>
                </button>
            </div>

            <div className="auth-divider">
                <div className="auth-divider-line" />
                <span className="auth-divider-text">OR</span>
                <div className="auth-divider-line" />
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <div>
                    <input
                        type="email"
                        className={`auth-input ${errors.email ? 'error' : ''}`}
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })) }}
                        id="login-email-input"
                        autoComplete="email"
                    />
                    {errors.email && <div className="auth-input-error">{errors.email}</div>}
                </div>

                <div className="auth-input-group">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className={`auth-input ${errors.password ? 'error' : ''}`}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })) }}
                        id="login-password-input"
                        autoComplete="current-password"
                    />
                    <button
                        type="button"
                        className="auth-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                    {errors.password && <div className="auth-input-error">{errors.password}</div>}
                </div>

                <button type="button" className="auth-forgot-link">
                    Forgot password?
                </button>

                <button
                    type="submit"
                    className={`auth-submit-btn ${loading ? 'loading' : ''}`}
                    disabled={loading}
                    id="login-submit-btn"
                >
                    Continue
                </button>
            </form>

            <div className="auth-footer">
                <p className="auth-footer-text">
                    Don't have an account?{' '}
                    <button
                        type="button"
                        className="auth-footer-link"
                        onClick={() => onSwitchMode('signup')}
                        id="switch-to-signup-btn"
                    >
                        Sign up
                    </button>
                </p>
            </div>

            <p className="auth-terms">
                By continuing, you agree to our{' '}
                <a href="#terms">Terms of Service</a>{' '}
                and{' '}
                <a href="#privacy">Privacy Policy</a>.
            </p>
        </div>
    )
}


const SignUpForm = ({ onSwitchMode }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const validateForm = useCallback(() => {
        const newErrors = {}
        if (!firstName.trim()) newErrors.firstName = 'First name is required'
        if (!lastName.trim()) newErrors.lastName = 'Last name is required'
        if (!email.trim()) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email'
        if (!password) newErrors.password = 'Password is required'
        else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters'
        if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
        else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }, [firstName, lastName, email, password, confirmPassword])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validateForm()) return
        setLoading(true)
        setTimeout(() => setLoading(false), 2000)
    }

    const clearError = (field) => {
        setErrors(prev => ({ ...prev, [field]: '' }))
    }

    return (
        <div className="auth-form-content" key="signup">
            <div className="auth-header">
                <img src="/favicon.svg" alt="Logo" className="auth-logo" />
                <h1 className="auth-title">Create your account</h1>
                <p className="auth-subtitle">
                    Join to get smarter responses, upload files,
                    images, and more.
                </p>
            </div>

            <div className="auth-social-buttons">
                <button type="button" className="auth-social-btn" id="google-signup-btn">
                    <GoogleIcon />
                    <span>Continue with Google</span>
                </button>
                <button type="button" className="auth-social-btn" id="apple-signup-btn">
                    <AppleIcon />
                    <span>Continue with Apple</span>
                </button>
            </div>

            <div className="auth-divider">
                <div className="auth-divider-line" />
                <span className="auth-divider-text">OR</span>
                <div className="auth-divider-line" />
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <div className="auth-name-row">
                    <div>
                        <input
                            type="text"
                            className={`auth-input ${errors.firstName ? 'error' : ''}`}
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => { setFirstName(e.target.value); clearError('firstName') }}
                            id="signup-firstname-input"
                            autoComplete="given-name"
                        />
                        {errors.firstName && <div className="auth-input-error">{errors.firstName}</div>}
                    </div>
                    <div>
                        <input
                            type="text"
                            className={`auth-input ${errors.lastName ? 'error' : ''}`}
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => { setLastName(e.target.value); clearError('lastName') }}
                            id="signup-lastname-input"
                            autoComplete="family-name"
                        />
                        {errors.lastName && <div className="auth-input-error">{errors.lastName}</div>}
                    </div>
                </div>

                <div>
                    <input
                        type="email"
                        className={`auth-input ${errors.email ? 'error' : ''}`}
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); clearError('email') }}
                        id="signup-email-input"
                        autoComplete="email"
                    />
                    {errors.email && <div className="auth-input-error">{errors.email}</div>}
                </div>

                <div className="auth-input-group">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className={`auth-input ${errors.password ? 'error' : ''}`}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); clearError('password') }}
                        id="signup-password-input"
                        autoComplete="new-password"
                    />
                    <button
                        type="button"
                        className="auth-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                    {errors.password && <div className="auth-input-error">{errors.password}</div>}
                </div>

                <div className="auth-input-group">
                    <input
                        type={showConfirm ? 'text' : 'password'}
                        className={`auth-input ${errors.confirmPassword ? 'error' : ''}`}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); clearError('confirmPassword') }}
                        id="signup-confirm-password-input"
                        autoComplete="new-password"
                    />
                    <button
                        type="button"
                        className="auth-password-toggle"
                        onClick={() => setShowConfirm(!showConfirm)}
                        tabIndex={-1}
                        aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    >
                        {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                    {errors.confirmPassword && <div className="auth-input-error">{errors.confirmPassword}</div>}
                </div>

                <button
                    type="submit"
                    className={`auth-submit-btn ${loading ? 'loading' : ''}`}
                    disabled={loading}
                    id="signup-submit-btn"
                >
                    Create account
                </button>
            </form>

            <div className="auth-footer">
                <p className="auth-footer-text">
                    Already have an account?{' '}
                    <button
                        type="button"
                        className="auth-footer-link"
                        onClick={() => onSwitchMode('login')}
                        id="switch-to-login-btn"
                    >
                        Log in
                    </button>
                </p>
            </div>

            <p className="auth-terms">
                By continuing, you agree to our{' '}
                <a href="#terms">Terms of Service</a>{' '}
                and{' '}
                <a href="#privacy">Privacy Policy</a>.
            </p>
        </div>
    )
}


const Auth = () => {
    const [formMode, setFormMode] = useState('login')

    return (
        <div className="auth-backdrop">
            <div className="auth-modal">
                <button
                    className="auth-close-btn"
                    type="button"
                    aria-label="Close"
                    id="auth-close-btn"
                >
                    <CloseIcon />
                </button>

                {formMode === 'login'
                    ? <LoginForm onSwitchMode={setFormMode} />
                    : <SignUpForm onSwitchMode={setFormMode} />
                }
            </div>
        </div>
    )
}

export default Auth