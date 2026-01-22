import React, { useState } from 'react';
import { api } from '../services/api';

interface RegisterPageProps {
    onNavigate: (page: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.auth.register(email, password, name);
            onNavigate('dashboard');
        } catch (err) {
            setError('Registration failed. Try again.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#111621]">
            <div className="max-w-md w-full bg-white dark:bg-[#1a2133] rounded-xl shadow-lg p-8 border border-slate-200 dark:border-[#2d364d]">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">Create Account</h2>
                {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-[#2d364d] bg-white dark:bg-[#111621] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                        Sign Up
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Already have an account?{' '}
                        <button onClick={() => onNavigate('login')} className="text-primary font-bold hover:underline">
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
