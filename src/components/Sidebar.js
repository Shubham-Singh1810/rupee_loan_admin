import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loanTypeListServ } from "../services/loan.services";
import { useGlobalState } from "../GlobalProvider";
import { getSystemConfigrationDetailsServ } from "../services/systemConfigration.services";

function Sidebar({ isCollapsed }) {
  const { globalState } = useGlobalState();
  const navigate = useNavigate();
  const location = useLocation();
  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState([]);

  const permissions = globalState?.user?.role?.permissions || [];

  useEffect(() => {
    const getListFunc = async () => {
      try {
        let response = await loanTypeListServ();
        if (response?.data?.statusCode == "200") {
          setList(response?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getListFunc();
  }, []);

  const [systemConfigrationDetails, setSystemConfigrationDetails] = useState({
    isPaydayLoanActive: "",
    isRegularLoanActive: "",
  });
  const getConfigrationDetailsFunc = async () => {
    try {
      let response = await getSystemConfigrationDetailsServ();
      if (response?.data?.statusCode == "200") {
        setSystemConfigrationDetails({
          isPaydayLoanActive: response?.data?.data?.isPaydayLoanActive,
          isRegularLoanActive: response?.data?.data?.isRegularLoanActive,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getConfigrationDetailsFunc();
  }, []);
  // Map menus with required permissions
  const renderLoan = () => {
     {
      return {
        title: "Loan Management",
        list: [
          systemConfigrationDetails?.isRegularLoanActive && {
            menu: "Regular Loans",
            icon: "bi bi-cash-coin",
            permission: "Loans-View",
            subMenu: [
              { name: "All Loans", path: "/all-applications" },
              ...list?.map((loan) => ({
                name: loan?.name,
                path: `/${loan?.name
                  .replace(/\s+/g, "-")
                  .toLowerCase()}-applications/${loan?._id}`,
              })),
            ],
          },
          systemConfigrationDetails?.isPaydayLoanActive && {
            menu: "Payday Loans",
            icon: "bi bi-cash",
            permission: "Payday Loans-View",
            path: "/payday-loan-applications" 
            
          },
        ].filter(Boolean), // ✅ removes `false` or `undefined` items
      };
    }
  };

  const navItems = [
    {
      title: "Dashboard",
      list: [
        {
          menu: "Dashboard",
          path: "/",
          icon: "bi bi-speedometer2",
          permission: "Dashboard-View",
        },
        {
          menu: "Analytics",
          path: "/analytics",
          icon: "bi bi-graph-up",
          permission: "Analytics-View",
        },
      ],
    },
    {
      title: "Staff Management",
      list: [
        {
          menu: "Staff/Agent",
          icon: "bi bi-person-workspace",
          path: "/agent-list",
          permission: "Staff/Agent-View",
        },
      ],
    },
    {
      title: "Branch Management",
      list: [
        {
          menu: "Branches",
          icon: "bi bi-diagram-3",
          path: "/branches",
          permission: "Branches-View",
        },
      ],
    },
    {
      title: "User Management",
      list: [
        {
          menu: "Users",
          icon: "bi bi-people",
          permission: "Users-View",
          subMenu: [
            { name: "All Users", path: "/all-users" },
            { name: "Active Users", path: "/active-users" },
            { name: "Verified Users", path: "/verified-users" },
            { name: "Newly Registered", path: "/newly-registered-users" },
            { name: "Active Loan Users", path: "/active-loan-users" },
            { name: "Users With Balance", path: "/users-with-balance" },
            { name: "Blocked Users", path: "/blocked-users" },
          ],
        },
      ],
    },
    renderLoan(),

    {
      title: "Fund Management",
      list: [
        {
          menu: "Transactions",
          icon: "bi bi-bank",
          permission: "Fund Management-View",
          subMenu: [
            {
              name: "Deposit List",
              path: "/deposit-list",
              permission: "Deposit List-View",
            },
            {
              name: "Withdraw List",
              path: "/withdraw-list",
              permission: "Withdraw List-View",
            },
          ],
        },
      ],
    },
    {
      title: "System Management",
      list: [
        {
          menu: "System Configration",
          path: "/system-configration",
          icon: "bi bi-gear",
          permission: "System Configration-View",
        },
        {
          menu: "Loan Type",
          path: "/loan-type-list",
          icon: "bi bi-ui-checks-grid",
          permission: "Regular Loans-View",
        },
        {
          menu: "Role Management",
          icon: "bi bi-key",
          permission: "Roles-View",
          subMenu: [
            { name: "Roles", path: "/role-list", permission: "Roles-View" },
            {
              name: "Create Role",
              path: "/assign-role",
              permission: "Assign Role-Create",
            },
          ],
        },
        {
          menu: "Policies",
          icon: "bi bi-file-earmark-text",
          permission: "System Management-View",
          subMenu: [
            {
              name: "Terms & Condition",
              path: "/terms-condition",
              permission: "Terms & Condition-View",
            },
            {
              name: "Privacy Policy",
              path: "/privacy-policy",
              permission: "Privacy Policy-View",
            },
            {
              name: "Cookie Policy",
              path: "/cookiee-policy",
              permission: "Cookie Policy-View",
            },
          ],
        },
        {
          menu: "Notify",
          path: "/notify",
          icon: "bi bi-bell",
          permission: "Notify-View",
        },
        {
          menu: "Documents",
          path: "/documents",
          icon: "bi bi-file",
          permission: "Documents-View",
        },
        {
          menu: "Payday Loan",
          icon: "bi bi-clipboard-check",
          permission: "Payday Loans-View",
          subMenu: [
            {
              name: "Loan Configration",
              path: "/payday-loan-configration",
              permission: "Payday Loans-View",
            },
            {
              name: "Loan Purpose",
              path: "/loan-purpose",
              permission: "Payday Loans-View",
            },
          ],
        },
      ],
    },
    {
      title: "Support Management",
      list: [
        {
          menu: "Contact Queries",
          path: "/contact-queries",
          icon: "bi bi-telephone",
          permission: "Contact Queries-View",
        },
        {
          menu: "FAQ'S",
          path: "/faq-list",
          icon: "bi bi-question-circle",
          permission: "FAQ'S-View",
        },
        {
          menu: "Support Ticket",
          icon: "bi bi-file-earmark-text",
          permission: "System Management-View",
          subMenu: [
            {
              name: "All Tickets",
              path: "/all-tickets",
              permission: "All Ticket-View",
            },
            {
              name: "Ticket Categories",
              path: "/ticket-categories",
              permission: "Ticket Category-View",
            },
            {
              name: "Opened Tickets",
              path: "/opened-tickets",
              permission: "Open Ticket-View",
            },
            {
              name: "Closed Tickets",
              path: "/closed-tickets",
              permission: "Closed Ticket-View",
            },
          ],
        },
      ],
    },
  ];

  const toggleMenu = (menu) => {
    setIsOpen((prev) =>
      prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu]
    );
  };

  return (
    <aside
      id="sidebar"
      className={"sidebar " + (isCollapsed ? " collapsed" : " ")}
    >
      <div
        className={
          "brand " +
          (isCollapsed ? " justify-content-center" : " justify-content-start")
        }
      >
        <div className="logo">
          <img src="/assets/images/logo.jpeg" alt="" width="100%" />
        </div>
        {!isCollapsed && <div className="title">Rupee Loan</div>}
      </div>

      <nav className="menu">
        {navItems?.map((section, i) => {
          // Filter out items without permission
          const filteredList = section.list.filter(
            (item) => !item.permission || permissions.includes(item.permission)
          );

          if (filteredList.length === 0) return null;

          return (
            <div key={i} className={isCollapsed ? " mb-2" : " mb-4"}>
              {!isCollapsed && (
                <div className="section-title">{section?.title}</div>
              )}

              <ul className="list-unstyled m-0">
                {filteredList?.map((v, j) => {
                  if (v?.subMenu?.length > 0) {
                    // Submenu filter
                    const filteredSub = v.subMenu.filter(
                      (s) => !s.permission || permissions.includes(s.permission)
                    );
                    if (filteredSub.length === 0) return null;

                    return (
                      <li key={j} className="nav-item position-relative">
                        <a
                          className={`nav-link cursor ${
                            filteredSub.some(
                              (s) => s.path === location.pathname
                            )
                              ? " active"
                              : " "
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleMenu(v?.menu);
                          }}
                        >
                          <span className="icon">
                            <i className={v?.icon} />
                          </span>
                          <span className="text">{v?.menu}</span>
                          <i className="bi bi-chevron-down caret" />
                        </a>

                        {!isCollapsed && (
                          <div
                            className={
                              "submenu cursor " +
                              (isOpen.includes(v?.menu)
                                ? " d-block"
                                : " d-none")
                            }
                          >
                            {filteredSub.map((sub, k) => (
                              <a
                                key={k}
                                className={
                                  "subitem cursor " +
                                  (sub?.path === location.pathname
                                    ? " textThemePrimary font500 "
                                    : " ")
                                }
                                onClick={() => navigate(sub?.path)}
                              >
                                {sub?.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  } else {
                    return (
                      <li key={j} className="nav-item position-relative">
                        <a
                          onClick={() => navigate(v?.path)}
                          className={`nav-link cursor d-flex justify-content-center ${
                            v.path === location.pathname ? " active" : " "
                          }`}
                        >
                          <span className="icon">
                            <i className={v?.icon} />
                          </span>
                          <span className="text">{v?.menu}</span>
                        </a>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
