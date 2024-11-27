import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, FormLabel, Chip, Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem, Paper, Alert, AlertTitle, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, TableSortLabel, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';

import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import CreateIncidents from '../User/CreateIncident';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


const Incidents = () => {

    const [openDialog, setOpenDialog] = React.useState(false);

    const dialogOpen = () => {
        setOpenDialog(true);
    };

    const dialogClose = () => {
        setOpenDialog(false);
    };

    const [incidents, setIncidents] = useState([]);

    const [searchIncidents, setSearchIncidents] = useState([]);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteTechNumber, setDeleteTechNumber] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentIncident, setCurrentIncident] = useState({
        Number: '',
        Category: '',
        Impact: '',
        SubCategory: '',
        Urgency: '',
        Priority: '',
        SystemID: '',
        "Short Description": '',
        Description: '',
        State: '',
        "Assigned_to": '',
        "Assignment_group": '',

    });

    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState('success')

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('Number'); // Column to sort by
    const [searchQuery, setSearchQuery] = useState(''); // Priority for search query


    const categories = ['inquiry', 'software', 'hardware', 'network', 'database', ''];
    const subCategories = {
        "inquiry": ["antivirus", "email", "internal application"],
        "software": ["email", "operating system"],
        "hardware": ["cpu", "disk", "keyboard", "memory", "monitor", "mouse"],
        "network": ["dhcp", "dns", "ip address", "vpn", "wireless"],
        "database": ["db2", "ms sql server", "oracle"],
        "": []
    };

    const impactMap = {
        1: '1 - High',
        2: '2 - Medium',
        3: '3 - Low',
    };
    const urgencyMap = {
        1: '1 - High',
        2: '2 - Medium',
        3: '3 - Low',
    };
    const priorityMap = {
        1: '1 - High',
        2: '2 - Medium',
        3: '3 - Moderate',
        4: '4 - Low',
        5: '5 - Planning'
    };

    const stateMap = {
        1: { label: '1 - New', color: 'info' },           // info color
        2: { label: '2 - In Progress', color: 'secondary' }, // secondary color
        3: { label: '3 - On Hold', color: 'warning' },      // warning color
        4: { label: '4 - Resolved', color: 'success' },     // success color
        5: { label: '5 - Closed', color: 'primary' },       // you can choose any color, 'primary' is used here
        6: { label: '6 - Cancelled', color: 'error' },      // error color
        7: { label: '7 - Cancelled', color: 'error' }       // error color
    };

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const incidentResponse = await axios.get('https://prod-03.eastus.logic.azure.com:443/workflows/48f4b84bd30846b9a6d6acbc4ac374c7/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=xKIEezLPiq9SS5BMVePK_H7odtGSrybEjRabtNmyuUY');
                setIncidents(incidentResponse.data);
                setSearchIncidents(incidentResponse.data);
            } catch (error) {
                console.error('There was an error fetching the Incidents!', error);
                setError(error);
            }
            setLoading(false);
            setTimeout(() => {
                setLoading(false);
            }, 2000);

        };
        fetchIncidents();

    }, []);


    const handleSort = (property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const sortedIncidents = [...searchIncidents].sort((a, b) => {
        const valueA = a[orderBy] || '';
        const valueB = b[orderBy] || '';
        if (orderBy === 'Number') {
            const numA = parseInt(valueA.match(/\d+/), 10);
            const numB = parseInt(valueB.match(/\d+/), 10);
            return order === 'desc' ? numB - numA : numA - numB;
        }

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return order === 'desc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
            return order === 'desc' ? (valueA > valueB ? 1 : -1) : (valueB > valueA ? 1 : -1);
        }
    });

    // const filteredIncidents = sortedIncidents.filter((incident) =>
    //     (incident.Number && typeof incident.Number === 'string' &&
    //         incident.Number.toLowerCase().includes(searchQuery.toLowerCase())) ||
    //     (incident.Category && typeof incident.Category === 'string' &&
    //         incident.Category.toLowerCase().includes(searchQuery.toLowerCase())) ||
    //     (incident.Impact && typeof incident.Impact === 'string' &&
    //         incident.Impact.toLowerCase().includes(searchQuery.toLowerCase())) ||
    //     (incident.SubCategory && typeof incident.SubCategory === 'string' &&
    //         incident.SubCategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
    //     (incident.Urgency && typeof incident.Urgency === 'string' &&
    //         incident.Urgency.toLowerCase().includes(searchQuery.toLowerCase())) ||
    //     (incident.Priority && typeof incident.Priority === 'string' &&
    //         incident.Priority.toLowerCase().includes(searchQuery.toLowerCase())) ||
    //     (incident.Description && typeof incident.Description === 'string' &&
    //         incident.Description.toLowerCase().includes(searchQuery.toLowerCase()))
    // );

    const filteredIncidents = searchQuery
        ? sortedIncidents.filter((incident) => {
            const fieldsToSearch = [
                String(incident.Number || ''),
                String(incident.Category || ''),
                String(incident.SubCategory || ''),
                String(incident.Impact || ''),
                String(incident.Urgency || ''),
                String(incident.Priority || ''),
                String(incident.State || ''),
                String(incident.Assignment_group || ''),
                String(incident.Assigned_to || ''),
                String(incident.Description || ''),
                String(incident["Short Description"] || '')

            ];

            return fieldsToSearch.some((field) =>
                field.toLowerCase().includes(searchQuery.toLowerCase())
            );
        })
        : sortedIncidents;

    const handleUpdate = () => {
        const updateData = {
            Number: currentIncident.Number,
            Category: currentIncident.Category,
            SubCategory: currentIncident.SubCategory,
            Impact: currentIncident.Impact,
            Urgency: currentIncident.Urgency,
            Priority: currentIncident.Priority,
            State: currentIncident.State,
            Assignment_group: currentIncident.Assignment_group,
            Assigned_to: currentIncident.Assigned_to,
            SystemID: currentIncident.SystemID,
            "Short Description": currentIncident["Short Description"],
            Description: currentIncident.Description,
            sys_id: currentIncident.SystemID
        }

        axios
            .post('https://prod-83.eastus.logic.azure.com:443/workflows/4cd04bbf7ace4ea3bea34f78ca1e8f54/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=-pt3sOAJCP2yUZ55dvLVQiizYp6TLo_X4Ll7LPukTbk', updateData)

            .then((response) => {
                console.log('Incident updated successfully', response.data);

                console.log('Updated data', updateData);
                setOpen(false);
                setAlertMessage('Incident updated successfully!', updateData.Number);
                setAlertType('success');
                setAlertVisible(true);
                setTimeout(() => {
                    setAlertVisible(false);
                }, 5000);
            })
            .catch((error) => {
                console.error('Error updating ticket:', error);
                setAlertMessage('Error updating the incident.');
                setAlertType('error');
                setAlertVisible(true);
                setTimeout(() => {
                    setAlertVisible(false);
                }, 5000);
            });
    };
    const handleCancel = () => {
        setAlertMessage('Cancelled Updating incident.');
        setOpen(false);
        setAlertType('error'); // Set alert type to error
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 5000);
    };


    const handleDelete = (Number) => {

        axios.delete(`https://prod-59.eastus.logic.azure.com:443/workflows/66e1be1113fa4b96b6fe4097f8f48a71/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=IXa-qQ1XDgOqG4Mp5UqNzlnCxkHTJziWanCoibZWVZw`)
            .then(response => {
                setIncidents(Incidents.filter(tech => tech.Number !== Number));
                setSearchIncidents(Incidents.filter(tech => tech.Number !== Number));
            })
            .catch(error => {
                console.error('There was an error deleting the incident!', error);
                setError(error);
            });
        setConfirmOpen(false);
    };


    const handleEditClick = (incident) => {
        setCurrentIncident(incident); // Set the current incident you want to edit
        setOpen(true); // Open the dialog
    };


    const handleChange = (e) => {
        const { Number, value } = e.target;
        setCurrentIncident({ ...currentIncident, [Number]: value });
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const confirmDelete = (Number) => {
        setDeleteTechNumber(Number);
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
    };

    const handleConfirmYes = () => {
        handleDelete(deleteTechNumber);
    };

    const searching = (e) => {
        setSearchQuery(e.target.value);
        setSearchIncidents(incidents.filter(data => (
            data.Number.toLowerCase().includes(e.target.value) ||
            data.Category.toLowerCase().includes(e.target.value) ||
            data.SubCategory.toLowerCase().includes(e.target.value) ||
            data.State.toLowerCase().includes(e.target.value)
        )));
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <img src="https://helpdesk.miraclesoft.com/assets/images/Loader.gif" alt="Loading..." style={{ width: '100px' }} />
                <p>Loading data, please wait...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                color: 'red',
                fontWeight: 'bold'
            }}>
                <p>There was an error loading the data: {error.message}</p>
            </div>
        )
    }
    return (
        <Box sx={{ flexGrow: 1, padding: 1, background: '#d0e7f9' }}>
            <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', textAlign: 'center', marginBottom: 1 }}>
                Manage Incidents
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
                <div style={{ display: 'flex', flexGrow: 1 }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchQuery}
                        onChange={searching}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end">
                                        <SearchIcon sx={{ color: '#00aae7' }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        style={{ width: '100%' }}
                    />
                </div>

                <Button
                    variant="contained"
                    onClick={dialogOpen}
                    sx={{
                        backgroundColor: '#00aae7',
                        color: '#fff',
                        marginLeft: 'auto',
                        '&:hover': {
                            backgroundColor: '#2368a0',
                        },
                    }}
                >
                    Create Incident
                </Button>
            </Box>

            {/* Alert Box */}
            {alertVisible && (
                <Alert
                    severity={alertType}
                    icon={alertType === 'success' ? <CheckIcon fontSize="inherit" /> : null}
                    onClose={() => setAlertVisible(false)}
                >
                    {alertType === 'error' ? (
                        <>
                            <AlertTitle>Cancelled</AlertTitle>
                            {alertMessage}
                        </>
                    ) : (
                        alertMessage
                    )}
                </Alert>
            )}

            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: ' #b7b2b3' }} >
                            {/* Sorting logic */}
                            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>
                                <TableSortLabel
                                    active={orderBy === 'Number'}
                                    direction={orderBy === 'Number' ? order : 'desc'}
                                    onClick={() => handleSort('Number')}
                                    sx={{
                                        '& .MuiTableSortLabel-icon': {
                                            color: orderBy === 'Number' ? '#007BFF' : '#ccc', // Blue when active, gray otherwise
                                        },
                                        '&:hover .MuiTableSortLabel-icon': {
                                            color: '#007BFF', // Blue on hover
                                        },
                                    }}
                                >
                                    Number
                                </TableSortLabel>
                            </TableCell>

                            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>SubCategory</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>
                                <TableSortLabel
                                    active={orderBy === 'Impact'}
                                    direction={orderBy === 'Impact' ? order : 'desc'}
                                    onClick={() => handleSort('Impact')}
                                    sx={{
                                        '& .MuiTableSortLabel-icon': {
                                            color: orderBy === 'Impact' ? '#007BFF' : '#ccc', // Blue when active, gray otherwise
                                        },
                                        '&:hover .MuiTableSortLabel-icon': {
                                            color: '#007BFF', // Blue on hover
                                        },
                                    }}

                                >
                                    Impact
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>
                                <TableSortLabel
                                    active={orderBy === 'Urgency'}
                                    direction={orderBy === 'Urgency' ? order : 'desc'}
                                    onClick={() => handleSort('Urgency')}
                                    sx={{
                                        '& .MuiTableSortLabel-icon': {
                                            color: orderBy === 'Urgency' ? '#007BFF' : '#ccc', // Blue when active, gray otherwise
                                        },
                                        '&:hover .MuiTableSortLabel-icon': {
                                            color: '#007BFF', // Blue on hover
                                        },
                                    }}
                                >
                                    Urgency
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>
                                <TableSortLabel
                                    active={orderBy === 'Priority'}
                                    direction={orderBy === 'Priority' ? order : 'desc'}
                                    onClick={() => handleSort('Priority')}
                                    sx={{
                                        '& .MuiTableSortLabel-icon': {
                                            color: orderBy === 'Priority' ? '#007BFF' : '#ccc', // Blue when active, gray otherwise
                                        },
                                        '&:hover .MuiTableSortLabel-icon': {
                                            color: '#007BFF', // Blue on hover
                                        },
                                    }}
                                >
                                    Priority
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>
                                <TableSortLabel
                                    active={orderBy === 'State'}
                                    direction={orderBy === 'State' ? order : 'desc'}
                                    onClick={() => handleSort('State')}
                                >
                                    Status
                                </TableSortLabel>

                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Assignement Group</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Assigned To</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Short Description</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Description</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedIncidents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((Incident) => (
                            <TableRow key={Incident.Number}
                                sx={{ backgroundColor: '#ffffff' }} >
                                <TableCell sx={{ color: '#00aae7', fontWeight: 'bold', }}>{Incident.Number}</TableCell>
                                <TableCell>{Incident.Category}</TableCell>
                                <TableCell>{Incident.SubCategory}</TableCell>
                                <TableCell>{impactMap[Incident.Impact] || Incident.Impact}</TableCell>
                                <TableCell>{urgencyMap[Incident.Urgency] || Incident.Urgency}</TableCell>
                                <TableCell>{priorityMap[Incident.Priority] || Incident.Priority}</TableCell>
                                {/* <TableCell>{stateMap[Incident.State] || Incident.State}</TableCell> */}
                                <TableCell>
                                    <Chip
                                        label={stateMap[Incident.State]?.label || Incident.State}
                                        color={stateMap[Incident.State]?.color || 'default'}
                                        size="large"
                                        variant="outlined" // Or "outlined" based on your preference
                                    />
                                </TableCell>
                                <TableCell>{Incident.Assignment_group.value}</TableCell>
                                <TableCell>{Incident.Assigned_to.value}</TableCell>

                                <TableCell
                                    sx={{
                                        maxWidth: '200px',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {Incident["Short Description"]}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        maxWidth: '200px',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {Incident.Description}
                                </TableCell>

                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <IconButton onClick={() => handleEditClick(Incident)}>
                                            <EditIcon color="primary" />
                                        </IconButton>
                                        <IconButton onClick={() => confirmDelete(Incident.Number)}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* Pagination Component */}
                {/* <PaginationComponent
                    count={filteredIncidents.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handlePageChange={handlePageChange}
                    handleRowsPerPageChange={handleRowsPerPageChange}
                /> */}
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100, 250]}
                component="div"
                count={filteredIncidents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle sx={{ textAlign: 'center', color: '#00aae7', fontWeight: 'bold', fontSize: '1.2rem',   }}
                >{currentIncident.Number ? 'Update Incident' : 'Add Incident'}</DialogTitle>

                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <FormControl fullWidth margin="dense">
                                <FormLabel sx={{ color: '#000' }}>Category</FormLabel>
                                <Select
                                    name="Category"
                                    value={currentIncident.Category}
                                    onChange={(e) => setCurrentIncident(data => ({ ...data, Category: e.target.value }))}
                                    size="small"
                                >
                                    {categories.map(Category => (
                                        <MenuItem key={Category} value={Category}>
                                            {Category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth margin="dense">
                                <FormLabel sx={{ color: '#000' }}>SubCategory</FormLabel>
                                <Select
                                    name="SubCategory"
                                    value={currentIncident.SubCategory}
                                    onChange={(e) => setCurrentIncident(data => ({ ...data, SubCategory: e.target.value }))}
                                    size="small"
                                    disabled={!currentIncident.Category}
                                >
                                    {subCategories[currentIncident.Category]?.map(sub => (
                                        <MenuItem key={sub} value={sub}>
                                            {sub}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth margin="dense">
                                <FormLabel sx={{ color: '#000' }}>Impact</FormLabel>
                                <Select
                                    name="Impact"
                                    value={currentIncident.Impact}
                                    onChange={(e) => setCurrentIncident(data => ({ ...data, Impact: e.target.value }))}
                                    size="small"
                                >
                                    <MenuItem value={1}>1 - High</MenuItem>
                                    <MenuItem value={2}>2 - Medium</MenuItem>
                                    <MenuItem value={3}>3 - Low</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth margin="dense">
                                <FormLabel sx={{ color: '#000' }}>Urgency</FormLabel>
                                <Select
                                    name="Urgency"
                                    value={currentIncident.Urgency}
                                    onChange={(e) => setCurrentIncident(data => ({ ...data, Urgency: e.target.value }))}
                                    size="small"
                                >
                                    <MenuItem value={1}>1 - High</MenuItem>
                                    <MenuItem value={2}>2 - Medium</MenuItem>
                                    <MenuItem value={3}>3 - Low</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth margin="dense">
                                <FormLabel sx={{ color: '#000' }}>Priority</FormLabel>
                                <Select
                                    name="Priority"
                                    value={currentIncident.Priority}
                                    onChange={(e) => setCurrentIncident(data => ({ ...data, Priority: e.target.value }))}
                                    size="small"
                                >
                                    <MenuItem value={1}>1 - High</MenuItem>
                                    <MenuItem value={2}>2 - Medium</MenuItem>
                                    <MenuItem value={3}>3 - Moderate</MenuItem>
                                    <MenuItem value={4}>4 - Low</MenuItem>
                                    <MenuItem value={5}>5 - Planning</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth margin="dense">
                                <FormLabel sx={{ color: '#000' }}>State</FormLabel>
                                <Select
                                    name="State"
                                    value={currentIncident.State}
                                    onChange={(e) => setCurrentIncident(data => ({ ...data, State: e.target.value }))}
                                    size="small"
                                >
                                    <MenuItem value={1}>New</MenuItem>
                                    <MenuItem value={2}>In Progress</MenuItem>
                                    <MenuItem value={3}>On Hold</MenuItem>
                                    <MenuItem value={4}>Resolved</MenuItem>
                                    <MenuItem value={5}>Closed</MenuItem>
                                    <MenuItem value={6}>Cancelled</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ color: '#000' }}>Assignment Group</Typography>
                            <TextField
                                fullWidth
                                name="Assignment_group"
                                value={currentIncident.Assignment_group.value}
                                onChange={(e) => setCurrentIncident(data => ({ ...data, Assignment_group: e.target.value }))}
                                size="small"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ color: '#000' }}>Assigned To</Typography>
                            <TextField
                                fullWidth
                                name="Assigned_to"
                                value={currentIncident.Assigned_to.value}
                                onChange={(e) => setCurrentIncident(data => ({ ...data, Assigned_to: e.target.value }))}
                                size="small"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ color: '#000' }}>Short Description <span style={{ color: 'red' }}>*</span></Typography>
                            <TextField
                                fullWidth
                                name="Short Description"
                                value={currentIncident["Short Description"]}
                                onChange={(e) => setCurrentIncident(data => ({ ...data, "Short Description": e.target.value }))}
                                size="small"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ color: '#000' }}>Description</Typography>
                            <TextField
                                fullWidth
                                name="Description"
                                value={currentIncident.Description}
                                onChange={(e) => setCurrentIncident(data => ({ ...data, Description: e.target.value }))}
                                multiline
                                rows={3}
                                size="small"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleUpdate} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this Incident?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose}>No</Button>
                    <Button onClick={handleConfirmYes} color="error">Yes</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={dialogClose}
            >
                <CreateIncidents close={dialogClose} />
            </Dialog>
        </Box>
    )
}

export default Incidents;


