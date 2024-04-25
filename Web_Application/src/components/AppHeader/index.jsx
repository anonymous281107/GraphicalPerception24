import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Drawer from "components/Drawer";
import { useToggleToolBar, useToolBarState } from "state";

function AppHeader() {
  const drawerOpen = useToolBarState()
  const toggleDrawer = useToggleToolBar()

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => toggleDrawer()}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer open={drawerOpen} toggleDrawer={toggleDrawer} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex" },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Graphical Perception
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppHeader;
