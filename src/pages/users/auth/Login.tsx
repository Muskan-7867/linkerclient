import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Call the backend login API
      const response = await axios.post('http://localhost:8000/api/v1/user/login', {
        email: username, 
        password,
      });

      // Store the token in local storage
      localStorage.setItem('token', response.data.accesstoken);
      setMessage('Login successful!');
      navigate("/");
    } catch (err) {
      console.error("Error creating user:", err);
   
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center gap-[10%]  min-h-screen">
      <div className="bg-white bg-opacity-20 shadow-lg p-8 rounded-lg w-full max-w-sm">
        <h2 className="mb-6 font-bold text-2xl text-white text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block font-medium text-left text-white text-lg"
            >
              Email
            </label>
            <input
              type="email"
              id="username"
              name="username"
              placeholder="Enter your email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block border-gray-300 mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 w-full focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-medium text-left text-white text-lg"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block border-gray-300 mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 w-full focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 py-2 rounded-md w-full text-white transition duration-200"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {message && (
            <p className="mt-4 text-center text-whitetext-sm">{message}</p>
          )}
          <p className="mt-4 text-center text-white text-sm">
            Don't have an account?{' '}
            <a href="/signup" className="text-white hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
      <img
        src="./images/login.png"
        alt="Login illustration"
        className="lg:block hidden lg:w-[450px] lg:h-[450px]"
      />
    </div>
  );
};

export default Login;
