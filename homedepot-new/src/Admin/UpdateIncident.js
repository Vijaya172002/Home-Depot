import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Button, Grid, TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate,  } from 'react-router-dom'; // for navigation

const TicketPage = () => {
    // const location = useLocation();
    const navigate = useNavigate();
    const selectedTicket = navigate.state?.selectedTicket;
    
    // Initialize State
    const [isEditing, setIsEditing] = useState(false);
    const [shortDescription, setShortDescription] = useState(selectedTicket.shortDescription);
    const [description, setDescription] = useState(selectedTicket.description);
    const [category, setCategory] = useState(selectedTicket.category);
    const [subCategory, setSubCategory] = useState(selectedTicket.subCategory);
    const [priority, setPriority] = useState(selectedTicket.priority);
    const [impact, setImpact] = useState(selectedTicket.impact);
    const [urgency, setUrgency] = useState(selectedTicket.urgency);
    const [status, setStatus] = useState(selectedTicket.status);

    const ticketHistory = selectedTicket.ticketHistory;
    const assignedEmail = selectedTicket.assignedEmail;
    const isAssigned = selectedTicket.isAssigned;

    // const navigate = useNavigate();

    const categories = ['Inquiry', 'Software', 'Hardware', 'Network', 'Database'];
    const subCategories = {
        Inquiry: ['General Inquiry', 'Request for Information'],
        Software: ['Bug Report', 'Feature Request', 'Installation Issue'],
        Hardware: ['Hardware Failure', 'Device Setup'],
        Network: ['Connection Issue', 'Network Configuration'],
        Database: ['Database Query', 'Data Integrity', 'Backup Issue'],
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setSubCategory(''); // Reset subcategory when category changes
    };

    const handleUpdate = async () => {
        const updatedData = {
            shortDescription,
            description,
            category,
            subCategory,
            priority,
            impact,
            urgency,
        };

        try {
            const response = await axios.put(`https://your-api-endpoint.com/tickets/update/${selectedTicket.id}`, updatedData);
            console.log("Updated successfully:", response.data);
            // After update, navigate back to Incidents page
            navigate("/incidents");
        } catch (error) {
            console.error("Error updating ticket:", error);
        }
    };

    return (
        <Box display="flex" gap={4} p={6}>
            {/* Left Column */}
            <Box width="35%" display="flex" flexDirection="column" gap={2}>
                {/* Box 1: Assigned To */}
                <Box
                    sx={{
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        padding: 3,
                        backgroundColor: "#f9f9f9",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // border shadow added
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#007bff" }}>Assigned To</Typography>
                    {isAssigned ? (
                        <>
                            <Avatar
                                sx={{
                                    bgcolor: "#007bff",
                                    width: 95,
                                    height: 95,
                                    mb: 2,
                                    fontSize: "4rem", // Increase the font size of the letter in avatar
                                }}
                            >
                                {assignedEmail.charAt(0)}
                            </Avatar>
                            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                                {assignedEmail.split('@')[0]} {/* Display email until '@' */}
                            </Typography>
                        </>
                    ) : (
                        <Typography>Not yet assigned</Typography>
                    )}
                </Box>

                {/* Box 2: Ticket History */}
                <Box
                    sx={{
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        padding: 3,
                        backgroundColor: "#f1f8ff",
                        maxHeight: 300,
                        overflowY: "auto",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // border shadow added
                        '&:hover': { // add hover effect for visual enhancement
                            boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
                        },
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2, textAlign: "center", fontWeight: "bold", color: "#007bff" }} >
                        Ticket History
                    </Typography>
                    {ticketHistory.map((item, index) => (
                        <Typography key={index} sx={{ mb: 1, color: "#000", fontSize: "1rem" }}>
                            {item}
                        </Typography>
                    ))}
                </Box>
            </Box>

            {/* Right Column */}
            <Box
                width="65%"
                sx={{
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    padding: 3,
                    backgroundColor: "#f9f9f9",
                }}
            >
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box
                        sx={{
                            backgroundColor: "#d9f0fc",
                            padding: "6px 12px",
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6">#{selectedTicket.id}</Typography>
                    </Box>

                    {status === "Completed" ? (
                        <Box
                            sx={{
                                backgroundColor: "#d4edda",
                                color: "#155724",
                                padding: "6px 12px",
                                borderRadius: 2,
                            }}
                        >
                            Ticket Solved
                        </Box>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={isEditing && status !== "Completed" ? handleUpdate : () => setIsEditing(true)}
                            disabled={status === "Completed"} // Disable if status is "Completed"
                        >
                            {isEditing ? "Save" : "Update"}
                        </Button>
                    )}
                </Box>

                {/* Editable Fields */}
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Short Description</Typography>
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    value={shortDescription}
                                    onChange={(e) => setShortDescription(e.target.value)}
                                    sx={{ mb: 2 }}
                                    disabled={status === 'Completed'}
                                />
                            ) : (
                                <Typography sx={{ mb: 2 }}>{shortDescription}</Typography>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Description</Typography>
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    sx={{ mb: 2 }}
                                    disabled={status === 'Completed'}
                                />
                            ) : (
                                <Typography sx={{ mb: 2 }}>{description}</Typography>
                            )}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Category</Typography>
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    select
                                    value={category}
                                    onChange={handleCategoryChange}
                                    sx={{ mt: 1 }}
                                    disabled={status === 'Completed'}
                                >
                                    {categories.map((category, index) => (
                                        <MenuItem key={index} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            ) : (
                                <Box
                                    sx={{
                                        backgroundColor: "#007bff",
                                        color: "#fff",
                                        textAlign: "center",
                                        borderRadius: 1,
                                        padding: 1,
                                        mt: 1,
                                    }}
                                >
                                    {category}
                                </Box>
                            )}
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle2">SubCategory</Typography>
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    select
                                    value={subCategory}
                                    onChange={(e) => setSubCategory(e.target.value)}
                                    sx={{ mt: 1 }}
                                    disabled={status === 'Completed'}
                                >
                                    {subCategories[category]?.map((subCat, index) => (
                                        <MenuItem key={index} value={subCat}>
                                            {subCat}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            ) : (
                                <Box
                                    sx={{
                                        backgroundColor: "#17a2b8",
                                        color: "#fff",
                                        textAlign: "center",
                                        borderRadius: 1,
                                        padding: 1,
                                        mt: 1,
                                    }}
                                >
                                    {subCategory}
                                </Box>
                            )}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography variant="subtitle2">Priority</Typography>
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    sx={{ mt: 1 }}
                                    disabled={status === 'Completed'}
                                >
                                    {[1, 2, 3, 4, 5].map((priorityLevel) => (
                                        <MenuItem key={priorityLevel} value={priorityLevel}>
                                            {priorityLevel === 1 ? 'High' : priorityLevel === 2 ? 'Medium' : priorityLevel === 3 ? 'Moderate' : priorityLevel === 4 ? 'Low' : 'Planning'}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            ) : (
                                <Box
                                    sx={{
                                        backgroundColor: "#28a745",
                                        color: "#fff",
                                        textAlign: "center",
                                        borderRadius: 1,
                                        padding: 1,
                                        mt: 1,
                                    }}
                                >
                                    {priority === 1 ? 'High' : priority === 2 ? 'Medium' : priority === 3 ? 'Moderate' : priority === 4 ? 'Low' : 'Planning'}
                                </Box>
                            )}
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="subtitle2">Impact</Typography>
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    select
                                    value={impact}
                                    onChange={(e) => setImpact(e.target.value)}
                                    sx={{ mt: 1 }}
                                    disabled={status === 'Completed'}
                                >
                                    {[1, 2, 3].map((impactLevel) => (
                                        <MenuItem key={impactLevel} value={impactLevel}>
                                            {impactLevel === 1 ? 'High' : impactLevel === 2 ? 'Medium' : 'Low'}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            ) : (
                                <Box
                                    sx={{
                                        backgroundColor: "#ffc107",
                                        color: "#fff",
                                        textAlign: "center",
                                        borderRadius: 1,
                                        padding: 1,
                                        mt: 1,
                                    }}
                                >
                                    {impact === 1 ? 'High' : impact === 2 ? 'Medium' : 'Low'}
                                </Box>
                            )}
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="subtitle2">Urgency</Typography>
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    select
                                    value={urgency}
                                    onChange={(e) => setUrgency(e.target.value)}
                                    sx={{ mt: 1 }}
                                    disabled={status === 'Completed'}
                                >
                                    {[1, 2, 3].map((urgencyLevel) => (
                                        <MenuItem key={urgencyLevel} value={urgencyLevel}>
                                            {urgencyLevel === 1 ? 'High' : urgencyLevel === 2 ? 'Medium' : 'Low'}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            ) : (
                                <Box
                                    sx={{
                                        backgroundColor: "#fd7e14",
                                        color: "#fff",
                                        textAlign: "center",
                                        borderRadius: 1,
                                        padding: 1,
                                        mt: 1,
                                    }}
                                >
                                    {urgency === 1 ? 'High' : urgency === 2 ? 'Medium' : 'Low'}
                                </Box>
                            )}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">Status</Typography>
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    sx={{ mt: 1 }}
                                    disabled={status === 'Completed'}
                                >
                                    {['New', 'In Progress', 'On Hold', 'Resolved', 'Completed', 'Cancelled', 'Closed'].map((statusOption) => (
                                        <MenuItem key={statusOption} value={statusOption}>
                                            {statusOption}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            ) : (
                                <Box
                                    sx={{
                                        backgroundColor: "#6c757d",
                                        color: "#fff",
                                        textAlign: "center",
                                        borderRadius: 1,
                                        padding: 1,
                                        mt: 1,
                                    }}
                                >
                                    {status}
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default TicketPage;
