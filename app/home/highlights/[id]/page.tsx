"use client";

import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Navbar from "@/app/navbar/page";
import { useParams } from "next/navigation"; // สำหรับ dynamic params

interface Attraction {
    name: string;
    coverimage: string;
    detail: string;
}

export default function Page() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // สำหรับควบคุม Sidebar
    const [data, setData] = useState<Attraction | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const params: any = useParams();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        async function fetchData(id: string) {
            try {
                const res = await fetch(`https://melivecode.com/api/attractions/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await res.json();
                setData(result.attraction);
                setLoading(false);
            } catch (err: any) {
                console.error(err.message);
                setError("ไม่สามารถโหลดข้อมูลได้");
                setLoading(false);
            }
        }

        if (params && params.id) {
            fetchData(params.id);
        } else {
            setError("ไม่พบพารามิเตอร์ ID");
            setLoading(false);
        }
    }, [params]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* Navbar */}
            <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />


            {/* Main Content */}
            <Container
                maxWidth="md"
                sx={{
                    mt: 4,
                    textAlign: "center",
                    flexGrow: 1,
                    paddingTop: "80px", // เว้นระยะจาก Navbar
                }}
            >
                {loading ? (
                    <Typography variant="h5" sx={{ mt: 4, color: "#616161" }}>
                        กำลังโหลด...
                    </Typography>
                ) : error ? (
                    <Typography variant="h5" sx={{ mt: 4, color: "#f44336" }}>
                        {error}
                    </Typography>
                ) : data ? (
                    <Card
                        sx={{
                            borderRadius: 3,
                            boxShadow: 4,
                            overflow: "hidden",
                            backgroundColor: "#f9fbe7", // เพิ่มสีพื้นหลังที่นุ่มนวล
                        }}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                sx={{ height: 300 }}
                                image={data.coverimage}
                                alt={data.name}
                            />
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="div"
                                    sx={{ color: "#3f51b5", fontWeight: "bold" }}
                                >
                                    {data.name}
                                </Typography>
                                <Typography variant="body1" sx={{ color: "#616161", mt: 2 }}>
                                    {data.detail}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: 2,
                                borderTop: "1px solid #e0e0e0",
                            }}
                        >
                            {/* ปุ่มแชร์ */}
                            <Box>
                                <Tooltip title="แชร์">
                                    <IconButton sx={{ color: "#3f51b5" }}>
                                        <ShareIcon />
                                    </IconButton>
                                </Tooltip>
                                {/* ปุ่มเพิ่มในรายการโปรด */}
                                <Tooltip title="เพิ่มในรายการโปรด">
                                    <IconButton sx={{ color: "#f50057" }}>
                                        <FavoriteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            {/* ปุ่มดำเนินการ */}
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ textTransform: "none", borderRadius: 2 }}
                            >
                                สำรวจเพิ่มเติม
                            </Button>
                        </CardActions>
                    </Card>
                ) : (
                    <Typography variant="h5" sx={{ mt: 4, color: "#616161" }}>
                        ไม่พบข้อมูล
                    </Typography>
                )}
            </Container>
        </Box>
    );
}
