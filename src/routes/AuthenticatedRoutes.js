import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Analytics from "../pages/Dashboard/Analytics";
import CreateLoan from "../pages/LoanTypeManagement/CreateLoan";
import AllUsers from "../pages/UserManagement/AllUsers";
import ActiveUsers from "../pages/UserManagement/ActiveUsers";
import VerifiedUsers from "../pages/UserManagement/VerifiedUsers";
import NewlyRegisteredUsers from "../pages/UserManagement/NewlyRegisteredUsers";
import BlockedUsers from "../pages/UserManagement/BlockedUsers";
import BalanceUsers from "../pages/UserManagement/BalanceUsers";
import ActiveLoanUsers from "../pages/UserManagement/ActiveLoanUsers";
import DepositList from "../pages/FundManagement/DepositList";
import WithdrawList from "../pages/FundManagement/WithdrawList";
import LoanTypeList from "../pages/LoanTypeManagement/LoanTypeList";
import TermsAndCondition from "../pages/Policy/TermsAndCondition";
import PrivacyPolicy from "../pages/Policy/PrivacyPolicy";
import CookieePolicy from "../pages/Policy/CookieePolicy";
import Notify from "../pages/Notification/Notify";
import ContactQueryList from "../pages/SupportManagement/ContactQueryList";
import AllTicket from "../pages/Ticket/AllTicket";
import ClosedTicket from "../pages/Ticket/ClosedTicket";
import FaqList from "../pages/SupportManagement/FaqList";
import EditLoanType from "../pages/LoanTypeManagement/EditLoanType";
import UserDetails from "../pages/UserManagement/UserDetails";
import UserEmployementDetails from "../pages/UserManagement/UserEmployementDetails";
import UserDocuments from "../pages/UserManagement/UserDocuments";
import UserLoanHistory from "../pages/UserManagement/UserLoanHistory";
import AuthenticatedLayout from "../Layout/AuthenticatedLayout";
import Branches from "../pages/BranchManagement/Branches";
import Documents from "../pages/Documents/Documents";
import ApplicationList from "../pages/LoanManagement/ApplicationList";
import CreateUser from "../pages/UserManagement/CreateUser";
import AllApplicationList from "../pages/LoanManagement/AllApplicationList";
import CreateLoanApplication from "../pages/LoanManagement/CreateLoanApplication";
import EditLoanApplication from "../pages/LoanManagement/EditLoanApplication";
import UserEmis from "../pages/UserManagement/UserEmis";
import UserTransectionHistory from "../pages/UserManagement/UserTransectionHistory";
import LoanApplicationDetails from "../pages/LoanManagement/LoanApplicationDetails";
import TicketCategories from "../pages/Ticket/TicketCategories";
import OpenTicket from "../pages/Ticket/OpenTicket";
import ChatBox from "../pages/Ticket/ChatBox";
import AssignRole from "../pages/RoleManagement/AssignRole";
import AdminList from "../pages/AdminManagement/AdminList";
import RoleList from "../pages/RoleManagement/RoleList";
import UpdateRole from "../pages/RoleManagement/UpdateRole";
import Profile from "../pages/MyProfile/Profile";
import Overview from "../pages/MyProfile/Overview";
import Setting from "../pages/MyProfile/Setting";
function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<AuthenticatedLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />

        {/* Loan routes started */}
        <Route path="/branches" element={<Branches />} />

        {/* Loan routes ended */}

        {/* User routes started */}
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/active-users" element={<ActiveUsers />} />
        <Route path="/verified-users" element={<VerifiedUsers />} />
        <Route
          path="/newly-registered-users"
          element={<NewlyRegisteredUsers />}
        />
        <Route path="/active-loan-users" element={<ActiveLoanUsers />} />
        <Route path="/users-with-balance" element={<BalanceUsers />} />
        <Route path="/blocked-users" element={<BlockedUsers />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
        <Route
          path="/user-employemt-details/:id"
          element={<UserEmployementDetails />}
        />
        <Route path="/user-documents/:id" element={<UserDocuments />} />
        <Route path="/user-loan-history/:id" element={<UserLoanHistory />} />
        <Route path="/user-emis/:id" element={<UserEmis/>} />
        <Route path="/user-transection-history/:id" element={<UserTransectionHistory />} />
        {/* User routes ended
 
        {/* Fund Management routes started */}
        <Route path="/deposit-list" element={<DepositList />} />
        <Route path="/withdraw-list" element={<WithdrawList />} />
        {/* Fund Management routes ended */}

        {/* loan applications routes started */}
        <Route path="/:loanName/:loanId" element={<ApplicationList />} />
        <Route path="/all-applications" element={<AllApplicationList />} />
        <Route path="/create-application" element={<CreateLoanApplication />} />
        <Route path="/update-loan-application/:id" element={<EditLoanApplication />} />
        <Route path="/loan-application-details/:id" element={<LoanApplicationDetails />} />

        {/* loan applications routes ended */}

        {/* System Management routes started */}
        <Route path="/loan-type-list" element={<LoanTypeList />} />
        <Route path="/create-loan-type" element={<CreateLoan />} />
        <Route path="/update-loan-type/:id" element={<EditLoanType />} />
        <Route path="/terms-condition" element={<TermsAndCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/Cookiee-policy" element={<CookieePolicy />} />
        <Route path="/notify" element={<Notify />} />
        <Route path="/documents" element={<Documents />} />
        {/* System Management routes ended */}

        {/* Support Management routes ended */}
        <Route path="/contact-queries" element={<ContactQueryList />} />
        <Route path="/all-tickets" element={<AllTicket />} />
        <Route path="/ticket-categories" element={<TicketCategories />} />
        <Route path="/opened-tickets" element={<OpenTicket />} />
        <Route path="/closed-tickets" element={<ClosedTicket />} />
        <Route path="/chat-details/:id" element={<ChatBox />} />
      
        <Route path="/faq-list" element={<FaqList />} />
        {/* Support Management routes ended */}

        {/* Command center */}
        <Route path="/agent-list" element={<AdminList />} />
        <Route path="/role-list" element={<RoleList />} />
        <Route path="/assign-role" element={<AssignRole />} />
        <Route path="/update-role/:id" element={<UpdateRole />} />

        {/* Profile Section*/}
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/setting" element={<Setting />} />
      </Route>
    </Routes>
  );
}

export default AuthenticatedRoutes;
