import React, { useState } from 'react'
import PrimaryButton from "../Components/Buttons/PrimaryButton"
import axios from "axios"
import { useNavigate } from 'react-router'

export default function SignupPage() {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        // if (form.password !== form.confirmPassword) {
        //     console.error("Passwords do not match")
        //     return
        // }

        const url = import.meta.env.VITE_BACKEND_URL + '/auth/signup'

        console.log(form)

        try {
            const res = await axios.post(url, {
                fullName: form.fullName,
                email: form.email,
                password: form.password
            })
            
            if(res.status === 201 ){
                navigate("/login")
            }

        } catch (err) {
            console.error(err.response?.data?.message || err.message)
        }
    }

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleGoogleSignup = async => {

    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-bg px-4'>

            <div className='w-full max-w-md bg-bg border border-border rounded-xl p-8 shadow-sm flex flex-col gap-6'>

                {/* Header */}
                <div className='text-center'>
                    <h1 className='text-2xl font-semibold text-text-primary'>
                        Create Account
                    </h1>
                    <p className='text-sm text-text-secondary mt-1'>
                        Sign up to get started
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={handleChange}
                        className='px-4 py-3 rounded-lg hover:border-accent-deep bg-bg border border-border text-text-primary focus:outline-none focus:ring-1 focus:ring-border'
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        className='px-4  hover:border-accent-deep py-3 rounded-lg bg-bg border border-border text-text-primary focus:outline-none focus:ring-1 focus:ring-border'
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className='px-4 py-3 rounded-lg  hover:border-accent-deep bg-bg border border-border text-text-primary focus:outline-none focus:ring-1 focus:ring-border'
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className='px-4 py-3 rounded-lg  hover:border-accent-deep bg-bg border border-border text-text-primary focus:outline-none focus:ring-1 focus:ring-border'
                        required
                    />

                    <PrimaryButton text={"Create Account"} />

                </form>

                {/* Divider */}
                <div className='flex items-center gap-3'>
                    <div className='flex-1 h-px bg-border' />
                    <span className='text-xs text-text-secondary'>OR</span>
                    <div className='flex-1 h-px bg-border' />
                </div>

                {/* Google Signup */}
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

                {/* Login Redirect */}
                <p className='text-center text-sm text-text-secondary'>
                    Already have an account?{" "}
                    <span
                        onClick={() => {
                            navigate("/login")
                        }}
                        className='cursor-pointer hover:underline text-text-primary'>
                        Login
                    </span>
                </p>

            </div>
        </div>
    )
}