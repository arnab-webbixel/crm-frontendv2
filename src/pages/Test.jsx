import React, {useEffect} from 'react';
import {logo} from '../assets'
import { Line } from "react-chartjs-2"; 
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '@mui/material';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/Chart';
import { PieChart } from 'lucide-react';
import { Label, Pie, RadialBarChart } from 'recharts';
import { TrendingUp } from '@mui/icons-material';
import RescheduleTimeline from '@/components/ui/RescheduleTimeline';
import Calender from '@/components/calender/Calender';
import { events } from '@/utils/constants';

import Typewriter from 'typewriter-effect/dist/core';



const Dashboard = () => {
  // Sample chart data for Sales Performance
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Months for X-axis
    datasets: [
      {
        label: "Sales Performance",
        data: [30, 45, 60, 55, 70, 90], // Sales data
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Chart options for customization
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Performance from January to June 2024",
      },
    },
  };
  //Access the current role from redux state
  const role=useSelector(state=>state.role.role)
  const dispatch=useDispatch();

  //Simulate a fetch call to get the user data
  const fetchUserData=async()=>{
    try {
      const response=await fetchUserData("http://46.202.163.75:3008/api/v1/staffs")
      console.log(response)
      const data=await response.json();

      //Set role based on user data
      if(data.success){
        if(user.role=="caller"){
          dispatch(setRole(user.role)); //Set role in redux
        }else{
          dispatch(clearRole()); //Clear role if not a "caller"
        }
      }
    } catch (error) {
      toast.error("Failed to fetch user data")
    }
  }
  useEffect(()=>{
    fetchUserData()
  },[])

 
    if(role=="caller"){
      return (
      <div className="bg-[#0f2b32] min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img 
            src={logo} 
            alt="Webbixel Logo" 
            style={{ height: '50px', width: '160px' }}
          />
        </div>
        <div className="flex space-x-4 items-center">
          <button className="text-gray-600">
            <i className="far fa-bell"></i>
          </button>
          <button className="text-gray-600">
            <i className="far fa-user-circle"></i>
          </button>
          <button className="text-gray-600">
            <i className="far fa-envelope"></i>
          </button>
        </div>
      </header>

      {/* Main Dashboard */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-white w-64 min-h-screen p-6">
          <nav className="space-y-4">
            <a href="#" className="flex items-center space-x-4 text-[#14758d] font-medium">
              <i className="fas fa-th-large"></i>
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-4 text-gray-600 hover:text-[#14758d]">
              <i className="fas fa-users"></i>
              <span>Staff Info</span>
            </a>
            <a href="#" className="flex items-center space-x-4 text-gray-600 hover:text-[#14758d]">
              <i className="fas fa-handshake"></i>
              <span>Client Info</span>
            </a>
            <a href="#" className="flex items-center space-x-4 text-gray-600 hover:text-[#14758d]">
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </a>
          </nav>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">

        <div
            className="flex justify-end items-center gap-2 mr-0 cursor-pointer">
            <div className= "w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
              <NotificationsNoneIcon
              className="w-8 h-8"/>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center"
             
            >
              <PersonOutlineIcon className="w-8 h-8" />
            </div>

         
            <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
               <EmailOutlinedIcon className="w-8 h-8" />
          </div>

            <div></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 font-sans">
          <Typewriter onInit ={(typewriter)=>{
              typewriter.typeString('Hi Paromita')
              .pauseFor(1000)
              .start()

            }}/>
            {/* Hi Paromita */}
            </h1>
          {/* Overview Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
          
              {Array(4)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="bg-[#103c47] p-4 shadow rounded-lg">
                  <h3 className="text-white-600">Lorem Ipsum</h3>
                  <p className="text-2xl font-bold">{800 * (index + 1)}</p>
                  <p className="text-gray-400 text-sm">Lorem Ipsum 2000</p>
                </div>
              ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-3 gap-4">
           
            <div className="bg-white p-6 shadow rounded-lg col-span-2">
               <h3 className="text-lg font-bold">Sales Performance</h3>
               <p className="text-gray-400 mb-4">January - June 2024</p>
               <div className="h-40">
                 <Line data={chartData} options={chartOptions} />
               </div>
             </div>

            {/* Today's Task */}
            <div className="bg-white p-6 shadow rounded-lg h-[400px]">
              <h3 className="text-lg font-bold">Today's Task</h3>
              <p className="text-gray-400">See your tasks for today</p>
       
               <div className="grid grid-rows-2 gap-4 h-60">
    {/* First Box */}
    <div className="bg-gray-200 rounded p-4 flex flex-col items-start">
      <p className="text-2xl ">Task-1</p>
      <h6 className=''>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa</h6>
    </div>

    {/* Second Box */}
    <div className="bg-gray-200 rounded  p-4 flex flex-col items-start">
      <p className="text-2xl">Task-2</p>
      <h6>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa</h6>
    </div>
  </div>
            </div>
          </div>
        </main>
      </div>
      

      {/* Footer */}
      <footer className="bg-white py-4 text-center">
        <p className="text-gray-500 text-sm">&copy; 2024 Webbixel. All rights reserved.</p>
      </footer>
    </div>
      );
    }
   else{
    return(  <div className="bg-[#0f2b32] min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <img
          src={logo}
          alt="Webbixel Logo"
          style={{ height: "50px", width: "160px" }}
        />
      </header>

      {/* Main Dashboard */}
      <div className="flex bg-[#086277]">
        {/* Sidebar */}
        <aside className="bg-white w-64 min-h-screen p-6">
          <nav className="space-y-4">
            <a
              href="#"
              className="flex items-center space-x-4 text-[#14758d] font-medium"
            >
              <i className="fas fa-th-large"></i>
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-4 text-gray-600 hover:text-[#14758d]"
            >
              <i className="fas fa-users"></i>
              <span>Staff Info</span>
            </a>
          </nav>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">

          <div
            className="flex justify-end items-center gap-2 mr-0 cursor-pointer">
            <div className= "w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
              <NotificationsNoneIcon
              className="w-8 h-8"/>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center"
             
            >
              <PersonOutlineIcon className="w-8 h-8" />
            </div>

         
            <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
               <EmailOutlinedIcon className="w-8 h-8" />
          </div>

            <div></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 font-sans">Hi Paromita</h1>
          {/* Overview Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="bg-[#103c47] p-4 shadow rounded-lg">
                  <h3 className="text-white-600">Lorem Ipsum</h3>
                  <p className="text-2xl font-bold">{800 * (index + 1)}</p>
                  <p className="text-gray-400 text-sm">Lorem Ipsum 2000</p>
                </div>
              ))}
          </div>

          {/* Charts */}

          <div className="grid grid-cols-3 gap-4">
            {/* Card 1 */}
            <Card className="flex flex-col">
              <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart - Donut with Text</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer className="mx-auto aspect-square max-h-[250px]">
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={chartData}
                      dataKey="visitors"
                      nameKey="browser"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) =>
                          viewBox && (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalVisitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy + 24}
                                className="fill-muted-foreground"
                              >
                                Visitors
                              </tspan>
                            </text>
                          )
                        }
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
              </CardFooter>
            </Card>

            {/* Card 2 */}
            <Card className="flex flex-col">
              <CardHeader className="items-center pb-0">
                <CardTitle>Radial Chart - Stacked</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 items-center pb-0">
                <div className="mx-auto w-full max-w-[300px] h-[300px]">
                  <RadialBarChart
                    width={300}
                    height={300}
                    // data={radialChartData}
                    innerRadius="30%"
                    outerRadius="90%"
                    startAngle={180}
                    endAngle={0}
                  >
                    {/* <PolarRadiusAxis tick={false} axisLine={false} /> */}
                    {/* {radialChartData.map((data, index) => (
                      <RadialBar
                        key={index}
                        dataKey="value"
                        cornerRadius={10}
                        fill={data.fill}
                        name={data.name}
                      />
                    ))} */}
                    <Label
                      content={({ viewBox }) =>
                        viewBox && (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy - 16}
                              className="text-xl font-bold"
                            >
                              {radialTotalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy + 4}
                              className="text-sm"
                            >
                              Visitors
                            </tspan>
                          </text>
                        )
                      }
                    />
                  </RadialBarChart>
                </div>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="flex flex-col">
              <RescheduleTimeline events={events} />
              <Calender />
            </Card>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white py-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; 2024 Webbixel. All rights reserved.
        </p>
      </footer>
    </div>)
   }
  

};

export default Dashboard;
