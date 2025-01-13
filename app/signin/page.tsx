"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

function signin() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const router = useRouter();
  // useEffect(() => {
  //   if (isFormSubmitted) {
  //     router.push("/");
  //   }
  // }, [isFormSubmitted, router]);

  const { register, handleSubmit, control } = useForm();

  const handleFormSubmit = async (formData: any) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        router.push("/");
      } else {
        const error = await response.json();

        alert("การเข้าสู่ระบบล้มเหลว");
      }
    } catch (error) {
      console.error("Error login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card sx={{ maxWidth: 500, mx: "auto", mt: "2rem" }}>
        <CardContent>
          <Box
            className="border__R"
            display="flex"
            flexDirection="column"
            gap="2rem"
            mt="2rem"
            padding="2rem"
            maxWidth="500px"
            mx="auto"
          >
            <div className="font-bold text-3xl">เข้าสู่ระบบ</div>
            <div className="w-full">
              <TextField
                id="Email"
                label="อีเมล"
                variant="outlined"
                fullWidth
                {...register("email")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="w-full">
              <TextField
                type={showPassword ? "text" : "password"}
                id="password"
                label="รหัสผ่าน"
                variant="outlined"
                fullWidth
                {...register("password")}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </div>

            <div className="grid grid-cols-2 justify-between items-center">
              <div className="flex items-center">
                <Controller
                  name="agreeToTerms"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Checkbox {...field} defaultChecked />
                      <label>บันทึกการเข้าใช้งาน</label>
                    </div>
                  )}
                />
              </div>
              <div className="text-right">
                <a href="http://localhost:3000/signup">ลืมรหัสผ่าน</a>
              </div>
            </div>

            <div className="btn1">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6B7280",
                  "&:hover": {
                    backgroundColor: "#4B5563",
                  },
                  "&:focus": {
                    backgroundColor: "#6B7280",
                  },
                  "&.MuiButton-root": {
                    outline: "none",
                  },
                }}
                className="w-full text-white p-2 text-lg"
                type="submit"
              >
                เข้าสู่ระบบ
              </Button>
            </div>
            <div className="flex justify-center items-center gap-2 ">
              <a className="text-right  ">ยังไม่เป็นสมาชิก?</a>
              <a href="http://localhost:3000/signup" className="text-blue-500">
                ลงทะเบียนสมัครสมาชิก
              </a>
            </div>
            <div className="flex justify-center items-center relative">
              <hr className="w-4/5 border-t-1 border-gray-400" />
              <span className="absolute bg-white px-2">หรือ</span>
            </div>
            <div className="flex justify-center items-center">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6B7280",
                  "&:hover": {
                    backgroundColor: "#4B5563",
                  },
                  "&:focus": {
                    backgroundColor: "#6B7280",
                  },
                  "&.MuiButton-root": {
                    outline: "none",
                  },
                }}
                className="w-4/6 text-white p-2 text-sm"
                type="submit"
                startIcon={<GoogleIcon />}
              >
                Login with Google
              </Button>
            </div>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
}

export default signin;
