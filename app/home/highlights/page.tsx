"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Link from "next/link";
import { Visibility, Comment, ThumbUp } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Navbar from "@/app/navbar/page";
import AfterLogin from "@/app/navbar/AfterLogin";
import { useAuth } from "@/app/context/AuthProvider";

interface Post {
  _id: string;
  title: string;
  detail: string;
  postImage: string;
  views: number;
  comments: number;
  likes: number;
}

export default function Page() {
  const { isLoggedIn } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, setData] = useState<Post[]>([]);
  const [filteredData, setFilteredData] = useState<Post[]>([]);
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.userId; // ตรวจสอบว่ามี userId หรือไม่

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3001/contents/all");
        if (!res.ok) throw new Error("Failed to fetch data");
        const result: Post[] = await res.json();
        console.log(result); // ตรวจสอบ postImage ใน console
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchData();
  }, []);

  const handleCardClick = async (postId: string) => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }
    try {
      await fetch(`http://localhost:3001/contents/updateViews/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      router.push(`/home/highlights/${postId}`);
    } catch (error) {
      console.error("Error updating views:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar and Navbar */}
      {isLoggedIn ? <AfterLogin /> : <Navbar />}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: isSidebarOpen ? "240px" : "72px",
          transition: "margin-left 0.3s",
          paddingTop: "80px",
          paddingX: 2,
          paddingBottom: 2,
        }}
      >
        <Box
          sx={{
            // backgroundColor: "#f6f6e7",
            // borderRadius: 2,
            // border: "2px solid #c9dbc4",
            padding: 3,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "#98c9a3",
              marginBottom: "30px",
              borderBottom: "2px solid #c9dbc4",
              display: "inline-block",
              paddingBottom: "5px",
            }}
          >
            บทความทั้งหมด
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {filteredData.length > 0 ? (
              filteredData.map((post) => (
                <RegionCard key={post._id} post={post} />
              ))
            ) : (
              <Typography
                variant="body1"
                sx={{ textAlign: "center", marginTop: "20px" }}
              >
                ไม่พบข้อมูลที่ค้นหา
              </Typography>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

function Sb({
  isOpen,
  toggleSidebar,
  searchQuery,
  setSearchQuery,
  handleSearch,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (query: string) => void;
}) {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 3px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #ddd",
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
                alt="Logo"
                style={{ maxWidth: "142px", height: "auto" }}
              />
            </Link>
          </Box>
          <TextField
            placeholder="ค้นหา"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => handleSearch(searchQuery)}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            sx={{ width: "60%" }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link href="/signin">
              <Button>เข้าสู่ระบบ</Button>
            </Link>
            <Link href="/signup">
              <Button variant="contained">ลงทะเบียน</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          width: isOpen ? 240 : 72,
          height: "100vh",
          backgroundColor: "#fff",
          transition: "width 0.3s",
          position: "fixed",
          top: 64,
          left: 0,
          zIndex: 1200,
          overflow: "hidden",
          boxShadow: "2px 0px 5px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
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
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                  color: "#000",
                  minWidth: "40px",
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              {isOpen && (
                <ListItemText primary="หน้าหลัก" sx={{ color: "#000" }} />
              )}
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
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                  color: "#000",
                  minWidth: "40px",
                }}
              >
                <ArticleIcon />
              </ListItemIcon>
              {isOpen && (
                <ListItemText primary="น่าสนใจ" sx={{ color: "#000" }} />
              )}
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
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                  color: "#000",
                  minWidth: "40px",
                }}
              >
                <WhatshotIcon />
              </ListItemIcon>
              {isOpen && (
                <ListItemText primary="มาแรง" sx={{ color: "#000" }} />
              )}
            </ListItem>
          </Link>
        </List>
      </Box>
    </>
  );
}

function RegionCard({ post }: { post: Post }) {
  const router = useRouter();
  const { user } = useAuth(); // ดึง user จาก Context
  const userId = user?.userId; // ตรวจสอบว่า userId มีค่าหรือไม่

  const handleCardClick = async (postId: string) => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    try {
      // ส่ง request เพื่ออัปเดตยอดวิว
      await fetch(`http://localhost:3001/contents/updateViews/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      // นำผู้ใช้ไปยังหน้ารายละเอียดบทความ
      router.push(`/home/highlights/${postId}`);
    } catch (error) {
      console.error("Error updating views:", error);
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
          },
          backgroundColor: "#f6f6e7",
        }}
      >
        <CardActionArea onClick={() => handleCardClick(post._id)}>
          <CardMedia
            component="img"
            height="150"
            image={post.postImage || "https://via.placeholder.com/150"}
            alt={post.title || "ยังไม่มีรูปภาพ"}
            sx={{
              objectFit: "cover",
              borderRadius: "8px",
              height: "150px",
            }}
          />

          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2"></Typography>
          </CardContent>
        </CardActionArea>
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", fontSize: 12 }}>
            <Typography sx={{ mr: 2, fontSize: 12 }}>ผู้เขียน</Typography>
            การอ่าน {Array.isArray(post.views) ? post.views.length : 0} ครั้ง
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}></Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThumbUp /> {post.likes}
            {/* <Box sx={{ display: "flex", alignItems: "center", fontSize: 12  }}>
            <Box sx={{ alignItems: "center", mr: 2 }}>
              <Comment sx={{ fontSize: 12 }}/> <Typography sx={{ fontSize: 12 }}>0 {post.comments}</Typography>
            </Box>
            <Box sx={{ alignItems: "center" }}>
              <ThumbUp sx={{ fontSize: 12 }}/> <Typography sx={{ fontSize: 12 }}>0 {post.likes}</Typography>
            </Box> */}
          </Box>
        </Box>
      </Card>
    </Grid>
  );
}
