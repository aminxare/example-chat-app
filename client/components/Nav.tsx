"use client";
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
import WebAssetIcon from "@mui/icons-material/WebAsset";
import MaterialUISwitch from "./ui/DarkModeSwitch";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@/context/Theme";
import { useAuth } from "@/context/Auth";
import { useRouter } from "next/navigation";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";
import MessageList from "@/feature/message/components/MessageList";

function Nav() {
  const [open, setOpen] = useState(false);
  const { isLogin, logout } = useAuth();
  const { changeMode, mode } = useTheme();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogoutItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(null);
    logout();
    router.replace("/auth");
  };

  const handleAccountItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(null);
    router.push("/account");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDarkMode: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    changeMode(e.target.checked ? "dark" : "light");
  };

  return (
    <>
      <Drawer open={open} onClose={handleCloseDrawer} anchor="right">
        <Box
          sx={{
            width: "70vw",
            height: "100%",
            padding: "3px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <MessageList />
        </Box>
      </Drawer>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <WebAssetIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Chat
            </Typography>

            <WebAssetIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Chat
            </Typography>

            <Box sx={{ margin: "0 0 0 auto" }}>
              <MaterialUISwitch
                sx={{ margin: "0 1em" }}
                onChange={handleDarkMode}
                checked={mode === "dark"}
              />
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="" />
                </IconButton>
              </Tooltip>
              <IconButton
                onClick={handleOpenDrawer}
                sx={{
                  display: { xs: "inline-block", md: "none" },
                  color: "#fff",
                }}
              >
                <MenuIcon />
              </IconButton>
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
                <MenuItem onClick={handleAccountItem}>
                  <Typography textAlign="center">Account</Typography>
                </MenuItem>
                {isLogin && (
                  <MenuItem onClick={handleLogoutItem}>
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
export default Nav;
