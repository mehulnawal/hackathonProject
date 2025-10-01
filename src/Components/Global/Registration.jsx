import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    UserPlus,
    Chrome,
    Sun,
    Moon
} from "lucide-react";
import { ThemeContext } from "./Theme";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase, ref, set } from 'firebase/database';
import { Firebase } from "./Firebase";
import { toast } from "react-toastify";

export const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [error, setError] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [check, setCheck] = useState({
        name: false,
        email: false,
        password: false
    })
    const { theme, setTheme } = useContext(ThemeContext)
    const navigate = useNavigate()

    // handle Form Data
    function handleFormData(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        // name validation
        if (name == 'name') {
            const nameRegex = /^[a-zA-Z ]+$/;
            if (value.trim() == '') {
                setError((prev) => ({ ...prev, name: "Enter Name" }));
                setCheck((prev) => ({ ...prev, name: false }));
            }
            else if (!nameRegex.test(value.trim())) {
                setError((prev) => ({ ...prev, name: "Invalid Name - Only letters allowed" }));
                setCheck((prev) => ({ ...prev, name: false }));
            }
            else {
                setError((prev) => ({ ...prev, name: "" }));
                setCheck((prev) => ({ ...prev, name: true }));
            }
        }

        // email validation
        if (name == 'email') {
            const emailIDRegex = /^[a-zA-Z0-9-+._]+@[a-zA-Z0-9+-]+\.[a-zA-Z]{2,}$/;
            if (value.trim() == '') {
                setError((prev) => ({ ...prev, email: "Enter Email id" }));
                setCheck((prev) => ({ ...prev, email: false }));
            }
            else if (!emailIDRegex.test(value.trim())) {
                setError((prev) => ({ ...prev, email: "Invalid Email id" }));
                setCheck((prev) => ({ ...prev, email: false }));
            }
            else {
                setError((prev) => ({ ...prev, email: "" }));
                setCheck((prev) => ({ ...prev, email: true }));
            }
        }

        // password validation
        if (name == 'password') {
            if (value.trim() == '') {
                setError((prev) => ({ ...prev, password: "Enter password" }));
                setCheck((prev) => ({ ...prev, password: false }));
            }
            else if (value.length < 6) {
                setError((prev) => ({ ...prev, password: "Password must be at least 6  characters" }));
                setCheck((prev) => ({ ...prev, password: false }));
            }
            else {
                setError((prev) => ({ ...prev, password: "" }));
                setCheck((prev) => ({ ...prev, password: true }));
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const allValid = Object.entries(check).every((v) => v[1] == true)
        if (!allValid) {
            Object.entries(check).forEach((v) => {
                if (v[1] == false) {
                    const inputName = v[0];
                    setError((prev) => ({ ...prev, [inputName]: `Enter your ${inputName}` }));
                    setCheck((prev) => ({ ...prev, [inputName]: false }));
                }
            })
            return;
        }
        else {
            setIsLoading(true);
            const auth = getAuth(Firebase);
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then(async (userCredential) => {
                    const db = getDatabase(Firebase)
                    const user = userCredential.user
                    await set(ref(db, `usersData/${user.uid}`), {
                        name: formData.name,
                        email: formData.email,
                    });
                    toast.success("Account created")
                })
                .catch((error) => {
                    console.log("Firebase Error:", error.code, error.message);

                    if (error.code === "auth/user-not-found") {
                        setError((prev) => ({ ...prev, email: "No account found with this email." }));
                    }
                    else if (error.code === "auth/wrong-password") {
                        setError((prev) => ({ ...prev, password: "Incorrect password." }));
                    }
                    else if (error.code === "auth/invalid-email") {
                        setError((prev) => ({ ...prev, email: "Invalid email format." }));
                    }
                    else if (error.code === "auth/email-already-in-use") {
                        toast.error("Email already register");
                        navigate('/')
                    }
                    else {
                        toast.error("Something went wrong: " + error.message);
                    }
                })
                .finally(
                    setIsLoading(false)
                )

        }
    }


    return (
        <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-emerald-100'}`}>
            <div className={`relative max-w-md w-full space-y-8 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl border shadow-xl`}>

                {/* Header */}
                <div className="text-center">
                    <div className={`mx-auto h-16 w-16 flex items-center justify-center rounded-full ${theme === 'dark' ? 'bg-green-600' : 'bg-green-100'}`}>
                        <UserPlus className={`h-8 w-8 ${theme === 'dark' ? 'text-white' : 'text-green-600'}`} />
                    </div>
                    <h2 className={`mt-6 text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Create Account
                    </h2>
                    <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Join us and start your journey
                    </p>
                </div>

                <div className="theme cursor-pointer absolute top-10 right-10" onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
                    {theme == 'dark' ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-black" />}
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

                    {/* Username Input */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormData}
                                placeholder="Choose a username"
                                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors
                                    ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    } ${error.name ? 'border-red-500' : ''}`}
                            />
                        </div>
                        {error.name && (
                            <p className="mt-1 text-sm text-red-500">
                                {error.name}
                            </p>
                        )}
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleFormData}
                                placeholder="Enter your email"
                                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors
                                    ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    } ${error.email ? 'border-red-500' : ''}`}
                            />
                        </div>
                        {error.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {error.email}
                            </p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleFormData}
                                placeholder="Create a password"
                                className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors
                                    ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    } ${error.password ? 'border-red-500' : ''}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? (
                                    <EyeOff className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`} />
                                ) : (
                                    <Eye className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`} />
                                )}
                            </button>
                        </div>
                        {error.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {error.password}
                            </p>
                        )}
                        <div className={`mt-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Password must be 6 digits long
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-200
                            ${isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:shadow-lg transform hover:-translate-y-0.5'
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Creating account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="text-center">
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Already have an account?{" "}
                        <Link
                            to="/"
                            className="font-medium text-green-600 hover:text-green-500 transition-colors hover:underline"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};