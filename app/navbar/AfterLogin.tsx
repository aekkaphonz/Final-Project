"use client";

import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography, Button, TextField, Tooltip, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


function NavLogIn({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  const settings = ['Profile', 'Dashboard', 'Logout'];
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


  const themeColors = {
    primary: "#ffffff",
    text: "#000000",
    buttonBorder: "#000000",
    buttonGreen: "#77bfa3",
  };


  
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
    
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff", // พื้นหลังสีขาว
          boxShadow: "0px 3px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #ddd",
          zIndex: 1300, // ให้อยู่เหนือ Sidebar
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Sidebar Menu */}
          <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          >
            <IconButton
              size="large"
              edge="start"
              onClick={toggleSidebar}
              sx={{ color: "#000" }}
            >
              <MenuIcon />
            </IconButton>

            <Link href="/" >
              <img
                src="/images/logo-blogs.png"
                alt="Cleaning Illustration"
                style={{ maxWidth: "142px", height: "auto" }} // ขนาดโลโก้
              />
            </Link>
          </Box>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, mx: 2, display: "flex", justifyContent: "center" }}>
            <TextField
              placeholder="ค้นหา"
              variant="outlined"
              size="small"
              sx={{
                width: "60%",
                backgroundColor: "#f6f6f6",
              }}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>

          {/* Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                backgroundColor: "#fff", // สีขาว
                color: "#000000",
              }}
            >
              {/* ไอคอนและข้อความ*/}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px", // ระยะห่างระหว่างไอคอนและข้อความ
                }}
              >

                <Link href="/createBlog" >

                  <Typography
                    variant="h6"
                    sx={{
                      color: themeColors.text,
                    }}
                  >
                    <AddIcon
                      sx={{
                        color: themeColors.buttonGreen,
                        fontWeight: "bold",
                        boxShadow: "0px 2px 5px rgba(0,0,0,0.2)", // เพิ่มเงา
                        marginRight: "10px",
                        marginLeft: "120px",
                      }}
                    />
                    สร้าง
                  </Typography>
                </Link>

              </Box>
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          </Box>
        </Toolbar>
      </AppBar>


      {/* Sidebar */}
      <Box
        sx={{
          width: isOpen ? 240 : 72, // ความกว้างเมื่อเปิด/ปิด
          height: "100vh",
          backgroundColor: "#fff",
          transition: "width 0.3s",
          position: "fixed",
          top: 64, // เลื่อน Sidebar ให้เริ่มหลัง Navbar
          left: 0,
          zIndex: 1200,
          overflow: "hidden",
          boxShadow: "2px 0px 5px rgba(0,0,0,0.1)",
        }}
      >
        <List>
          <Link href="/home/highlights">
            <ListItem

              component="button"

              sx={{
                display: "flex",
                flexDirection: isOpen ? "row" : "column",
                alignItems: "center",
                justifyContent: isOpen ? "flex-start" : "center",
                padding: isOpen ? "12px 20px" : "12px 0",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              <ListItemIcon sx={{ justifyContent: "center", color: "#000", minWidth: "40px" }}>
                <HomeIcon />
              </ListItemIcon>
              {isOpen && <ListItemText primary="หน้าหลัก" sx={{ color: "#000" }} />}
            </ListItem>
          </Link>
          <Link href="/home/article">
            <ListItem
              component="button"
              sx={{
                display: "flex",
                flexDirection: isOpen ? "row" : "column",
                alignItems: "center",
                justifyContent: isOpen ? "flex-start" : "center",
                padding: isOpen ? "12px 20px" : "12px 0",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              <ListItemIcon sx={{ justifyContent: "center", color: "#000", minWidth: "40px" }}>
                <ArticleIcon />
              </ListItemIcon>
              {isOpen && <ListItemText primary="น่าสนใจ" sx={{ color: "#000" }} />}
            </ListItem>
          </Link>
          <Link href="/home/popular">
            <ListItem
              component="button"
              sx={{
                display: "flex",
                flexDirection: isOpen ? "row" : "column",
                alignItems: "center",
                justifyContent: isOpen ? "flex-start" : "center",
                padding: isOpen ? "12px 20px" : "12px 0",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              <ListItemIcon sx={{ justifyContent: "center", color: "#000", minWidth: "40px" }}>
                <WhatshotIcon />
              </ListItemIcon>
              {isOpen && <ListItemText primary="มาเเรง" sx={{ color: "#000" }} />}
            </ListItem>
          </Link>
        </List>
      </Box>
      
    </>
  );
}

export default NavLogIn;