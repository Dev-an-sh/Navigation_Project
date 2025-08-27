import React, { useState, useEffect, useCallback } from 'react';
import type { User } from '../types';
import { Logo } from './icons/Logo';

interface AuthPageProps {
  onLoginSuccess: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');

  const generateCaptcha = useCallback(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newCaptcha = '';
    for (let i = 0; i < 6; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(newCaptcha);
  }, []);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (captchaInput !== captcha) {
      setError('CAPTCHA verification failed. Please try again.');
      generateCaptcha();
      setCaptchaInput('');
      return;
    }

    if (isLoginView) {
      // Mock login - in a real app, this would be an API call
      if (email === 'test@ckp.edu' && password === 'password123') {
        onLoginSuccess({ name: 'Test User', email });
      } else {
        setError('Invalid email or password.');
      }
    } else {
      // Mock registration
      if (!name || !email || !password) {
        setError('Please fill in all fields.');
        return;
      }
      onLoginSuccess({ name, email });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 transform transition-all hover:scale-105 duration-300">
        <div className="flex flex-col items-center space-y-4">
          <Logo />
          <h1 className="text-3xl font-bold text-gray-800">CKP Campus Navigation</h1>
        </div>

        <div className="flex border border-sky-200 rounded-full p-1">
          <button
            onClick={() => setIsLoginView(true)}
            className={`w-1/2 py-2.5 text-sm font-medium leading-5 rounded-full transition-colors duration-300 ${isLoginView ? 'bg-sky-500 text-white shadow' : 'text-sky-700 hover:bg-sky-100'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLoginView(false)}
            className={`w-1/2 py-2.5 text-sm font-medium leading-5 rounded-full transition-colors duration-300 ${!isLoginView ? 'bg-sky-500 text-white shadow' : 'text-sky-700 hover:bg-sky-100'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLoginView && (
            <InputField id="name" type="text" label="Full Name" value={name} onChange={e => setName(e.target.value)} />
          )}
          <InputField id="email" type="email" label="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
          <InputField id="password" type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} />

          <div className="flex flex-col space-y-2">
            <label htmlFor="captcha" className="text-sm font-medium text-gray-600">CAPTCHA</label>
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 bg-sky-100 text-gray-800 rounded-lg select-none tracking-widest font-mono italic text-xl">
                {captcha}
              </span>
              <button type="button" onClick={generateCaptcha} className="text-sky-500 hover:text-sky-600 text-sm">Refresh</button>
            </div>
            <input
              id="captcha"
              type="text"
              value={captchaInput}
              onChange={e => setCaptchaInput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              placeholder="Enter CAPTCHA"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-transform transform hover:scale-105 duration-300"
          >
            {isLoginView ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

interface InputFieldProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ id, type, label, value, onChange }) => (
  <div>
    <label htmlFor={id} className="text-sm font-medium text-gray-600">{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
    />
  </div>
);

export default AuthPage;