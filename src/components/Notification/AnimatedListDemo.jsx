"use client"

import { cn } from "@/lib/utils"
import { AnimatedList } from "@/components/ui/animated-list"
import { useState, useEffect,useRef } from "react";
let notifications = [
  {
    name: "Rahul Kumar",
    description: "A Customer Added ",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "Abhishek",
    description: "A Customer Added ",
    time: "3h ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "Ayan",
    description: "A Customer Added ",
    time: "7m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "Subho Das",
    description: "A Customer Added ",
    time: "7m ago",
    icon: "👤",
    color: "#FFB800",
  }
]


const Notification = ({ name, description, icon, color, time }) => {
  
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">{description}</p>
        </div>
      </div>
    </figure>
  )
}

export default function AnimatedListDemo({ className }) {

  
  // const [notifications, setNotifications] = useState([]);
  // const socketRef = useRef(null);
  // const connectWebSocket = () => {
  //   // Only create a WebSocket connection if it's not open
  //   if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
  //     console.log("Attempting to create a WebSocket connection...");
  
  //     socketRef.current = new WebSocket("wss://crm.webbixel.com/notification");
  
  //     socketRef.current.onopen = () => {
        
  //       console.log("WebSocket connection established");
  //       console.log("WebSocket readyState:", socketRef.current?.readyState); 
  //     };
  
  //     socketRef.current.onmessage = (event) => {
  //       const newNotification = JSON.parse(event.data);
  //       console.log("Received message:", newNotification);
  //       setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
  //     };
  
  //     socketRef.current.onerror = (error) => {
  //       console.error("WebSocket error:", error);
  //     };
  
  //     socketRef.current.onclose = (event) => {
  //       console.log("WebSocket connection closed:", event);
  //       // Try reconnecting after a delay
  //       setTimeout(connectWebSocket, 5000); // Retry after 5 seconds
  //     };
  //   }
  // };
  
  // useEffect(() => {
  //   connectWebSocket();
  
  //   // Cleanup WebSocket connection on unmount
  //   return () => {
  //     if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
  //       console.log("Closing WebSocket connection");
  //       socketRef.current.close();
  //     }
  //   };
  // }, []);

  // console.log("WebSocket readyState:", socketRef.current?.readyState);

  return (
    <div className={cn("relative flex h-[500px] w-full flex-col overflow-hidden p-2", className)}>
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  )
}
