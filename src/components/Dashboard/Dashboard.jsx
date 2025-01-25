import  { useEffect } from 'react'
import AppSidebar from "@/components/Dashboard/AppSidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { useBreadcrumb } from '@/context/BreadCrumbContext'
import { Outlet , useNavigate} from 'react-router-dom'
import Footer from '../Footer/Footer'
import w from "@/assets/w.svg"
// for mui icon
import NotificationsIcon from '@mui/icons-material/Notifications';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import { Button } from "@/components/ui/button"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserProfile } from "@/utils/store/logSlice"; 
import useDarkMode from '@/hooks/useDarkMode';
import {logout} from '../../assets'
const Dashboard = () => {

  const { breadcrumb } = useBreadcrumb();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, user, loading } = useSelector((state) => state.auth);
  const profileData = JSON.parse(JSON.stringify(profile));
//* for darkmode 
const [darkMode, toggleDarkMode] = useDarkMode(); 

useEffect(()=>{
  const token = localStorage.getItem('token');
  if (token && !profile) {
    // Fetch the user profile after login
    const userId = user?.id;
    if (userId) {
      dispatch(fetchUserProfile(userId)); // Dispatch the profile fetch
    }
  }
}, [dispatch, user, profile])

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


  return (

    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        
        <header className=" sticky top-0 z-10 flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-[#e3e5e8] border w-full dark:bg-[#e0c7ff] shadow-md">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumb.map((crumb, index) => (
                  <BreadcrumbItem key={index}>
                    {index === breadcrumb.length - 1 ? (
                      <BreadcrumbPage>{crumb}</BreadcrumbPage>
                    ) : (
                      <>
                        <BreadcrumbLink href="#">{crumb}</BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </>
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>


          </div>

          <div className='flex gap-2 mr-6 cursor-pointer '>
             <NotificationsIcon className='w-7 h-'/>
             <NightlightRoundIcon 
className={`w-7 h-7 cursor-pointer ${darkMode ? 'text-yellow-400' : 'text-gray-500'}`}
             onClick={toggleDarkMode} 
             />

             <MarkunreadIcon className='w-7 h-7' />

{/* for profile logo */}
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="bg-[#f3f3f3] hover:bg-white " >
                    <img src={w} alt="profile" className='size-8' /></Button>
                </PopoverTrigger>
                <PopoverContent className="w-60">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                   {/*...................... for profile ................................... */}
                   <Avatar>
  <AvatarImage src={w} />
  <AvatarFallback>Webbixel</AvatarFallback>
</Avatar>
                        <div>
                          
  <p className="text-sm text-gray-500">{user?.name}</p>
  <p className="text-sm text-gray-500">{user?.email}</p>
  <h4 className="font-medium text-gray-800">{profile?.address}</h4>
  <p className="text-sm text-gray-500">{profile?.phoneNo}</p>
  <p className="text-sm text-gray-500">{profile?.plan_validate}</p>


                      </div>

                {/*.............................. Profile End ............................ */}


                <h4
  className="text-sm leading-none cursor-pointer text-white bg-[#0086a7] p-2 px-4 rounded-full hover:bg-[#006f8a] transition duration-200"
  onClick={handleLogout}
>
<div className='flex w-5 h-4'>  <img src={logout} alt="logout" className='mr-4' />   <span > Logout</span>  </div> 
</h4>
                    </div>

                  </div> 
                </PopoverContent>
              </Popover>
            </div>




          </div>
        </header>


        {/* Main content area */}
        <div className="flex flex-1 flex-col gap-4  pt-0 bg-slate-400  ">
          {/* <MainDashboard/> */}
          <div className='flex-1 p-4  ' >
            <Outlet />
          </div>


        </div>


        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div> */}
          {/* <div className="min-h-[40vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        {/* </div> */}
          <Footer />
      </SidebarInset>
    </SidebarProvider>



  )
}

export default Dashboard