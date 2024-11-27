// import React from "react";
// import { Box, Grid, Typography, Paper } from "@mui/material";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { BarChart } from "@mui/x-charts/BarChart";

// const StatisticsPage = () => {
//   // Dummy Data
//   const incidentsData = {
//     totalCount: 150,
//     highPriority: 45,
//     highUrgency: 30,
//     highImpact: 25,
//   };

//   const pieData = [
//     { id: 0, label: "High", value: 45, color: "#FF6384" },
//     { id: 1, label: "Medium", value: 35, color: "#36A2EB" },
//     { id: 2, label: "Moderate", value: 30, color: "#FFCE56" },
//     { id: 3, label: "Low", value: 25, color: "#4BC0C0" },
//     { id: 4, label: "Planning", value: 15, color: "#9966FF" },
//   ];

//   const barData = [
//     { category: "Inquiry", High: 10, Medium: 8, Moderate: 7, Low: 5, Planning: 4 },
//     { category: "Software", High: 15, Medium: 12, Moderate: 9, Low: 6, Planning: 5 },
//     { category: "Hardware", High: 8, Medium: 10, Moderate: 6, Low: 4, Planning: 3 },
//     { category: "Network", High: 5, Medium: 6, Moderate: 4, Low: 3, Planning: 2 },
//     { category: "Database", High: 7, Medium: 5, Moderate: 3, Low: 2, Planning: 1 },
//   ];

//   const recentData = [
//     { id: 1, category: "Software", priority: "High", description: "Bug fix needed" },
//     { id: 2, category: "Network", priority: "Medium", description: "Slow connection" },
//     { id: 3, category: "Hardware", priority: "Low", description: "Replace old mouse" },
//   ];

//   return (
//     <Box p={3}>
//       {/* Statistic Boxes */}
//       <Grid container spacing={2} mb={3}>
//         {[
//           { label: "Total Count of Incidents", value: incidentsData.totalCount },
//           { label: "High Priority Incidents", value: incidentsData.highPriority },
//           { label: "High Urgency Incidents", value: incidentsData.highUrgency },
//           { label: "High Impact Incidents", value: incidentsData.highImpact },
//         ].map((item, index) => (
//           <Grid item xs={3} key={index}>
//             <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
//               <Typography variant="h6">{item.label}</Typography>
//               <Typography variant="h4" color="primary">
//                 {item.value}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Charts and Recent Data */}
//       <Grid container spacing={2}>
//         {/* Left Charts */}
//         <Grid item xs={8}>
//           <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Priority Distribution
//             </Typography>
//             <PieChart
//               data={pieData}
//               width={400}
//               height={300}
//               series={[
//                 {
//                   dataKey: "value",
//                   color: (datum) => datum.color,
//                   label: (datum) => datum.label,
//                 },
//               ]}
//             />
//           </Paper>
//           <Paper elevation={3} sx={{ padding: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Category-wise Priorities
//             </Typography>
//             <BarChart
//               data={barData}
//               series={[
//                 { dataKey: "High", label: "High", color: "#FF6384" },
//                 { dataKey: "Medium", label: "Medium", color: "#36A2EB" },
//                 { dataKey: "Moderate", label: "Moderate", color: "#FFCE56" },
//                 { dataKey: "Low", label: "Low", color: "#4BC0C0" },
//                 { dataKey: "Planning", label: "Planning", color: "#9966FF" },
//               ]}
//               xAxis={[
//                 { dataKey: "category", scaleType: "band", label: "Category" },
//               ]}
//               height={300}
//               width={400}
//             />
//           </Paper>
//         </Grid>

//         {/* Right Recent Data */}
//         <Grid item xs={4}>
//           <Paper elevation={3} sx={{ padding: 2, height: "100%" }}>
//             <Typography variant="h6" gutterBottom>
//               Recent Data
//             </Typography>
//             {recentData.map((item) => (
//               <Box key={item.id} mb={2} p={2} borderBottom="1px solid #ddd">
//                 <Typography variant="subtitle1">
//                   <strong>Category:</strong> {item.category}
//                 </Typography>
//                 <Typography variant="subtitle2" color="text.secondary">
//                   <strong>Priority:</strong> {item.priority}
//                 </Typography>
//                 <Typography>{item.description}</Typography>
//               </Box>
//             ))}
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default StatisticsPage;





import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

// Mapping Constants
const impactMap = {
  1: "1 - High",
  2: "2 - Medium",
  3: "3 - Low",
};

const urgencyMap = {
  1: "1 - High",
  2: "2 - Medium",
  3: "3 - Low",
};

const priorityMap = {
  1: "1 - High",
  2: "2 - Medium",
  3: "3 - Moderate",
  4: "4 - Low",
  5: "5 - Planning",
};

const StatisticsPage = () => {
  const [incidentsData, setIncidentsData] = useState({
    totalCount: 0,
    priority1Count: 0,
    completedStatusCount: 0,
  });

  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [recentData, setRecentData] = useState([]);

  useEffect(() => {
    // Fetch data using Axios
    axios
      .get("https://prod-03.eastus.logic.azure.com:443/workflows/48f4b84bd30846b9a6d6acbc4ac374c7/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=xKIEezLPiq9SS5BMVePK_H7odtGSrybEjRabtNmyuUY") // Replace with your actual API URL
      .then((response) => {
        const data = response.data;

        // Process incidents data
        const totalCount = data.incidentsData.length;
        const priority1Count = data.incidentsData.filter(
          (incident) => incident.Priority === "1"
        ).length;
        const completedStatusCount = data.incidentsData.filter(
          (incident) => incident.Status === "5"
        ).length;

        // Set incidents data counts
        setIncidentsData({
          totalCount,
          priority1Count,
          completedStatusCount,
        });

        // Set pie and bar chart data
        setPieData(data.pieData);
        setBarData(data.barData);

        // Map and transform recent data
        setRecentData(
          data.incidentsData.map((item) => ({
            ...item,
            Impact: impactMap[item.Impact],
            Urgency: urgencyMap[item.Urgency],
            Priority: priorityMap[item.Priority],
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Box p={3}>
      {/* Statistic Boxes */}
      <Grid container spacing={2} mb={3}>
        {[
          { label: "Total Count of Incidents", value: incidentsData.totalCount },
          {
            label: "Priority 1 - High Incidents",
            value: incidentsData.priority1Count,
          },
          {
            label: "Status 5 - Completed Incidents",
            value: incidentsData.completedStatusCount,
          },
        ].map((item, index) => (
          <Grid item xs={3} key={index}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6">{item.label}</Typography>
              <Typography variant="h4" color="primary">
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts and Recent Data */}
      <Grid container spacing={2}>
        {/* Left Charts */}
        <Grid item xs={8}>
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom>
              Priority Distribution
            </Typography>
            {/* <PieChart
              data={pieData.length > 0 ? pieData : []} // Ensure there is data to render
              width={400}
              height={300}
              series={[
                {
                  dataKey: "value",  // Replace with correct dataKey for your data
                  color: (datum) => datum.color,
                  label: (datum) => datum.label,
                },
              ]}
            /> */}
          </Paper>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Category-wise Priorities
            </Typography>
            <BarChart
              data={barData.length > 0 ? barData : []} // Ensure data is valid before passing it
              series={[
                { dataKey: "High", label: "High", color: "#FF6384" },
                { dataKey: "Medium", label: "Medium", color: "#36A2EB" },
                { dataKey: "Moderate", label: "Moderate", color: "#FFCE56" },
                { dataKey: "Low", label: "Low", color: "#4BC0C0" },
                { dataKey: "Planning", label: "Planning", color: "#9966FF" },
              ]}
              xAxis={[{ dataKey: "Category", scaleType: "band", label: "Category" }]} // Ensure this matches the data structure
              height={300}
              width={400}
            />
          </Paper>
        </Grid>

        {/* Right Recent Data */}
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ padding: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Recent Data
            </Typography>
            {recentData.map((item) => (
              <Box key={item.SystemID} mb={2} p={2} borderBottom="1px solid #ddd">
                <Typography variant="subtitle1">
                  <strong>Category:</strong> {item.Category}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  <strong>Priority:</strong> {item.Priority}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  <strong>Impact:</strong> {item.Impact}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  <strong>Urgency:</strong> {item.Urgency}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Status:</strong> {item.Status}
                </Typography>
                <Typography>{item.Description}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticsPage;


