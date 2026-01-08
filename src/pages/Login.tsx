import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Server, Activity, Shield, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const { theme } = useTheme();
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  // Get the page user was trying to access
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      {/* Left Side - Login Form */}
      <div className={`w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="size-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Server className="size-6 text-white" />
            </div>
            <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              MonServ
            </span>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Welcome back
            </h1>
            <p className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Enter your credentials to access your dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                Email address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 size-5 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                      : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
                  }`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 size-5 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full pl-11 pr-12 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                      : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-4 rounded border-zinc-300 text-emerald-500 focus:ring-emerald-500"
                />
                <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-emerald-500 hover:text-emerald-400 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'}`} />
            <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
              or continue with
            </span>
            <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'}`} />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className={`flex items-center justify-center gap-2 py-3 rounded-lg border transition-colors ${
                theme === 'dark'
                  ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700'
                  : 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <svg className="size-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-medium">Google</span>
            </button>
            <button
              type="button"
              className={`flex items-center justify-center gap-2 py-3 rounded-lg border transition-colors ${
                theme === 'dark'
                  ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700'
                  : 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="font-medium">GitHub</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className={`mt-8 text-center ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-500 hover:text-emerald-400 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Promotional */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-500 to-emerald-700 p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="size-8 text-white/90" />
            <span className="text-white/90 font-semibold">Secure & Reliable</span>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Monitor your servers<br />with confidence
          </h2>
          <p className="text-white/80 text-lg max-w-md">
            Real-time monitoring, instant alerts, and comprehensive analytics for all your infrastructure needs.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Activity className="size-8 text-white mb-2" />
              <h3 className="text-white font-semibold mb-1">Real-time Metrics</h3>
              <p className="text-white/70 text-sm">Live performance data at your fingertips</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Server className="size-8 text-white mb-2" />
              <h3 className="text-white font-semibold mb-1">Multi-Server</h3>
              <p className="text-white/70 text-sm">Monitor multiple nodes from one dashboard</p>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="relative z-10 flex items-center gap-8">
          <div>
            <p className="text-3xl font-bold text-white">99.9%</p>
            <p className="text-white/70 text-sm">Uptime SLA</p>
          </div>
          <div className="w-px h-12 bg-white/20" />
          <div>
            <p className="text-3xl font-bold text-white">50K+</p>
            <p className="text-white/70 text-sm">Servers Monitored</p>
          </div>
          <div className="w-px h-12 bg-white/20" />
          <div>
            <p className="text-3xl font-bold text-white">24/7</p>
            <p className="text-white/70 text-sm">Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}