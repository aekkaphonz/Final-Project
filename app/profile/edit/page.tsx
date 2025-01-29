"use client";

import { useEffect, useState } from "react";
import EditPage from "../component/settingPage";

import AutherAfterLogin from "@/app/navbar/AutherAfterLogin";
import { useAuth } from "@/app/context/AuthProvider";
import Navbar from "@/app/navbar/page";



const EditUsersPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { isLoggedIn } = useAuth();


  return (
    <div>
      {isLoggedIn ? (
        <AutherAfterLogin
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      ) : (
        <Navbar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
  
        />
      )}

      <EditPage />
    </div>
  );
};

export default EditUsersPage;
