import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, Grid, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const AdminSendEmailPage = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [emailHistory, setEmailHistory] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [incidentData, setIncidentData] = useState(null);

  useEffect(() => {
    // Fetch incident details (mock example)
    const fetchIncidentData = async () => {
      try {
        // Replace with your API call to fetch incident data
        const response = await axios.get('/api/incident/123'); // Example endpoint
        setIncidentData(response.data);
      } catch (error) {
        console.error('Error fetching incident data:', error);
      }
    };

    fetchIncidentData();

    // Fetch email history (mock example)
    const fetchEmailHistory = async () => {
      try {
        // Replace with your API call to fetch email history
        const response = await axios.get('/api/email/history'); // Example endpoint
        setEmailHistory(response.data);
      } catch (error) {
        console.error('Error fetching email history:', error);
      }
    };

    fetchEmailHistory();
  }, []);

  // Handle Email Send
  const handleSendEmail = async () => {
    // Validation
    if (!emailAddress || !emailContent) {
      setSnackbarMessage('Email address and content are required.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    // Prepare the data to send to Logic Apps HTTP trigger
    const emailData = {
      emailAddress: emailAddress,
      content: emailContent,
    };

    try {
      // Sending the HTTP request to the Logic Apps endpoint
      const response = await axios.post(
        'https://<your-logic-app-url>', // Replace with your Logic App's URL
        emailData
      );

      if (response.status === 200) {
        setSnackbarMessage('Email sent successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setEmailAddress('');
        setEmailContent('');
        // Optionally, re-fetch email history after successful send
        // await fetchEmailHistory();
      } else {
        setSnackbarMessage('Failed to send email.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage('Error sending email: ' + error.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
    // Populate emailContent based on the selected template
    if (event.target.value === 'completed') {
      setEmailContent(`Hello,\n\nYour incident ticket has been marked as Completed.\n\nThank you.`);
    } else if (event.target.value === 'cancelled') {
      setEmailContent(`Hello,\n\nYour incident ticket has been cancelled.\n\nThank you.`);
    } else {
      setEmailContent('');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Send Email to User (Admin)
        </Typography>

        {/* Incident Data Display */}
        {incidentData && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6">Incident Details</Typography>
            <Typography>ID: {incidentData.id}</Typography>
            <Typography>Status: {incidentData.status}</Typography>
            <Typography>Description: {incidentData.description}</Typography>
          </Box>
        )}

        <Grid container spacing={3}>
          {/* Email Address Input */}
          <Grid item xs={12}>
            <TextField
              label="Recipient Email Address"
              variant="outlined"
              fullWidth
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </Grid>

          {/* Predefined Templates */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Choose Email Template</InputLabel>
              <Select
                value={selectedTemplate}
                onChange={handleTemplateChange}
                label="Choose Email Template"
              >
                <MenuItem value="completed">Incident Completed</MenuItem>
                <MenuItem value="cancelled">Incident Cancelled</MenuItem>
                <MenuItem value="custom">Custom Email</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Email Content Input */}
          <Grid item xs={12}>
            <TextField
              label="Email Content"
              variant="outlined"
              fullWidth
              multiline
              rows={6}
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
            />
          </Grid>

          {/* Send Email Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSendEmail}
            >
              Send Email
            </Button>
          </Grid>
        </Grid>

        {/* Snackbar for Feedback */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

        {/* Email History */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6">Email History</Typography>
          <Box sx={{ mt: 2 }}>
            {emailHistory.length === 0 ? (
              <Typography>No emails sent yet.</Typography>
            ) : (
              emailHistory.map((email, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc' }}>
                  <Typography variant="body2">Sent to: {email.emailAddress}</Typography>
                  <Typography variant="body2">Subject: {email.subject}</Typography>
                  <Typography variant="body2">Status: {email.status}</Typography>
                  <Typography variant="body2">Sent on: {new Date(email.sentAt).toLocaleString()}</Typography>
                  <Typography variant="body2">Content: {email.content}</Typography>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminSendEmailPage;
