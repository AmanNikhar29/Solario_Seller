import React, { useState } from 'react';
import '../styles/styles.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    let isValid = true;

    if (!email && !password) {
      alert('Credentials are required');
      isValid = false;
      setEmailError('');
      setPasswordError('');
    } else if (!email) {
      alert('Email is required');
      isValid = false;
      setEmailError('');
    } else if (!password) {
      alert('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isValid) return;

    try {
      const response = await fetch('http://localhost:5000/api/seller/login-seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('sellerId', data.sellerId);
        console.log('Login successful:', data);

        // Show success toast
        toast.success('Login successful! Redirecting...', {
          autoClose: 2500, // 5 seconds
          theme: 'colored',
          position: 'top-center',
          // Close after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className:'custom-toast'
        });

        // Store seller details in local storage
        localStorage.setItem('seller', JSON.stringify(data.seller));
        localStorage.setItem('sellerId', data.sellerId);
        console.log(data.sellerId);

        // Navigate to the seller dashboard after a delay
        setTimeout(() => {
          navigate('/Seller');
        }, 2500); // Redirect after 3 seconds
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      setApiError('Server error. Please try again later.');
      console.error('Error:', error);
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password clicked');
    navigate('/forgot-password');
  };

  return (
    <div className="login-backgroundLogin">
      {/* Toast Container */}
      <ToastContainer />

      <div className="login-contentLogin animate-textLogin">
        <div className="welcome-textLogin animate-textLogin">
          <h1>Welcome Back!</h1>
        </div>
        <div className="AccountLogin animate-textLogin">
          <p>
            Don't have an account? <a href="/Register" className="a">
              Signup
            </a>
          </p>
        </div>
        <div className="form-containerLogin animate-textLogin">
          <div className="input-fieldLogin">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {emailError && <span className="error-text">{emailError}</span>}
          </div>
          <div className="input-fieldLogin ">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <span
              className="password-toggle1Login"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
            {passwordError && <span className="error-text">{passwordError}</span>}
          </div>
          <div className="forgot-passwordLogin animate-textLogin">
            <span onClick={handleForgotPassword}>Forgot Password?</span>
          </div>
          <button className="login-buttonLogin animate-textLogin" onClick={handleLogin}>
            Login
          </button>
          <div className="or-signupLogin animate-textLogin">
            <span>| Or sign up with |</span>
          </div>
          <div className="social-loginLogin">
            <div className="social-iconLogin">
              <img
                src="https://i.pinimg.com/236x/62/ac/e9/62ace9157befeb6182007eff1ad0dfc8.jpg"
                alt="Social Login"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;