import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import AppHeader from "components/AppHeader";

const MainLayout = ({ children, hideContainer }) => {
  let content = (
    <Container>
      <Box sx={{ pb: 7, mt: 2 }}>{children}</Box>
    </Container>
  );
  if (hideContainer) {
    content = children
  }
  return (
    <Box sx={{ overflow: "hidden" }}>
      <AppHeader />
      <Toolbar />
      {content}
    </Box>
  );
};

export default MainLayout;
