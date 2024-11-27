import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Slide, Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem, Paper, Alert, AlertTitle, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, TableSortLabel, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import CreateIncident from './CreateIncident';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


const Incidents = () => {
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
        Description: ''
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


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
              String(incident.Impact || ''),
              String(incident.SubCategory || ''),
              String(incident.Urgency || ''),
              String(incident.Priority || ''),
              String(incident.Description || ''),
              String(incident["Short Description"] || ''),
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
            Impact: currentIncident.Impact,
            SubCategory: currentIncident.SubCategory,
            Urgency: currentIncident.Urgency,
            Priority: currentIncident.Priority,
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
            data.SubCategory.toLowerCase().includes(e.target.value)
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
        <div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '23px' }}>Incidents</h3>
            </div>
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
                onClick={handleOpen}
                sx={{
                    backgroundColor: '#00aae7',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#2368a0',
                    },
                }}
            >
                Create Incident
            </Button>

            {/* Dialog with CreateIncident component */}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="create-incident-dialog"
                fullWidth
                maxWidth="md"
            >
                <DialogContent>
                    {/* Render the CreateIncident Component */}
                    <CreateIncident onClose={handleClose} />
                </DialogContent>
            </Dialog>
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
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'Number'}
                                    direction={orderBy === 'Number' ? order : 'desc'}
                                    onClick={() => handleSort('Number')}
                                >
                                    Number
                                </TableSortLabel>
                            </TableCell>

                            <TableCell>Category</TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'Impact'}
                                    direction={orderBy === 'Impact' ? order : 'desc'}
                                    onClick={() => handleSort('Impact')}
                                >
                                    Impact
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>SubCategory</TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'Urgency'}
                                    direction={orderBy === 'Urgency' ? order : 'desc'}
                                    onClick={() => handleSort('Urgency')}
                                >
                                    Urgency
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'Priority'}
                                    direction={orderBy === 'Priority' ? order : 'desc'}
                                    onClick={() => handleSort('Priority')}
                                >
                                    Priority
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Short Description</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedIncidents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((Incident) => (
                            <TableRow key={Incident.Number}
                                sx={{ backgroundColor: '#ffffff' }} >
                                <TableCell sx={{ color: '#00aae7' }}>{Incident.Number}</TableCell>
                                <TableCell>{Incident.Category}</TableCell>
                                <TableCell>{impactMap[Incident.Impact] || Incident.Impact}</TableCell>
                                <TableCell>{Incident.SubCategory}</TableCell>
                                <TableCell>{urgencyMap[Incident.Urgency] || Incident.Urgency}</TableCell>
                                <TableCell>{priorityMap[Incident.Priority] || Incident.Priority}</TableCell>
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
                <DialogTitle>{currentIncident.Number ? 'Update Incident' : 'Add Incident'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Number"
                        name="Number"
                        value={currentIncident.Number}
                        fullWidth
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Category</InputLabel>
                        <Select
                            label="Category"
                            name="Category"
                            value={currentIncident.Category}
                            onChange={(e) => setCurrentIncident(data => ({ ...data, Category: e.target.value }))}
                        >
                            {categories.map(Category => (
                                <MenuItem key={Category} value={Category}>
                                    {Category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Impact</InputLabel>
                        <Select
                            label="Impact"
                            name="Impact"
                            value={currentIncident.Impact}
                            onChange={(e) => setCurrentIncident(data => ({ ...data, Impact: e.target.value }))}
                        >
                            <MenuItem value={1}>1 - High</MenuItem>
                            <MenuItem value={2}>2 - Medium</MenuItem>
                            <MenuItem value={3}>3 - Low</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>SubCategory</InputLabel>
                        <Select
                            label="SubCategory"
                            name="SubCategory"
                            value={currentIncident.SubCategory}
                            onChange={(e) => setCurrentIncident(data => ({ ...data, SubCategory: e.target.value }))}
                        >
                            {subCategories[currentIncident.Category]?.map(sub => (
                                <MenuItem key={sub} value={sub}>
                                    {sub}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Urgency</InputLabel>
                        <Select
                            label="Urgency"
                            name="Urgency"
                            value={currentIncident.Urgency}
                            onChange={(e) => setCurrentIncident(data => ({ ...data, Urgency: e.target.value }))}
                        >
                            <MenuItem value={1}>1 - High</MenuItem>
                            <MenuItem value={2}>2 - Medium</MenuItem>
                            <MenuItem value={3}>3 - Low</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Priority</InputLabel>
                        <Select
                            label="Priority"
                            name="Priority"
                            value={currentIncident.Priority}
                            onChange={(e) => setCurrentIncident(data => ({ ...data, Priority: e.target.value }))}
                        >
                            <MenuItem value={1}>1 - High</MenuItem>
                            <MenuItem value={2}>2 - Medium</MenuItem>
                            <MenuItem value={3}>3 - Moderate</MenuItem>
                            <MenuItem value={4}>4 - Low</MenuItem>
                            <MenuItem value={5}>5 - Planning</MenuItem>

                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Short Description"
                        name="Short Description"
                        value={currentIncident["Short Description"]}
                        onChange={(e) => setCurrentIncident(data => ({ ...data, "Short Description": e.target.value }))}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        name="Description"
                        value={currentIncident.Description}
                        onChange={(e) => setCurrentIncident(data => ({ ...data, Description: e.target.value }))}
                        fullWidth
                    />
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
        </div>
    )
}

export default Incidents;
