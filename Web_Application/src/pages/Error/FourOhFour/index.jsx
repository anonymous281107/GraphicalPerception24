import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { Button } from "components/Atoms/Button";

export const FourOhFourView = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: 600, mt: 4 }} color="gray">
        You may have been lost!
      </Typography>
      <Button sx={{ mt: 3 }} onClick={() => navigate("/", { replace: true })}>
        Go to Home
      </Button>
    </Box>
  );
};

const FourOhFour = () => (
  <Box
    sx={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <FourOhFourView />
  </Box>
);

export default FourOhFour;
