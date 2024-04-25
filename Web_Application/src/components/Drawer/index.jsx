import React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

import { drawerLinks } from "constants";
import { ExperimentZIndex } from "configuration";

const iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

export default function Drawer({ open, toggleDrawer }) {
  const navigate = useNavigate();

  return (
    <SwipeableDrawer
      open={open}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      sx={{
        zIndex: ExperimentZIndex + 1
      }}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <Box
          sx={{
            backgroundColor: "primary.main",
            height: "10rem",
            display: "flex",
            padding: "1rem",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ color: "#ffffff", fontWeight: 700 }}>
            Graphical Perception
          </Typography>
        </Box>
        <Divider />
        <List>
          {drawerLinks.map((link) => (
            <ListItem
              key={link.label}
              disablePadding
              onClick={() => {
                toggleDrawer(false);
                if (link.to.startsWith("/")) {
                  setTimeout(() => navigate(link.to), 200);
                }
              }}
            >
              <ListItemButton>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
        </List>
        <Box
          sx={{
            position: "fixed",
            bottom: "2rem",
            left: "1rem",
            textAlign: "center",
          }}
        >
          <Typography variant="caption">
            Graphical Perception

          </Typography>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}
