import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, TextField, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container } from '@mui/material';

const CreateIncident = () => {
  return (
    <div>
      {/* App Bar */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Incident Management
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Create Incident</Button>
          <Button color="inherit">View Incidents</Button>
          <Button color="inherit">Reports</Button>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Search Bar */}
      <Container sx={{ mt: 4 }}>
        <TextField
          label="Search Incidents"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
        />
      </Container>

      {/* Incident Summary Cards */}
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Incidents</Typography>
                <Typography variant="h4">50</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Open Incidents</Typography>
                <Typography variant="h4">15</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Closed Incidents</Typography>
                <Typography variant="h4">30</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Incidents</Typography>
                <Typography variant="h4">5</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Incident List */}
      <Container sx={{ mt: 4 }}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Incident ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>#12345</TableCell>
                <TableCell>Server Down</TableCell>
                <TableCell>High</TableCell>
                <TableCell>Open</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary">View</Button>
                  <Button variant="outlined" color="secondary" sx={{ ml: 1 }}>Close</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>#12346</TableCell>
                <TableCell>Login Issue</TableCell>
                <TableCell>Medium</TableCell>
                <TableCell>Closed</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary">View</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Container>

      {/* Action Button */}
      <Container sx={{ mt: 4 }}>
        <Button variant="contained" color="primary">Create New Incident</Button>
      </Container>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f1f1f1', marginTop: '20px' }}>
        <Typography variant="body2" color="textSecondary">
          &copy; 2024 Incident Management System. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
};

export default CreateIncident;
