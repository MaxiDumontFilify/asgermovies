import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";

function ResponsiveAppBar() {
  const { user, logout } = useAuth();
  const name = user?.email.split("@")[0];
  const CatitalLetter = name?.charAt(0).toUpperCase();
  const router = useRouter();
  
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalMoviesIcon
            sx={{ mr: 1 }}
          />
            <Typography
              variant="h6"
              noWrap
              component="a"
              {...user? {href: "/dashboard"} : {href: "/"}}
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              AsgerMovies
            </Typography>
          
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <Avatar sx={{ bgcolor: "secondary.main" }}>
                    {CatitalLetter}
                  </Avatar>
                ) : (
                  <></>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  router.push("/MyFavoriteMovies");
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">My favorite movies</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  router.push("/dashboard");
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>


              <MenuItem
                onClick={() => {
                  logout();
                  router.push("/");
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Log Out</Typography>
              </MenuItem>


            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
