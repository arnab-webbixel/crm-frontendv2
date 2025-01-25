import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Footer from "../components/Footer/Footer";
import Login from "../components/Login/Login";
import Dashboard from "@/components/Dashboard/Dashboard";
import MainDashboard from "@/pages/MainDashboard";
import AddClient from "@/pages/client/AddClient";
import ManageClient from "@/pages/client/ManageClient";
import UpdateClient from "@/pages/client/UpdateClient";
import SalesDashboard from "@/pages/sales/SalesDashboard";
import DefaultRemark from "@/pages/setting/DefaultRemark";
import Signup from "@/components/Register/Signup";
import CompanyInformation from "@/pages/setting/CompanyInformation";
import ClientInformation from "@/pages/client/ClientInformation";
import ErrorBoundary from "./error/ErrorBoundry";
import FunctionalErrorBoundary from "./error/ErrorPage";
import ProtectedRoute from "../routes/ProtectedRoute";
import Test from "../pages/Test";
// import Test2 from "../pages/Test2";
import ForgotPassword from "@/components/Login/ForgotPassword";
import AddStaff from "@/pages/staff/AddStaff";
import ManageStaff from "@/pages/staff/ManageStaff";
import StaffLogin from "@/components/StaffLogin/StaffLogin";
// import PricingCard from "@/components/Pricing/PricingCard";

// const isPremiumUser = () => {
//   // Replace with your actual logic to check if the user has an active payment plan
//   return localStorage.getItem("isPremium") === "true";
// };

// // Custom route wrapper for payment plans
// const PaymentRoute = ({ element }) => {
//   return isPremiumUser() ? element : <Navigate to="/pricing" />;
// };

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      ),
      errorElement: <FunctionalErrorBoundary />,
      children: [
        {
          index: true,
          element: <Login />,
          // element: localStorage.getItem("token") ? (
            // <Navigate to="/main/dashboard" />
          // ) : (
          //   <Login />
          // ),
        },
        ,
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "footer",
          element: <Footer />,
        },
        {
         path: "/staff-login",
         element: <StaffLogin />,
        },
        {
          path: "/test",
          element: <Test />,
        },
        // {
        //   path: "/test2",
        //   element: <Test2 />,
        // },
        {
          path: "main", // {
            //   path: "/test2",
            //   element: <Test2 />,
            // },
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true, // Default route for "main"
              element: <MainDashboard />,
            },

            {
              path: "dashboard", // This matches "/main/dashboard"
              element: <MainDashboard />,
            },
            // {
            //   path: "staff",
            //   element: <StaffInformation />,
            // },
            {
              path: "staff/add",
              element: <AddStaff />,
            },
            {
              path: "staff/manage",
              element: <ManageStaff />,
            },
            // {
            //   path: "staff/role",
            //   element: <StaffRole />,
            // },
            {
              path: "client",
              element: <ClientInformation />,
            },
            {
              path: "client/add",
              element: <AddClient/>,
            },
            {
              path: "client/manage",
              element: <ManageClient />,
            },
            {
              path: "client/update",
              element: <UpdateClient />,
            },
            {
              path: "sales-dashboard", // New route for the Sales Dashboard
              element: <SalesDashboard />,
            },
            // {
            //   path: "setting/service-type",
            //   element: <ServiceType />,
            // },
            // {
            //   path: "setting/call-type",
            //   element: <CallType />,
            // },
            // {
            //   path: "setting/default-remark",
            //   element: <DefaultRemark />,
            // },
            // {
            //   path: "setting/company-information",
            //   element: <CompanyInformation />,
            // },
          ],
        },
      ],
    },
  ],

  {
    future: {
      v7_startTransition: true, 
    },
  }
);

export default router;
