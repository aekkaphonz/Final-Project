

  "use client";

import React,{useState,useEffect} from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography, Button, TextField, Tooltip, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";;
import Link from "next/link";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SwitchTheme from "@/app/darkMode/components/SwitchTheme";
import { useTheme } from "@mui/material/styles";

const themeColors = {
  primary: "#ffffff",
  text: "#000000",
  buttonBorder: "#000000",
  buttonGreen: "#77bfa3",
};

function Sb({ isOpen, toggleSidebar, handleSearch }: { isOpen: boolean; toggleSidebar: () => void; handleSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  const theme = useTheme(); // ใช้ useTheme เพื่อดึงธีมปัจจุบัน
  const isDarkMode = theme.palette.mode === "dark"; // ตรวจสอบว่าเป็นโหมดมืดหรือไม่
  
  // Fetch all data on load
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3001/posts");
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();
        setData(result);
        setFilteredData(result); // Initialize with all data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {/* Navbar */}
      <AppBar
         position="fixed"
         className="navbar"
         sx={{
           backgroundColor: "inherit", // ใช้ค่า background สีจากคลาส Tailwind
           color: "inherit",
           boxShadow: "0px 3px 3px rgba(0,0,0,0.1)",
           zIndex: 1300,
         }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2  }}>
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

            <Link href="/">
              <img
                src="/images/logo-blogs.png"
                alt="Cleaning Illustration"
                style={{ maxWidth: "142px", height: "auto" }}
              />
            </Link>
          </Box>

          {/* Search Bar */}
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
              onChange={(e) => handleSearch(e.target.value)}
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
                {/* ปุ่มเขียน */}
                <Button href="/signin"
                  sx={{
                    color: "#ffffff",
                    backgroundColor: "#77bfa3",
                    "&:hover": {
                      backgroundColor: "#F7F7F7",
                      color: "#77bfa3"
                    },
                    borderRadius: "20px",
                    padding: "6px 16px",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                  variant="contained"
                >
                  <EditNoteOutlinedIcon sx={{ marginRight: 1 }} />
                  เขียน
                </Button>
              </Box>
            </Typography>

            {/* Signin Button */}
            <Button
              href="/signin"
              variant="outlined"
              sx={{
                color: themeColors.buttonGreen,
                borderColor: themeColors.buttonGreen,
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: themeColors.buttonGreen,
                  borderColor: themeColors.buttonGreen,
                  color: "#ffffff",
                },
              }}
            >
              เข้าสู่ระบบ
            </Button>

            {/* Signup Button */}
            <Button
              href="/signup"
              variant="contained"
              sx={{
                backgroundColor: themeColors.buttonGreen,
                color: "#ffffff",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  borderColor: themeColors.buttonGreen,
                  color: themeColors.buttonGreen,
                },
              }}
            >
              ลงทะเบียน
            </Button>

            <SwitchTheme />

          </Box>
          
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        sx={{
          width: isOpen ? 240 : 72,
          height: "100vh",
          backgroundColor: "inherit", // ใช้ค่า background สีจากคลาส Tailwind
          color: "inherit",
          transition: "width 0.3s",
          position: "fixed",
          top: 64,
          left: 0,
          zIndex: 1200,
          overflow: "hidden",
          boxShadow: "2px 0px 5px rgba(0,0,0,0.1)",
        }}
      >
        <List>
          <Tooltip title="หน้าหลัก" placement="right">
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
          </Tooltip>
          <Tooltip title="น่าสนใจ" placement="right">
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
          </Tooltip>
          <Tooltip title="มาเเรง" placement="right">
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
          </Tooltip>
        </List>
      </Box>
    </>
  );
}

export default Sb;

