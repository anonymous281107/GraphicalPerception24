import React from "react";
import { useClearAllSessions } from "state";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SessionList from "components/SessionList";

const HomePage = () => {
  const navigate = useNavigate()
  const clearAllSessions = useClearAllSessions()
  return (
    <div>
      <Box sx={{ my: 1 }}>
        <Button variant="contained"
          onClick={() => navigate('/create')} sx={{
            mx: 2
          }}>
          Create Sessions
        </Button>
        <Button variant="contained"
          onClick={() => clearAllSessions()} sx={{

          }}>
          Clear All Sessions
        </Button>
      </Box>
      <SessionList />
    </div>
  )

};

export default HomePage;
