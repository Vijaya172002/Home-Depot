import React from "react";
import { Box, Grid, Card, CardContent, Typography, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StatsCard from "./StatsCard";

const Dashboard = () => {
  return (
    <Box sx={{ padding: 4 }}>
      {/* Header Section */}
      <Typography variant="h4" gutterBottom>
        Incident Management Dashboard
      </Typography>

      {/* Filter/Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          sx={{ width: "300px" }}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Total Incidents" value={54} color="#2196f3" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Open Incidents" value={20} color="#ff9800" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="High Priority" value={10} color="#f44336" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Resolved Incidents" value={24} color="#4caf50" />
        </Grid>
      </Grid>

      {/* Status Distribution Section */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Incident Status Distribution
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
          <Box
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "#4caf50",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle1" color="white">
              Closed: 12
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "#ff9800",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle1" color="white">
              On Hold: 7
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "#2196f3",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle1" color="white">
              In Progress: 15
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "#9c27b0",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle1" color="white">
              Completed: 20
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
