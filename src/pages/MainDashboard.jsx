import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TbUsersGroup } from "react-icons/tb";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import RadialChartCard from "@/components/ui/RadialChartCard";
import { fetchCallStatsById } from "../utils/store/countSlice";
import Calender from "@/components/calender/Calender";
import CallStats from "@/components/ui/CallStats";
import {TotalCall} from '@/components/ui/TotalCall'
import UpdatedCall from "@/components/ui/UpdatedCall";
const MainDashboard = () => {
  const [apiData, setApiData] = useState([]);
  const { callStats, loading, error } = useSelector((state) => state.count);
  console.log("API Data" + callStats)

  const { user } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (!callStats.length) {
      dispatch(fetchCallStatsById(user.id));
    } else {
      setApiData(callStats);
    }

  }, [dispatch, callStats]);

  const transformedChartData = useMemo(() => {
    const colorMap = {
      "archive": "#E9D4FE",
      "hot-call": "#4b0082",
      "warm-call": "#EC4899",
      "follow-up": "#32CD32", 
    };

    return apiData.map((item) => ({
      browser: item._id,
      visitors: item.count,
      fill: colorMap[item._id] || "#BDBDBD", // Default color if not found in colorMap
    }));
    
  }, [apiData]);

  const totalVisitors = useMemo(
    () => transformedChartData.reduce((acc, curr) => acc + curr.visitors, 0),
    [transformedChartData]
  );

  // Check role-based rendering conditions
  const isTelecaller = user?.role === "telecaller";
  const isSales = user?.role === "sales";

  return (
    <div >
      
      <div className="mt-4 grid grid-cols-4 gap-4">
        <div>
          {/* Show PieChartCard for all roles */}
          <TotalCall />
        </div>
        <div className="h-120 w-100 ">
        <CallStats
      />
        </div>

        <div>
          <UpdatedCall/>
        </div>

        <div>
          {/* Show RadialChartCard only for telecallers and sales */}
          {(isTelecaller || isSales) && <RadialChartCard />}
        </div>

        <div>
          {/* Show Calendar for all roles */}
          <div style={{ width: "100%", maxWidth: "400px", margin: "auto" }}>
            <Calender />
          </div>
        </div>

      </div>

      <div>
      </div>
    
    </div>
  );
};

export default MainDashboard;
