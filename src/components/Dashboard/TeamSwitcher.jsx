import React from 'react'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import AppVersion from '../Version/AppVersion'
import {logo} from '../../assets'
import w from "@/assets/w.svg"

const TeamSwitcher = () => {

  const {state} = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
      <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square  items-center justify-center rounded-lg  text-sidebar-primary-foreground ">
                {
                  state === 'collapsed' ?( 
                    <img src={w} alt="logo" srcset="" />  ) : <img src={logo} alt="logo" className='h-[40px] w-[120px]' /> 

                }
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
              </div>
              
      </SidebarMenuButton>
      {state === 'expanded' && <div className="flex flex-1 items-center  text-left text-sm leading-tight ml-4 ">
              

                <span className="font-medium text-sm text-black">CRM+ | <AppVersion /></span>

              </div>}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default TeamSwitcher