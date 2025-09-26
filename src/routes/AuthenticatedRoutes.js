import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import NotFound from "../pages/Unauthorized/NotFound";
import Unauthorized from "../pages/Unauthorized/Unauthorized";

// Layout
import AuthenticatedLayout from "../Layout/AuthenticatedLayout";

// Dashboard
import Dashboard from "../pages/Dashboard/Dashboard";
import Analytics from "../pages/Dashboard/Analytics";

// Loan Type Management
import LoanTypeList from "../pages/LoanTypeManagement/LoanTypeList";
import CreateLoan from "../pages/LoanTypeManagement/CreateLoan";
import EditLoanType from "../pages/LoanTypeManagement/EditLoanType";

// User Management
import AllUsers from "../pages/UserManagement/AllUsers";
import ActiveUsers from "../pages/UserManagement/ActiveUsers";
import VerifiedUsers from "../pages/UserManagement/VerifiedUsers";
import NewlyRegisteredUsers from "../pages/UserManagement/NewlyRegisteredUsers";
import BlockedUsers from "../pages/UserManagement/BlockedUsers";
import BalanceUsers from "../pages/UserManagement/BalanceUsers";
import ActiveLoanUsers from "../pages/UserManagement/ActiveLoanUsers";
import CreateUser from "../pages/UserManagement/CreateUser";
import UserDetails from "../pages/UserManagement/UserDetails";
import UserEmployementDetails from "../pages/UserManagement/UserEmployementDetails";
import UserDocuments from "../pages/UserManagement/UserDocuments";
import UserLoanHistory from "../pages/UserManagement/UserLoanHistory";
import UserEmis from "../pages/UserManagement/UserEmis";
import UserTransectionHistory from "../pages/UserManagement/UserTransectionHistory";

// Loan Management
import ApplicationList from "../pages/LoanManagement/ApplicationList";
import AllApplicationList from "../pages/LoanManagement/AllApplicationList";
import CreateLoanApplication from "../pages/LoanManagement/CreateLoanApplication";
import EditLoanApplication from "../pages/LoanManagement/EditLoanApplication";
import LoanApplicationDetails from "../pages/LoanManagement/LoanApplicationDetails";
import LoanApplicationDocument from "../pages/LoanManagement/LoanApplicationDocument";
import LoanAccountDetails from "../pages/LoanManagement/LoanAccountDetails";
import LoanApplicationEmi from "../pages/LoanManagement/LoanApplicationEmi";

// Fund Management
import DepositList from "../pages/FundManagement/DepositList";
import WithdrawList from "../pages/FundManagement/WithdrawList";

// Policy
import TermsAndCondition from "../pages/Policy/TermsAndCondition";
import PrivacyPolicy from "../pages/Policy/PrivacyPolicy";
import CookieePolicy from "../pages/Policy/CookieePolicy";

// Notification
import Notify from "../pages/Notification/Notify";

// Support Management
import ContactQueryList from "../pages/SupportManagement/ContactQueryList";
import FaqList from "../pages/SupportManagement/FaqList";

// Tickets
import AllTicket from "../pages/Ticket/AllTicket";
import ClosedTicket from "../pages/Ticket/ClosedTicket";
import OpenTicket from "../pages/Ticket/OpenTicket";
import TicketCategories from "../pages/Ticket/TicketCategories";
import ChatBox from "../pages/Ticket/ChatBox";

// Branch Management
import Branches from "../pages/BranchManagement/Branches";
import ViewStaff from "../pages/BranchManagement/ViewStaff";

// Role & Admin
import AssignRole from "../pages/RoleManagement/AssignRole";
import RoleList from "../pages/RoleManagement/RoleList";
import UpdateRole from "../pages/RoleManagement/UpdateRole";
import AdminList from "../pages/AdminManagement/AdminList";

// Profile
import Profile from "../pages/MyProfile/Profile";
import Permissions from "../pages/MyProfile/Permissions";

// Documents
import Documents from "../pages/Documents/Documents";

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<AuthenticatedLayout />}>
        {/* Dashboard */}
        <Route
          element={<ProtectedRoute allowedPermissions={["Dashboard-View"]} />}
        >
          <Route path="/" element={<Dashboard />} />
        </Route>

        {/* Analytics */}
        <Route
          element={<ProtectedRoute allowedPermissions={["Analytics-View"]} />}
        >
          <Route path="/analytics" element={<Analytics />} />
        </Route>

        {/* Branch Management */}
        <Route
          element={<ProtectedRoute allowedPermissions={["Branches-View"]} />}
        >
          <Route path="/branches" element={<Branches />} />
          <Route path="/view-staff/:id" element={<ViewStaff />} />
        </Route>

        {/* Staff Management */}
        <Route
          element={<ProtectedRoute allowedPermissions={["Staff/Agent-View"]} />}
        >
          <Route path="/agent-list" element={<AdminList />} />
        </Route>

        {/* User Management */}
        <Route element={<ProtectedRoute allowedPermissions={["Users-View"]} />}>
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/active-users" element={<ActiveUsers />} />
          <Route path="/verified-users" element={<VerifiedUsers />} />
          <Route
            path="/newly-registered-users"
            element={<NewlyRegisteredUsers />}
          />
          <Route path="/active-loan-users" element={<ActiveLoanUsers />} />
          <Route path="/users-with-balance" element={<BalanceUsers />} />
          <Route path="/blocked-users" element={<BlockedUsers />} />
        </Route>
        <Route
          element={<ProtectedRoute allowedPermissions={["Users-Create"]} />}
        >
          <Route path="/create-user" element={<CreateUser />} />
        </Route>
        <Route element={<ProtectedRoute allowedPermissions={["Users-Edit"]} />}>
          <Route path="/user-details/:id" element={<UserDetails />} />
          <Route
            path="/user-employemt-details/:id"
            element={<UserEmployementDetails />}
          />
          <Route path="/user-documents/:id" element={<UserDocuments />} />
          <Route path="/user-loan-history/:id" element={<UserLoanHistory />} />
          <Route path="/user-emis/:id" element={<UserEmis />} />
          <Route
            path="/user-transection-history/:id"
            element={<UserTransectionHistory />}
          />
        </Route>

        {/* Loan Applications */}
        <Route element={<ProtectedRoute allowedPermissions={["Loans-View"]} />}>
          <Route path="/:loanName/:loanId" element={<ApplicationList />} />
          <Route path="/all-applications" element={<AllApplicationList />} />
          <Route
            path="/create-application"
            element={<CreateLoanApplication />}
          />
          <Route
            path="/update-loan-application/:id"
            element={<EditLoanApplication />}
          />
          <Route
            path="/loan-application-details/:id"
            element={<LoanApplicationDetails />}
          />
          <Route
            path="/loan-application-documents/:id"
            element={<LoanApplicationDocument />}
          />
          <Route
            path="/loan-application-account-details/:id"
            element={<LoanAccountDetails />}
          />
          <Route
            path="/loan-application-emis/:id"
            element={<LoanApplicationEmi />}
          />
        </Route>

        {/* Fund Management */}
        <Route element={<ProtectedRoute allowedPermissions={["Funds-View"]} />}>
          <Route path="/deposit-list" element={<DepositList />} />
          <Route path="/withdraw-list" element={<WithdrawList />} />
        </Route>

        {/* Loan Type Management */}
        <Route
          element={<ProtectedRoute allowedPermissions={["Loan Type-View"]} />}
        >
          <Route path="/loan-type-list" element={<LoanTypeList />} />
          <Route path="/create-loan-type" element={<CreateLoan />} />
          <Route path="/update-loan-type/:id" element={<EditLoanType />} />
        </Route>

        {/* Policies & System */}
        <Route path="/terms-condition" element={<TermsAndCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/Cookiee-policy" element={<CookieePolicy />} />
        <Route path="/notify" element={<Notify />} />

        {/* Document */}
        <Route
          element={<ProtectedRoute allowedPermissions={["Documents-View"]} />}
        >
          <Route path="/documents" element={<Documents />} />
        </Route>
        {/* Contact */}
        <Route
          element={
            <ProtectedRoute allowedPermissions={["Contact Queries-View"]} />
          }
        >
          <Route path="/contact-queries" element={<ContactQueryList />} />
        </Route>

        {/* Tickets */}
        {/* <Route
          element={<ProtectedRoute allowedPermissions={["Tickets-View"]} />}
        > */}
        <Route path="/all-tickets" element={<AllTicket />} />
        <Route path="/ticket-categories" element={<TicketCategories />} />
        <Route path="/opened-tickets" element={<OpenTicket />} />
        <Route path="/closed-tickets" element={<ClosedTicket />} />
        <Route path="/chat-details/:id" element={<ChatBox />} />
        {/* </Route> */}

        {/* faq */}
        <Route element={<ProtectedRoute allowedPermissions={["FAQ'S-View"]} />}>
          <Route path="/faq-list" element={<FaqList />} />
        </Route>
        {/* Admin & Role Management */}
        <Route element={<ProtectedRoute allowedPermissions={["Roles-View"]} />}>
          <Route path="/role-list" element={<RoleList />} />
          <Route path="/assign-role" element={<AssignRole />} />
          <Route path="/update-role/:id" element={<UpdateRole />} />
        </Route>

        {/* Profile */}
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/permissions" element={<Permissions />} />
      </Route>

      {/* Unauthorized & 404 */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AuthenticatedRoutes;
