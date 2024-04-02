import './LoginSignup.css'
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import icon  from './Assets/icon.png'
import login_svg from './Assets/login_svg.svg';
import eye_icon_open from './Assets/eye_open.png';
import eye_icon_close from './Assets/eye-off.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Modal from './Model';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [loginResult, setLoginResult] = useState(null); // State for login result
  const navigate = useNavigate();

  const apiEndpoint = 'HPLSMSREP/rp-ss/UserManualApi/checkUsersManualLogin';
  
  const handleNameChange = (value) => {
    setName(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const params = {
      mobile_no: name,
      password: password,
    };

    axios
      .get(apiEndpoint, { params: params })
      .then((response) => {
        console.log('Login successful:', response.data);
        if (response.data === 'Incorrect Password') {
          setError('Login failed. Please check your credentials.');
        } else {
          setError(''); // Clear the error message
          setLoginResult(response.data);
          setShowModal(true); // Show the modal
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setError('Login failed. Please check your credentials.');
      });
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
    console.log('Navigating to ButtonView');
    login();
    navigate('/Button_view', { state: { loginResult: loginResult } }); // Navigate to the ButtonView route with loginResult
  };

  
  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <div className="sign-in-form">
            <img src={icon} className="imageLOGO" alt="Logo" />
            <h2 className="title">LOG IN</h2>
            <div className="input-field">
              <i className="fas fa-user"><FontAwesomeIcon icon={faUser} /></i>
              <input 
                type="text"
                placeholder="Username"
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"><FontAwesomeIcon icon={faLock} /></i>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              <div className="eye-icon" onClick={togglePasswordVisibility}>
                <img
                  src={showPassword ? eye_icon_open : eye_icon_close}
                  alt={showPassword ? 'Open Eye' : 'Closed Eye'}
                />
              </div>
            </div>
            <input
              type="submit"
              value="Login"
              className="btn solid"
              onClick={handleLogin}
            />

            {error && <div style={{ color: 'red' }}>{error}</div>}
          </div>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>USER MAUNAL APPLICATION</h3>
          </div>
          <img src={login_svg} className="image" alt="" />
        </div>
      </div>
      
{/* 
 {showModal && (
  <div className="modal">
    <div className="modal-content">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="green"
          width="50"
          height="50"
          style={{ marginBottom: '10px' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <p>Login Successful!!!</p>
      </div>
      <div className="modal-footer">
        <button className="close-button" onClick={closeModal}>OK</button>
      </div>
    </div>
  </div>
)} */}

{showModal && (
  <div className="modal">
    <div className="modal-content">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={require('./Assets/path_to_your_green_tick.gif')}
          alt="Green Tick"
          style={{ marginBottom: '10px', width: '50px', height: '50px' }}
        />
        <p>Login Successful !!!</p>
      </div>
      <div className="modal-footer">
        <button className="close-button" onClick={closeModal}>OK</button>
      </div>
    </div>
  </div>
)}



    </div>
  );
}

export default Login;
