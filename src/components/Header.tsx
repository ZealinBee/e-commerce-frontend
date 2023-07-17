import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StyledBadge from "@mui/material/Badge";
import { Link } from "react-router-dom";

import useAppSelector from "../redux/hooks/useAppSelectors";
import useAppDispatch from "../redux/hooks/useAppDispatch";
import { logoutUser } from "../redux/reducers/usersReducer";

function Header() {
  const quantity = useAppSelector((state) => state.cartReducer.items.length);
  let isLoggedIn = useAppSelector((state) => state.usersReducer.isLoggedIn);
  const avatar = useAppSelector(
    (state) => state.usersReducer.currentUser?.avatar
  );
  let isAdmin = false;
  const dispatch = useAppDispatch();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  function handleOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElNav(event.currentTarget);
  }

  function handleOpenUserMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseNavMenu() {
    setAnchorElNav(null);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  async function handleLogOut() {
    await dispatch(logoutUser());
    handleCloseUserMenu();
    navigate("/");
  }

  if (
    useAppSelector((state) => state.usersReducer.currentUser?.role === "admin")
  ) {
    isAdmin = true;
  }
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: "flex",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                  textDecoration: "none",
                  fontSize: { xs: "1.1rem", md: "2rem" },
                }}
              >
                REACT-STORE
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { md: "flex", xs: "none" } }}>
              <Link to="/" style={{ color: "white" }}>
                <MenuItem>Home</MenuItem>{" "}
              </Link>
            </Box>
            <Box sx={{ flexGrow: 0, ml:"auto" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {isLoggedIn ? (
                    <Avatar
                      alt="profile pic"
                      src={avatar}
                      sx={{
                        width: { xs: 30, md: 40 },
                        height: { xs: 30, md: 40 },
                      }}
                    />
                  ) : (
                    <Avatar
                      alt="profile pic"
                      src=""
                      sx={{
                        width: { xs: 30, md: 40 },
                        height: { xs: 30, md: 40 },
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>
              <Link to="/cart">
                <IconButton sx={{ ml: { xs: "10px", md: "35px" } }}>
                  <StyledBadge badgeContent={quantity} color="secondary">
                    <ShoppingCartIcon></ShoppingCartIcon>
                  </StyledBadge>
                </IconButton>
              </Link>
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
                {isAdmin ? (
                  <Link to="/modification">
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        Manage Products
                      </Typography>
                    </MenuItem>
                  </Link>
                ) : (
                  <div></div>
                )}

                {!isLoggedIn ? (
                  <Link to="/login">
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                  </Link>
                ) : (
                  <Link to="/profile">
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                  </Link>
                )}
                {!isLoggedIn ? (
                  <div></div>
                ) : (
                  <MenuItem onClick={handleLogOut}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Header;
