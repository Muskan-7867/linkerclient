import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from '../../../components/InputField';
import PasswordField from '../../../components/PasswordField';
import UserIcon from "../../../../public/svg/user-icon.svg"
import { register } from "../../../services/authService";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage('');
  
    try {
      const response = await register(username, email, password);
      localStorage.setItem('token', response.accesstoken);
      setMessage('User registered successfully!');
      navigate("/login");
    } catch (err: unknown) {
      console.error("Error creating user:", err);
      
      let errorMessage = "An error occurred while creating the account.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <div className="flex flex-col items-center">
          <div className="mb-8 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <img src={UserIcon} alt="User icon" className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome </h1>
            <p className="text-gray-600">Please enter your details to Creat your account</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-5">

            <InputField
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              label="UserName"
              id="username"
              name="username"
            />

            <InputField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              label="Email"
              id="email"
              name="email"
            />

            <PasswordField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              id="password"
              name="password"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white ${loading ? 'bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700'} transition duration-200 flex items-center justify-center shadow-md`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing up...
                </>
              ) : 'Sign Up'}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm text-center ${message.includes('success') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}
          {error && (
            <p className="text-red-400">{error}</p>
          )}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
