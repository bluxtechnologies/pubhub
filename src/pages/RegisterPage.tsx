import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpenIcon, UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Checkbox } from '../components/ui/Checkbox';
import { Radio } from '../components/ui/Radio';
import { useAuth } from '../features/auth/AuthProvider';
import { useToast } from '../components/ui/ToastProvider';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleIntent, setRoleIntent] = useState<'reader' | 'writer'>('reader');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {
      toast.error('Missing Required Fields', 'Please complete all registration fields.');
      return;
    }

    if (!agreeTerms) {
      toast.warning('Terms Acceptance', 'Please accept the Platform Terms to register.');
      return;
    }

    setIsLoading(true);
    try {
      await register(name, username, email, password);
      toast.success('Account Created!', `Welcome to PubHub, ${name}!`);
      navigate(roleIntent === 'writer' ? '/write' : '/home');
    } catch {
      toast.error('Registration Failed', 'Could not create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
        <h2 className="font-serif font-bold text-2xl text-slate-900">Join the PubHub Community</h2>
        <p className="text-xs text-slate-500 mt-1">
          Connect with authors, read stories, and publish your own serial fiction
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-8 border border-slate-200/80 rounded-xl shadow-subtle">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Elena Vance"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<UserIcon className="w-4 h-4" />}
              required
            />

            <Input
              label="Username"
              type="text"
              placeholder="elenavance"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="elena@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<EnvelopeIcon className="w-4 h-4" />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<LockClosedIcon className="w-4 h-4" />}
              required
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                What brings you to PubHub?
              </label>
              <div className="space-y-2">
                <Radio
                  label="I want to read and follow stories"
                  checked={roleIntent === 'reader'}
                  onChange={() => setRoleIntent('reader')}
                  name="roleIntent"
                />
                <Radio
                  label="I want to publish my own books & serials"
                  checked={roleIntent === 'writer'}
                  onChange={() => setRoleIntent('writer')}
                  name="roleIntent"
                />
              </div>
            </div>

            <Checkbox
              label="I agree to the Terms of Service & Privacy Policy"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />

            <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
              Create Free Account
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-brand-900 hover:underline">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
