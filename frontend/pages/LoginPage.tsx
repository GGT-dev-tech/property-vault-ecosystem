import React, { useState } from 'react';
import { api } from '../services/api';

interface LoginPageProps {
    onNavigate: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.auth.login(email, password);
            onNavigate('dashboard');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#111621]">
            <div className="max-w-md w-full bg-white dark:bg-[#1a2133] rounded-xl shadow-lg p-8 border border-slate-200 dark:border-[#2d364d]">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">Sign In</h2>
                {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-[#2d364d] bg-white dark:bg-[#111621] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-[#2d364d] bg-white dark:bg-[#111621] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full h-12 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Don't have an account?{' '}
                        <button onClick={() => onNavigate('register')} className="text-primary font-bold hover:underline">
                            Register
                        </button>
                    </p>
                    <p className="mt-4 text-slate-500 text-xs cursor-pointer hover:underline" onClick={() => onNavigate('dashboard')}>
                        Continue as Guest
                    </p>
                </div>
            </div>
        </div>
    );
};
