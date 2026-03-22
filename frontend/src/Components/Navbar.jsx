import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, User, LogOut } from 'lucide-react'
import Option from "./Buttons/Option"

export default function Navbar() {

    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    const token = localStorage.getItem("token")

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])


    const handleLogout = () => {
        localStorage.removeItem("token")
        setOpen(false)
        window.location.reload() // quick reset (simple approach)
    }

    return (
        <div className='w-full bg-bg border-b border-border/50 h-[75px] flex justify-between px-15 items-center'>

            <div className='text-2xl font-bold capitalize'>
                <span className='text-accent'>AUTO</span>
                <span className='text-text-primary'>RECRUIT</span>
            </div>

            <div className='flex items-center gap-2'>

                {!token ? (
                    <a href='/signup'>
                        <Option text={"Sign in"} />
                    </a>
                ) : (
                    <div className='relative' ref={dropdownRef}>

                        <button
                            onClick={() => setOpen(p => !p)}
                            className='flex items-center gap-2 bg-accent/3 border border-border pl-2 pr-3 py-2 rounded-[10px] hover:bg-accent/[0.05] hover:border-accent/30 transition-all duration-150'
                        >

                            <User size={18} className='text-text-primary' />

                            <ChevronDown
                                size={18}
                                className={`text-text-secondary transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {/* Dropdown */}
                        {open && (
                            <div className='absolute top-[calc(100%+8px)] right-0 w-52 bg-bg border border-border rounded-xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.5)] z-50'>

                                <div className='p-1.5'>
                                    {[
                                        { icon: User, label: 'My Profile', href: '/profile' },
                                    ].map(({ icon: Icon, label, href, dot }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            onClick={() => setOpen(false)}
                                            className='flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-accent/[0.08] transition-colors no-underline'
                                        >
                                            <Icon size={14} className='text-accent-soft' />
                                            <span className='text-[13px] font-medium text-accent-soft'>{label}</span>
                                            {dot && <span className='ml-auto w-1.5 h-1.5 rounded-full bg-accent' />}
                                        </a>
                                    ))}
                                </div>

                                <div className='h-px bg-border mx-1.5' />

                                <div className='p-1.5'>
                                    <button
                                        onClick={handleLogout}
                                        className='w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-red-500/[0.08] transition-colors'
                                    >
                                        <LogOut size={14} className='text-red-400' />
                                        <span className='text-[13px] font-medium text-red-400'>Sign out</span>
                                    </button>
                                </div>

                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}