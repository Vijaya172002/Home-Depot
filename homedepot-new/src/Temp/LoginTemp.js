import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Replace this with your Logic App POST URL
  const LOGIC_APP_URL = "https://prod-74.eastus.logic.azure.com:443/workflows/cc4a98ded38a42b6a5db647cef54bcfe/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=DdQr2ilPdrhmeeiwK0UvxUBk2Tjb0vf_SEoldXV6jIA";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    const payload = {
      email: email,
      password: password,
    };
  
    console.log("Sending Data:", payload);
  
    try {
      const response = await axios.post(LOGIC_APP_URL, payload, {
        headers: {
          Authorization: `Bearer <your-access-token>`, // Replace with a valid OAuth 2.0 token
          "Content-Type": "application/json",
        },
      });
  
      console.log("Response from Logic App:", response.data);
    } catch (err) {
      if (err.response) {
        console.error("Error Response from Server:", err.response);
        setError(err.response.data.message || "Error occurred on server side.");
      } else if (err.request) {
        console.error("No Response Received:", err.request);
        setError("No response received from server.");
      } else {
        console.error("Connection Error:", err.message);
        setError("Failed to connect to Logic App.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
