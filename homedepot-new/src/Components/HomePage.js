import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const FullScreenImageWithCircle = () => {
  const navigate = useNavigate();
    const handleCreateIncident = () => {
        navigate('/create-incident');
    };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to top, #00008b 40%, #add8e6 45%)', // Dark blue at the bottom to light blue at the top
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Main Content */}
      <Typography
        sx={{
          color: 'white',
          fontSize: '3rem',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        Welcome to Incident Mangement System
      </Typography>
      
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#fff',
                        color: '#000',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        '&:hover': { backgroundColor: '#e0e0e0' },
                    }}
                    onClick={handleCreateIncident}
                >
                    Create Incident
                </Button>

      {/* Circle at the bottom-right corner with an image inside */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '60px', // Positioned at the bottom
          right: '60px', // Positioned to the right
          width: '270px', // Circle size
          height: '300px', // Circle size
          borderRadius: '50%', // Makes it a circle
          backgroundColor: 'white', // Circle color
          border: '5px solid #add8e6', // Optional border with light blue color
          backgroundImage: 'url(https://images.miraclesoft.com/home/transform-intelligent-automation.webp)', // URL for the image
          backgroundSize: 'cover', // Ensures the image covers the entire circle
          backgroundPosition: 'center', // Centers the image inside the circle
        }}
      />

      {/* Add an overlay layer to fill the curved edges */}
      <Box
        sx={{
          position: 'absolute',
          display: 'none',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '30%', // Covers the bottom 30% of the viewport
          backgroundColor: '#00008b', // Dark blue to match the gradient
          borderTopLeftRadius: '35%', // Matches the curved edges
          borderTopRightRadius: '50%', // Matches the curved edges
          zIndex: -1, // Behind the content
          borderRadius: '0 0 50% 50%'
        }}
      />
    </Box>
  );
};

export default FullScreenImageWithCircle;
