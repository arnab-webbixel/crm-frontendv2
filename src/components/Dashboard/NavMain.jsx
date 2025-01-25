import React , {useState}from 'react'

import { ChevronRight,  } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import { useBreadcrumb } from '@/context/BreadCrumbContext'
import { FaMinus } from "react-icons/fa";
import { NavLink } from 'react-router-dom'
import PlanButton from '@/components/Plan/PlanButton';
import PricingCard from "../Pricing/PricingCard";
const NavMain = ({items, isPremium }) => {

    const {updateBreadcrumb}= useBreadcrumb();
    const [showPricing, setShowPricing] = useState(false) 

    const handleItemClick = (itemTitle, subItemTitle = null) => {
        if (subItemTitle) {
          updateBreadcrumb([itemTitle,subItemTitle]);
        } else {
          updateBreadcrumb([itemTitle]);
        }
      };
      const handleSalesClick = () => {
        if (!isPremium) {
          console.log("Sales clicked, showing pricing card.");
          setShowPricing(true); // Show PricingCard for non-premium users
        }
      };
    


  return (
    <>
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          // Conditional logic for "Sales" item
          if (item.title === "Sales" && item.showPlanButton && !isPremium) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} onClick={handleSalesClick}>
                  <span className="flex items-center space-x-2 text-gray-500">
                    {item.icon && <item.icon className="text-[#0086a7] font-extrabold" />}
                    <span className="text-[#757575] text-xl">{item.title}</span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          // Render other items or accessible "Sales" for premium users
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <NavLink to={item.url}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      onClick={() => handleItemClick(item.title)}
                    >
                      {item?.icon && <item.icon className="text-[#0086a7] font-extrabold" />}
                      <span className="text-[#757575] text-xl">{item.title}</span>
                      {item?.items && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-white" />
                      )}
                    </SidebarMenuButton>
                  </NavLink>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <NavLink
                            to={subItem.url}
                            onClick={() => handleItemClick(item.title, subItem.title)}
                          >
                            <span className="text-[#757575]">
                              <FaMinus />
                            </span>
                            <span className="text-[#757575]">{subItem.title}</span>
                          </NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>

    {/* Conditionally render PricingCard */}
    {showPricing && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative">
          <PricingCard />
          <button
            className="absolute top-0 right-0 p-2 bg-white rounded-full shadow-md"
            onClick={() => setShowPricing(false)}
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    )}
  </>
  )
}

export default NavMain