"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "../../components/authProvider";

// const login_url = "http://127.0.0.1:8000/api/token/pair"
const login_url = "/api/login/"
const LoginForm = () => {
    const router  = useRouter();
    const auth = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log(event.target)
        const formData = new FormData(event.target);
        const objectFromForm = Object.fromEntries(formData)
        const jsonData = JSON.stringify(objectFromForm)
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: jsonData
        }
        console.log("")
        const response = await fetch(login_url, requestOptions)
        if(!response.ok){
            const data = await response.json();
            console.log("Data:- ", data)
        }
        if(response.ok){
            console.log("Login successful!")
            auth.login()
            router.replace('/')
        }
    };

    return (
        <div className="login-form max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;