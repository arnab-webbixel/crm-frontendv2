import React from 'react'
import  NavMain  from "@/components/Dashboard/NavMain"
import  TeamSwitcher  from "@/components/Dashboard/TeamSwitcher"
  import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
  } from "@/components/ui/sidebar"

  import { GoHomeFill } from "react-icons/go";
  import { FaUserGroup } from "react-icons/fa6";
  import { IoSettingsSharp } from "react-icons/io5";
  import { FcSalesPerformance } from "react-icons/fc";
import { useState } from 'react';
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import PlanButton from '@/components/Plan/PlanButton';


const AppSidebar = ({ ...props }) => {
  const [isCollapsed,setIsCollapsed]=useState(false)
  const [isPremium, setIsPremium] = useState(true); 
  const toggleSidebar=()=>{
    console.log("Toggling sidebar:", isCollapsed);
    setIsCollapsed((prevState)=>!prevState)
  }

    const data = {
        navMain: [
          {
            title: "Dashboard",
            url: "/main/dashboard",
            icon: GoHomeFill,
          },
          {
            title: "Sales", 
            url: "/main/sales-dashboard", 
            icon: FcSalesPerformance,
            showPlanButton: true, 
          },
          {
            title: "Staff Info",
            url: "/main/staff/manage",
            icon: FaUserGroup,
            items: [
              // {
              //   title: "Add Stuff",
              //   url: "/dashboard/staff/add",
              // },
              {
                title: "Manage Staff",
                url: "/main/staff/manage",
              },
              // {
              //   title: "Staff Role",
              //   url: "/main/staff/role",
              // },
            ],
          },
          {
            title: "Client Info",
            url: "/main/client",
            icon: FaUserGroup,
            items: [
              {
                title: "Add Client",
                url: "/main/client/add",
              },
              {
                title: "Manage Client",
                url: "/main/client/manage",
              },
              {
                title: "Update Client",
                url: "/main/client/update",
              },
            ],
          },
          // {
            // title: "Setting",
            // url: "#",
            // icon: IoSettingsSharp,
            // items: [
            //   {
            //     title: "Service Type",
            //     url: "/main/setting/service-type",
            //   },
              // {
              //   title: "Call Type",
              //   url: "/main/setting/call-type",
              // },
              // {
              //   title: "Default Remark",
              //   url: "/main/setting/default-remark",
              // },
              // {
              //   title: "Company Information",
              //   url: "/main/setting/company-information",
              // },
          //   ],
          // },
        ],
      }


  return (
  <>
   <Sidebar collapsible="icon" {...props} variant="sidebar"
    >
     <SidebarHeader className="text-white"> 
      <TeamSwitcher  /> 
    </SidebarHeader> 
    <SidebarContent>
      <NavMain items={data.navMain}  isPremium={isPremium} />
    </SidebarContent>
  </Sidebar>


  </>
 
  )
}

export default AppSidebar
