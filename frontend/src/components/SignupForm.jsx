import React, { useState } from "react";
import { registerUser } from "../services/api";

const SignupForm = ({ onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      setSuccess("");
      setLoading(false);
      return;
    }
    try {
      const userData = await registerUser(formData);
      setSuccess("User registered successfully!");
      setFormData({ username: "", email: "", password: "" });
      setTimeout(() => {
        if (onSignupSuccess) {
          onSignupSuccess(userData);
        }
      }, 1000);
    } catch (e) {
      setError(e.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignupForm;
