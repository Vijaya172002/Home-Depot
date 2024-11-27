import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Alert, AlertTitle, FormControl, Select, MenuItem, FormLabel, Grid, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="down" ref={ref} {...props} />;
// });
function CreateIncidents({close}) {
  const [formData, setFormData] = useState({
    Category: '',
    Impact: '',
    SubCategory: '',
    Urgency: '',
    Priority: '',
    "Short Description": '',
    Description: '',
    State: '',
    "Assigned_to": '',
    "Assignment_group": '',
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [incidentNumber, setIncidentNumber] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const categoriesData = {
    Inquiry: ["Antivirus", "Email", "Internal Application"],
    Software: ["Email", "Operating System"],
    Hardware: ["CPU", "Disk", "Keyboard", "Memory", "Monitor", "Mouse"],
    Network: ["DHCP", "DNS", "IP Address", "VPN", "Wireless"],
    Database: ["DB2", "MS SQL Server", "Oracle"]
  };



  const categories = Object.keys(categoriesData);
  const [subCategories, setSubCategories] = useState([]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      Category: selectedCategory,
      SubCategory: ''
    }));
    setSubCategories(categoriesData[selectedCategory] || []);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(formData);
    axios.post('https://prod-06.eastus.logic.azure.com:443/workflows/e8aa33faf2d2411f89ec6b0411d14577/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=z-j03gVxi3CsrlXc_89JOImSHk9FlcZCY-7gBAmGkk8', formData)
      .then((response) => {
        console.log('Submitted Data:', formData);
        console.log(response);
        setIncidentNumber(response.data.Number);
        setAlertType('success');
        setAlertMessage('Ticket submitted successfully!');
        setAlertVisible(true);
        setDialogOpen(true);
      })
      .catch((error) => {
        setAlertType('error');
        setAlertMessage('An error occurred while submitting the form.');
        setAlertVisible(true);
        console.error(error);
      });
  };

  const resetForm = () => {
    setFormData({
      Category: '',
      Impact: '',
      SubCategory: '',
      Urgency: '',
      Priority: '',
      "Short Description": '',
      Description: '',
      State: '',
      "Assigned_to":'',
      "Assignment_group": '',
    });
    setIncidentNumber(null);
    setAlertVisible(false);
  };

  return (

    // <Box sx={{ backgroundColor: '#f1f2f6' }}>
    <Box sx={{ backgroundColor: '#d0e7f9' }}>

      <Box component="form" onSubmit={handleSubmit} sx={{ p: 8, maxWidth: 950, mx: 'auto', background: 'white', borderRadius: 2, position: 'relative' }}>
        <Typography
          variant="h5"
          align="center"
          sx={{ color: '#00aae7', mb: 2, fontSize: 'bold' }}
        >
          Raise a Ticket
        </Typography>
        {alertVisible && (
          <Alert
            severity={alertType}
            icon={alertType === 'success' ? <CheckIcon fontSize="inherit" /> : null}
            onClose={() => setAlertVisible(false)}
          >
            {alertType === 'error' ? (
              <>
                <AlertTitle>Error</AlertTitle>
                {alertMessage}
              </>
            ) : (
              alertMessage
            )}
          </Alert>
        )}

        {incidentNumber && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Incident Number: <span style={{ color: '#00aae7' }}>{incidentNumber}</span>
            </Typography>
          </Box>
        )}

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <FormLabel sx={{ color: '#000' }}>Category</FormLabel>
              <Select name="Category" value={formData.Category} onChange={handleCategoryChange} size="small">
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <FormLabel sx={{ color: '#000' }}>SubCategory</FormLabel>
              <Select
                name="SubCategory"
                value={formData.SubCategory}
                onChange={handleChange}
                size="small"
                disabled={!formData.Category}
              >
                {subCategories.map((subCat) => (
                  <MenuItem key={subCat} value={subCat}>{subCat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <FormLabel sx={{ color: '#000' }}>Impact</FormLabel>
              <Select name="Impact" value={formData.Impact} onChange={handleChange} size="small">
                <MenuItem value="1">1 - High</MenuItem>
                <MenuItem value="2">2 - Medium</MenuItem>
                <MenuItem value="3">3 - Moderate</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <FormLabel sx={{ color: '#000' }}>Urgency</FormLabel>
              <Select name="Urgency" value={formData.Urgency} onChange={handleChange} size="small">
                <MenuItem value="1">1 - High</MenuItem>
                <MenuItem value="2">2 - Medium</MenuItem>
                <MenuItem value="3">3 - Moderate</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <FormLabel sx={{ color: '#000' }}>Priority</FormLabel>
              <Select name="Priority" value={formData.Priority} onChange={handleChange} size="small">
                <MenuItem value="1">1 - High</MenuItem>
                <MenuItem value="2">2 - Medium</MenuItem>
                <MenuItem value="3">3 - Moderate</MenuItem>
                <MenuItem value="4">4 - Low</MenuItem>
                <MenuItem value="5">5 - Planning</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <FormLabel sx={{ color: '#000' }}>Status</FormLabel>
              <Select name="State" value={formData.State} onChange={handleChange} size="small">
                <MenuItem value="1">1 - New</MenuItem>
                <MenuItem value="2">2 - In Progress</MenuItem>
                <MenuItem value="3">3 - On Hold</MenuItem>
                <MenuItem value="4">4 - Resolved</MenuItem>
                <MenuItem value="5">5 - Closed</MenuItem>
                <MenuItem value="6">6 - Cancelled</MenuItem>
                {/* <MenuItem value="7">Cancelled</MenuItem> */}

              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ color: '#000' }}>Assignment Group</Typography>
            <TextField
              fullWidth
              name="Assignment_group"
              value={formData.Assignment_group}
              onChange={handleChange}
              size="small"
             
            />
          </Grid>
          <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ color: '#000' }}>Assigned To</Typography>
            <TextField
              fullWidth
              name="Assigned_to"
              value={formData.Assigned_to}
              onChange={handleChange}
              size="small"
              
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ color: '#000' }}>Short Description  <span style={{ color: 'red' }}>*</span></Typography>
            <TextField
              fullWidth
              name="Short Description"
              value={formData["Short Description"]}
              onChange={handleChange}
              size="small"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ color: '#000' }}>Description</Typography>
            <TextField
              fullWidth
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              multiline
              rows={3}
              size="small"
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
          {/* <Button variant="outlined" color="secondary" onClick={close}>Cancel</Button> */}
          <Button variant="outlined" color="secondary" onClick={() => { resetForm(); close()}}>Cancel</Button>
        </Box>
      </Box>

      <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 2,
          backgroundColor: "#fff", // Light cyan for the background
          color: "#000", // Dark blue for the text
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", color: "green" }}>
        Success!
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center", color:"black" }}>
          Ticket submitted successfully! Incident Number: <b>{incidentNumber}</b>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={() => setDialogOpen(false)}
          autoFocus
          sx={{
            backgroundColor: "#0288D1", // Blue button color
            color: "white", // White text for button
            '&:hover': {
              backgroundColor: "#0277BD", // Darker blue on hover
            },
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
}

export default CreateIncidents;
