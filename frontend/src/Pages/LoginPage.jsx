import React, { useState } from 'react'
import axios from 'axios'
import PrimaryButton from "../Components/PrimaryButton"
import { useNavigate } from 'react-router'

export default function LoginPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const validate = () => {
        if (!form.email || !form.password) {
            return "All fields are required"
        }

        if (!form.email.includes("@")) {
            return "Invalid email"
        }

        if (form.password.length < 6) {
            return "Password must be at least 6 characters"
        }

        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("")

        const validationError = validate()
        if (validationError) {
            setError(validationError)
            return
        }

        const url = import.meta.env.VITE_BACKEND_URL + "/auth/login"

        try {
            setLoading(true)

            const res = await axios.post(url, {
                email: form.email,
                password: form.password
            })

            // STATUS HANDLING
            if (res.status === 200) {
                console.log("Login success")
                localStorage.setItem("token", res.data.token)
                window.location.href = "/"
            }

        } catch (err) {

            if (err.response) {
                // backend responded with error
                if (err.response.status === 401) {
                    setError("Invalid email or password")
                } else if (err.response.status === 404) {
                    setError("User not found")
                } else if (err.response.status === 500) {
                    setError("Server error, try again later")
                } else {
                    setError(err.response.data?.message || "Something went wrong")
                }
            } else {
                // network error
                setError("Network error. Check your connection.")
            }

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='relative min-h-screen flex items-center justify-center bg-bg overflow-hidden px-4'>

            <div className='relative z-10 w-full max-w-md bg-bg border border-border rounded-2xl p-8 shadow-lg flex flex-col gap-6'>

                {/* Header */}
                <div className='text-center'>
                    <h1 className='text-2xl md:text-3xl font-bold text-text-primary'>
                        Welcome Back
                    </h1>
                    <p className='text-text-secondary text-sm mt-2'>
                        Login to continue your journey
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        className='w-full px-4 py-3 rounded-lg bg-bg border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-accent'
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        className='w-full px-4 py-3 rounded-lg bg-bg border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-accent'
                    />

                    {/* Error */}
                    {error && (
                        <p className='text-sm text-red-500'>{error}</p>
                    )}

                    {/* Button */}
                    <PrimaryButton text={loading ? "Logging in..." : "Login"} />

                </form>

                {/* Divider */}
                <div className='flex items-center gap-3'>
                    <div className='flex-1 h-px bg-border' />
                    <span className='text-xs text-text-secondary'>OR</span>
                    <div className='flex-1 h-px bg-border' />
                </div>

                {/* Google Login */}
                <button className='w-full flex items-center justify-center gap-3 border border-border py-3 rounded-lg hover:bg-bg-elevated/30 duration-150 transition cursor-pointer'>
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="google"
                        className='w-5 h-5'
                    />
                    <span className='text-sm text-text-primary font-medium'>
                        Continue with Google
                    </span>
                </button>

                {/* Signup */}
                <p className='text-center text-sm text-text-secondary'>
                    Don’t have an account?{" "}
                    <span 
                    onClick={ () => {
                        navigate("/signup")
                    } }
                    className='text-accent cursor-pointer hover:underline'>
                        Create account
                    </span>
                </p>

            </div>
        </div>
    )
}