import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {

    console.log(formData)
    event.preventDefault();
    try {
      const response = await fetch('https://merd-api.merakilearn.org/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: formData.user_id,
          password: formData.password,
        }),
      });

      if (response.ok) {
        console.log('user logged in successfully');
        navigate(`/dashboard`);
      } else {
        try {
          const errorData = await response.json();
          console.log('error: ' + errorData.error);
        } catch (jsonError) {
          const errorText = await response.text();
          console.log('error: ' + errorText);
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      console.log('An error occurred during login.');
    }
  };

  return (
    <div className="login-form">
      <div className="login-header">
        <h2>Login</h2>
        <p className="subtitle">Connect with your family and friends</p>
      </div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <div>
        <p>
          <a href="$">Forgot Password?</a>
        </p>
        <p>
          Don't have an account? <a href="/signup">Sign Up Here</a>
        </p>
      </div>
</div>

  );
};

export default LoginForm;
