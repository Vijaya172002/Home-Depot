import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import StatusPieChart from './StatusPieChart';
import CommonAppBar from '../Components/CommonAppBar';

const apiUrl = 'https://prod-03.eastus.logic.azure.com:443/workflows/48f4b84bd30846b9a6d6acbc4ac374c7/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=xKIEezLPiq9SS5BMVePK_H7odtGSrybEjRabtNmyuUY'; // Replace this with your actual URL


const xLabels = ['Inquiry', 'Software', 'Hardware', 'Network', 'Database']

var graphData = [
  { data: [0, 0, 0, 0, 0], label: "High" }, 
  { data: [0, 0, 0, 0, 0], label: "Medium" },
  { data: [0, 0, 0, 0, 0], label: "Moderate" },
  { data: [0, 0, 0, 0, 0], label: "Low" },
  { data: [0, 0, 0, 0, 0], label: "Planning" },
]


const Dashboard = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [highPriorityCount, setHighPriorityCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [recentData, setRecentData] = useState([]);


  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data; 
        
        const normalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

        const categories = ['Inquiry', 'Hardware', 'Software', 'Network', 'Database'];
        const priorities = ['High', 'Medium', 'Moderate', 'Low', 'Planning'];
        const categoryCount = {
          Inquiry: 0,
          Hardware: 0,
          Software: 0,
          Network: 0,
          Database: 0,
        };

        const categoryPriorityData = {
          Inquiry: { High: 0, Medium: 0, Moderate: 0, Low: 0, Planning: 0 },
          Hardware: { High: 0, Medium: 0, Moderate: 0, Low: 0, Planning: 0 },
          Software: { High: 0, Medium: 0, Moderate: 0, Low: 0, Planning: 0 },
          Network: { High: 0, Medium: 0, Moderate: 0, Low: 0, Planning: 0 },
          Database: { High: 0, Medium: 0, Moderate: 0, Low: 0, Planning: 0 },
        };
        const priorityCount = {
          1: 0, // High
          2: 0, // Medium
          3: 0, // Moderate
          4: 0, // Low
          5: 0, // Planning
        };


        const stateCount = {
          New: 0,
          'In Progress': 0,
          'On Hold': 0,
          Resolved: 0,
          Canceled: 0,
          Closed: 0,
        };
        const stateMapping = {
          1: 'New',
          2: 'In Progress',
          3: 'On Hold',
          4: 'Resolved',
          5: 'Closed',
          6: 'Canceled',
          7: 'Canceled',
        };

        // Count each incident's category, priority, and status
        data.forEach((ticket) => {
          categoryCount[ticket.Category] += 1;
          priorityCount[ticket.Priority] += 1;
          stateCount[ticket.State] += 1;

        });

        console.log(stateCount);  // Debugging

        setCategoryData([
          { name: 'Inquiry', value: categoryCount.Inquiry },
          { name: 'Hardware', value: categoryCount.Hardware },
          { name: 'Software', value: categoryCount.Software },
          { name: 'Network', value: categoryCount.Network },
          { name: 'Database', value: categoryCount.Database },
        ]);


        setPriorityData([
          { name: 'High', value: priorityCount[1] },
          { name: 'Medium', value: priorityCount[2] },
          { name: 'Moderate', value: priorityCount[3] },
          { name: 'Low', value: priorityCount[4] },
          { name: 'Planning', value: priorityCount[5] },
        ]);

        setStateData([
          { name: 'New', value: stateCount[1] },
          { name: 'In Progress', value: stateCount[2] },
          { name: 'On Hold', value: stateCount[3] },
          { name: 'Resolved', value: stateCount[4] },
          { name: 'Canceled', value: stateCount[5] },
          { name: 'Closed', value: stateCount[6] },
        ]);

        setTotalIncidents(data.length);
        setHighPriorityCount(priorityCount[1]);
        setInProgressCount(stateCount['In Progress']);


        setCompletedCount(response.data.filter(data => data.State === "1").length);
        setPendingCount(response.data.filter(data => data.State === "2" || data.State === "3").length);

        // Bargraph
        graphData = [
          { data: [0, 0, 0, 0, 0], label: "High" }, 
          { data: [0, 0, 0, 0, 0], label: "Medium" },
          { data: [0, 0, 0, 0, 0], label: "Moderate" },
          { data: [0, 0, 0, 0, 0], label: "Low" },
          { data: [0, 0, 0, 0, 0], label: "Planning" },
        ]

        response.data.forEach(data => {
          switch (data.Category.toLowerCase()) {
            case 'inquiry':
              graphData[0].data[data.Priority - 1]++;
              break;
            case 'software':
              graphData[1].data[data.Priority - 1]++;
              break;
            case 'hardware':
              graphData[2].data[data.Priority - 1]++;
              break;
            case 'network':
              graphData[3].data[data.Priority - 1]++;
              break;
            case 'database':
              graphData[4].data[data.Priority - 1]++;
              break;
          }

          

        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const pieColors = ['#3B5998', '#8A2BE2', '#FFD700', '#4CAF50', '#D2691E'];
  const stateColors = {
    New: '#1E90FF',
    'In Progress': '#FFD700',
    'On Hold': '#FF8C00',
    Resolved: '#228B22',
    Closed: '#2F4F4F',
    Canceled: '#808080',
    Canceled: '#B22222',
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 1, background: '#d0e7f9' }}>
      <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', textAlign: 'center', marginBottom: 1 }}>
        Dashboard
      </Typography>
      <Typography variant="h6" sx={{ color: '#34495e', textAlign: 'center', marginBottom: 4 }}>
        "Effective incident management ensures progress, not just resolution."
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ padding: 2, background: 'linear-gradient(45deg, #0d47a1, #2196f3)', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ marginBottom: 2,fontWeight: 'bold' }}>Total Incidents</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{totalIncidents}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ padding: 2, background: 'linear-gradient(45deg, #f57c00, #ff9800)', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ marginBottom: 2,fontWeight: 'bold' }}>High Priority Incidents</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{highPriorityCount}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ padding: 2, background: 'linear-gradient(45deg, #388e3c, #4caf50)', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ marginBottom: 2,fontWeight: 'bold' }}>New Tickets</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{completedCount}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ padding: 2, background: 'linear-gradient(45deg, #d32f2f, #f44336)', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ marginBottom: 2,fontWeight: 'bold' }}>In Progress Tickets</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{pendingCount}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={4} mt={0}>
        {/* Priority Distribution */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
            }}
          >

            {/* Box for the Priority PieChart */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ marginBottom: 2,fontWeight: 'bold' }}>
                Priority Distribution
              </Typography>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p: 2
              }}>

                <PieChart width={380} height={270}>
                  <Pie
                    data={priorityData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    labelLine={false}
                    label={({ name }) => name}
                  >
                    {priorityData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <Box
                  sx={{
                    padding: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'left',
                  }}
                >
                  {priorityData.map((entry, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: pieColors[index % pieColors.length],
                          marginRight: 1,
                        }}
                      />

                      <Typography variant="body2">
                        {entry.name}: {entry.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>


            </Box>
          </Paper>
        </Grid>

        {/* Status Distribution */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ marginBottom: 2,fontWeight: 'bold' }}>
                Status Distribution
              </Typography>
              {/* Using the StatusPieChart component */}
              <StatusPieChart stateData={stateData} stateColors={stateColors} />
            </Box>


          </Paper>
        </Grid>

        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            padding: 3,
            // marginTop: 7,
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            mt: 4
          }}

        >
          <Grid container spacing={3}>
            <Grid item xs={12} >
              <Typography variant="h6" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
                Category-wise Priority Distribution
              </Typography>

              <BarChart
                width={1000}
                height={400}
                series={graphData}
                xAxis={[{ data: xLabels, scaleType: 'band' }]}
              />
            </Grid>
          </Grid>
        </Box>

      </Grid>
    </Box>
    
  );
};

export default Dashboard;
