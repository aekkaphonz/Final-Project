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
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation"; // ใช้สำหรับนำทางใน Next.js
import Navbar from "@/app/navbar/page";

interface Attraction {
  id: string;
  coverimage: string;
  name: string;
  detail: string;
}

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // สำหรับควบคุม Sidebar
  const [data, setData] = useState<Attraction[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3001/posts");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: Attraction[] = await res.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f6f6e7" }}>
      <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

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
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#94c379",
            marginBottom: "30px",
            borderBottom: "2px solid #c9dbc4",
            display: "inline-block",
            paddingBottom: "5px",
          }}
        >
          บทความ
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {data.map((post) => (
            <RegionCard key={post._id} post={post} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

function RegionCard({ post }: { post: Post }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/home/highlights/${attraction.id}`); // นำทางไปยังหน้ารายละเอียด
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
        <CardActionArea onClick={handleCardClick}>
          <CardMedia
            component="img"
            height="150"
            image={post.images.length > 0 ? post.images[0] : ""}
            alt="ยังม้ายยยมีรูป"
            sx={{
              backgroundColor: post.images.length > 0 ? "transparent" : "#f0f0f0",
            }}
          />
          <CardContent
            sx={{
              backgroundColor: "#ffffff",
              textAlign: "center",
              padding: "10px",
              borderTop: "3px solid #94c379",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#333",
                marginBottom: "5px",
              }}
            >
              {post.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#353c41",
              }}
            >
              {post.content.substring(0, 100)}...
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            backgroundColor: "#fff",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Visibility sx={{ fontSize: 18, color: "#666" }} />
            <Typography sx={{ ml: 1, fontSize: 14, color: "#666" }}>
              {attraction.viewCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ChatBubbleOutline sx={{ fontSize: 18, color: "#666" }} />
            <Typography sx={{ ml: 1, fontSize: 14, color: "#666" }}>
              {attraction.commentCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Favorite sx={{ fontSize: 18, color: "red" }} />
            <Typography sx={{ ml: 1, fontSize: 14, color: "#666" }}>
              {attraction.likeCount}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
}
