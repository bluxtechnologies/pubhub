import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, EnvelopeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/ToastProvider';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Email Required', 'Please enter your registered email address.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      toast.success('Reset Link Sent', 'Check your inbox for password reset instructions.');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center text-white shadow-subtle">
            <BookOpenIcon className="w-6 h-6" />
          </div>
          <span className="font-serif font-black text-2xl text-slate-900 tracking-tight">PubHub</span>
        </Link>
        <h2 className="font-serif font-bold text-2xl text-slate-900">Reset your password</h2>
        <p className="text-xs text-slate-500 mt-1">
          Enter your email and we'll send you a link to reset your account password.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-8 border border-slate-200/80 rounded-xl shadow-subtle">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<EnvelopeIcon className="w-4 h-4" />}
                required
              />

              <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs leading-relaxed">
                Reset instructions have been sent to <strong className="text-emerald-950">{email}</strong>.
              </div>
              <p className="text-xs text-slate-500">
                Didn't receive the email? Check your spam folder or try re-entering your email address.
              </p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <Link to="/login" className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-brand-900">
              <ArrowLeftIcon className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
