import React, { useState } from "react";
import { AppBar, Toolbar, TextField, Button, Box, Dialog, Slide, Typography } from "@mui/material";
import CreateIncident from "./CreateIncident"; // Ensure this component is created as below
import CommonAppBar from "../Components/CommonAppBar";

// Slide transition for the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function FullPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    return (
        <Box>
            {/* App Bar with Search and Add */}
            <CommonAppBar/>
            <AppBar position="static" color="default" sx={{ padding: 1 }}>
                <Toolbar>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        sx={{ flexGrow: 1, marginRight: 2 }}
                    />
                        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                            Add
                        </Button>
                </Toolbar>
            </AppBar>

            {/* Dialog for Create Incident */}
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                TransitionComponent={Transition}
                fullWidth
                maxWidth="md"
            >
                <Box sx={{ padding: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%", // Adjust if part of a larger container
                            textAlign: "center",
                            padding: 2,

                        }}
                    >
                        <Typography variant="h6" sx={{
                            marginBottom: 2,
                            fontWeight: "bold", // Makes the text bold
                            color: "#1976d2",   // Custom font color (e.g., Material UI primary blue)
                        }}>
                            Raise A Ticket
                        </Typography>
                    </Box>
                    <CreateIncident />

                </Box>
            </Dialog>
        </Box>
    );
};

export default FullPage;
