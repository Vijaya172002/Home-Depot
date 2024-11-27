import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';

const stateColors = {
  New: '#1E90FF',
  'In Progress': '#FFD700',
  'On Hold': '#FF8C00',
  Resolved: '#228B22',
  Closed: '#2F4F4F',
  Canceled: '#808080',
  Cancelled: '#B22222',
};

const stateMapping = {
  1: 'New',
  2: 'In Progress',
  3: 'On Hold',
  4: 'Resolved',
  5: 'Closed',
  6: 'Canceled',
  7: 'Cancelled',
};

const StatusPieChart = () => {
  const [stateData, setStateData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        'https://prod-03.eastus.logic.azure.com:443/workflows/48f4b84bd30846b9a6d6acbc4ac374c7/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=xKIEezLPiq9SS5BMVePK_H7odtGSrybEjRabtNmyuUY'
      )
      .then((response) => {
        const rawData = response.data; // API returns an array of objects
        const stateCounts = {};

        // Count occurrences of each state
        rawData.forEach((item) => {
          const stateId = item.State; // Extract State
          if (stateMapping[stateId]) {
            stateCounts[stateMapping[stateId]] = (stateCounts[stateMapping[stateId]] || 0) + 1;
          }
        });

        // Convert stateCounts to chart-compatible data
        const formattedData = Object.entries(stateCounts).map(([name, value]) => ({
          name,
          value,
        }));

        setStateData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ padding: 2, backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
      {/* {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <> */}
          <Box sx={{ flex: 1 }}>
          
            <PieChart width={380} height={270}>
              <Pie
                data={stateData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                labelLine={false}
                label={({ name }) => name}
              >
                {stateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={stateColors[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Box>
          <Box sx={{ padding: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'left' }}>
            {stateData.map((entry, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 0.5 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: stateColors[entry.name],
                    marginRight: 1,
                  }}
                />
                <Typography variant="body2">
                  {entry.name}: {entry.value}
                </Typography>
              </Box>
            ))}
          </Box>
        {/* </>
      )} */}
    </Box>
  );
};

export default StatusPieChart;
