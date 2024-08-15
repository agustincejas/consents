import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import { NavLink, Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { DRAWER_WIDTH } from "./constants";
import { BoxContainer } from "./App.styles";

function App() {
  const navigationItems = [
    { label: "Give consent", path: "give-consent" },
    { label: "Collected consents", path: "consents" },
  ];

  const DrawerList = (
    <Box sx={{ width: DRAWER_WIDTH }} role="presentation">
      <List>
        {navigationItems.map((route) => (
          <NavLink key={route.label} to={route.path}>
            {({ isActive }) => (
              <ListItem disablePadding>
                <ListItemButton selected={isActive}>
                  <ListItemText primary={route.label}></ListItemText>
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
        ))}
      </List>
    </Box>
  );
  return (
    <Container>
      <CssBaseline />
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {DrawerList}
      </Drawer>
      <BoxContainer>
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default" }}>
          <Outlet />
        </Box>
      </BoxContainer>
    </Container>
  );
}

export default App;
