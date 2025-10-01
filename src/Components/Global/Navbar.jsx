import { Briefcase, LayoutDashboard, User, Sun, Moon, LogOut } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import { ThemeContext } from './Theme';
import { useContext } from 'react';

export default function Navbar() {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <>
            <nav className={`px-4 py-2 flex items-center justify-between shadow ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'
                }`}>

                <div className="flex items-center gap-2">
                    <Briefcase className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                    <Link to="/" className="text-lg font-semibold hover:text-blue-700">
                        Internship Board
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center gap-1 hover:text-blue-600">
                        <Briefcase className="w-5 h-5" />
                        Home
                    </Link>
                    <Link to="/dashboard" className="flex items-center gap-1 hover:text-purple-500">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                </div>

                {/* Right side controls: Theme toggle and Sign Out */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                        className="flex items-center justify-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-6 h-6 text-yellow-400" />
                        ) : (
                            <Moon className="w-6 h-6 text-gray-600" />
                        )}
                    </button>

                    <button
                        type="button"
                        aria-label="Sign Out"
                        className="flex items-center gap-1 py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>

                    <User className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-400'}`} />
                </div>
            </nav>

            <Outlet />
        </>
    );
}