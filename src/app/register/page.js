"use client"
import { axiosPublic } from '@/axios/api';
import auth from '@/firebase/firebase.config';
import { AuthContext } from '@/providers/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import Link from "next/link";

const Register = () => {
    const { userWithGoogle, createUser } = useContext(AuthContext)
    const [error, setError] = useState("")
    const [isLoading , setIsLoading] = useState(false)
    const router = useRouter()


    const handleGoogle = () => {
        userWithGoogle()
            .then(res => {
                console.log(res)

                if (res?.user) {
                    const userInfo = {
                        email: res?.user?.email,
                        name: res?.user?.displayName,
                        createdAt: new Date()
                    }
                    axiosPublic.post(`/user`, userInfo)
                        .then(res => {
                            console.log(res?.data)
                            if (res?.data) {
                                router.back()

                            }
                        })
                }

            })
            .catch(error => {
                console.log(error.message)
            })
    }
    const handleRegister = (e) => {
        e.preventDefault(); 
        setIsLoading(true)
    
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
    
        createUser(email, password)
            .then(res => {
                console.log(res);
                setError("");
                if (res.user) {
                    updateProfile(auth.currentUser, {
                        displayName: name
                    })
                    .then(() => {
                        console.log("Profile updated");
                        const userInfo = {
                            email: email,
                            name: name,
                            createdAt: new Date()
                        };
                        axiosPublic.post(`/user`, userInfo)
                            .then(res => {
                                if (res.data) {
                                    router.back();
                                    setIsLoading(false)
                                }
                            })
                            .catch(error => {
                                console.error(error.message);
                                setIsLoading(false)
                            });
                    })
                    .catch(error => {
                        console.error(error.message);
                        setError("An account has already been created with this email.");
                        setIsLoading(false)
                    });
                }
            })
            .catch(error => {
                console.error(error.message);
                setError("An error occurred while creating the account.");
                setIsLoading(false)
            });
    }
    
    return (
        <div>
            <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow-shadow-slate-300">
                <h1 className="text-4xl font-medium">Register</h1>
                <p className="text-slate-500">Hi, Welcome back 👋</p>

                <div className="my-5">
                    <button onClick={handleGoogle} className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                        <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />
                        <span>Continue with Google</span>
                    </button>
                </div>

                <form onSubmit={handleRegister} action="" className="my-10">
                    <div className="flex flex-col space-y-5">
                        <label htmlFor="name">
                            <p className="font-medium text-slate-700 pb-2">Name</p>
                            <input required id="name" name="name" type="text" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter Name" />
                        </label>
                        <label htmlFor="email">
                            <p className="font-medium text-slate-700 pb-2">Email address</p>
                            <input required id="email" name="email" type="email" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" />
                        </label>
                        <label htmlFor="password">
                            <p className="font-medium text-slate-700 pb-2">Password</p>
                            <input required id="password" name="password" type="password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password" />
                        </label>

                        {error && <div className=' text-red-600'>{error}</div>}

                        <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                        {isLoading && <span className="loading text-white  loading-spinner loading-xs"></span>}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span>Register</span>
                        </button>
                        <p className="text-center">Already have an account?
                            <Link href="/login" className="text-indigo-600 font-medium inline-flex space-x-1 items-center">
                                <span>Login now</span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </span>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;