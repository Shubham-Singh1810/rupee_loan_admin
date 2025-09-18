import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  loanTypeListServ,
  deleteLoanTypeServ,
} from "../services/loan.services";
function Sidebar({ isCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [list, setList] = useState([]);
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
  useEffect(() => {
    getListFunc();
  }, []);
  const navItems = [
    {
      title: "Dashboard",
      list: [
        {
          menu: "Dashboard",
          path: "/",
          icon: "bi bi-speedometer2", // dashboard
        },
        {
          menu: "Analytics",
          path: "/analytics",
          icon: "bi bi-graph-up", // analytics
        },
      ],
    },
    {
      title: "Staff Management",
      list: [
        {
          menu: "Staff/Agent",
          icon: "bi bi-person-workspace", // branches
          path: "/agent-list",
        },
        
      ],
    },
    {
      title: "Branch Management",
      list: [
        {
          menu: "Branches",
          icon: "bi bi-diagram-3", // branches
          path: "/branches",
        },
      ],
    },
    
    {
      title: "User Management",
      list: [
        {
          menu: "Users",
          icon: "bi bi-people", // users
          subMenu: [
            { name: "All Users", path: "/all-users", notificationCount: 10 },
            {
              name: "Active Users",
              path: "/active-users",
              notificationCount: 10,
            },
            {
              name: "Verified Users",
              path: "/verified-users",
              notificationCount: 10,
            },
            {
              name: "Newly Registered",
              path: "/newly-registered-users",
              notificationCount: 10,
            },
            {
              name: "Active Loan Users",
              path: "/active-loan-users",
              notificationCount: 10,
            },
            {
              name: "Users With Balance",
              path: "/users-with-balance",
              notificationCount: 10,
            },
            {
              name: "Blocked Users",
              path: "/blocked-users",
              notificationCount: 10,
            },
          ],
        },
      ],
    },
    {
      title: "Loan Management",
      list: [
        {
          menu: "Loans",
          icon: "bi bi-cash-coin", // loans
          subMenu: [
            {
              name: "All Loans",
              path: "/all-applications", // yaha loanId ka filter nahi rahega
              notificationCount: 0,
            },
            ...list?.map((loan) => ({
              name: loan?.name,
              path: `/${loan?.name
                .replace(/\s+/g, "-")
                .toLowerCase()}-applications/${loan?._id}`,
              notificationCount: 0,
            })),
          ],
        },
      ],
    },
    {
      title: "Fund Management",
      list: [
        {
          menu: "Transactions",
          icon: "bi bi-bank", // fund mgmt
          subMenu: [
            {
              name: "Deposit List",
              path: "/deposit-list",
              notificationCount: 10,
            },
            {
              name: "Withdraw List",
              path: "/withdraw-list",
              notificationCount: 10,
            },
          ],
        },
      ],
    },
    {
      title: "System Management",
      list: [
        {
          menu: "Loan Type",
          path: "/loan-type-list",
          icon: "bi bi-ui-checks-grid", // loan type
        },
         {
          menu: "Role Management",
          icon: "bi bi-key", // branches
           subMenu: [
            { name: "Roles", path: "/role-list", notificationCount: 10 },
            {
              name: "Create Role",
              path: "/assign-role",
              notificationCount: 10,
            },
            
            
          ],
        },
        {
          menu: "Policies",
          icon: "bi bi-file-earmark-text", // policies
          subMenu: [
            {
              name: "Terms & Condition",
              path: "/terms-condition",
              notificationCount: 10,
            },
            {
              name: "Privacy Policy",
              path: "/privacy-policy",
              notificationCount: 10,
            },
            {
              name: "Cookie Policy",
              path: "/cookiee-policy",
              notificationCount: 10,
            },
          ],
        },
        {
          menu: "Notify",
          path: "/notify",
          icon: "bi bi-bell", // notify
        },
        {
          menu: "Documents",
          path: "/documents",
          icon: "bi bi-file", // notify
        },
      ],
    },
    {
      title: "Support Management",
      list: [
        {
          menu: "Contact Queries",
          path: "/contact-queries",
          icon: "bi bi-telephone", // contact
        },
        // {
        //   menu: "Tickets",
        //   icon: "bi bi-ticket-detailed", 
        //   subMenu: [
        //     { name: "All Ticket", path: "/all-tickets", notificationCount: 10 },
        //     { name: "Ticket Category", path: "/ticket-categories", notificationCount: 10 },
        //     {
        //       name: "Open Ticket",
        //       path: "/opened-tickets",
        //       notificationCount: 10,
        //     },
        //     {
        //       name: "Closed Ticket",
        //       path: "/closed-tickets",
        //       notificationCount: 10,
        //     },
            
        //   ],
        // },
        {
          menu: "FAQ'S",
          path: "/faq-list",
          icon: "bi bi-question-circle", 
        },
      ],
    },
  ];
  const [isOpen, setIsOpen] = useState([]);
  const toggleMenu = (menu) => {
    setIsOpen(
      (prev) =>
        prev.includes(menu)
          ? prev.filter((m) => m !== menu) 
          : [...prev, menu] 
    );
  };
  return (
    <aside
      id="sidebar"
      className={"sidebar " + (isCollapsed ? " collapsed" : " ")}
    >
      <div
        className={
          "brand   " +
          (isCollapsed ? " justify-content-center" : " justify-content-start")
        }
      >
        <div className="logo ">
          <img src="/assets/images/logo.jpeg" alt="" width="100%" />
        </div>
        {!isCollapsed && <div className="title">Rupee Loan</div>}

        <button
          id="closeSidebar"
          className="btn btn-sm btn-light ms-auto d-lg-none"
          aria-label="Close sidebar"
        >
          <i className="bi bi-x-lg" />
        </button>
      </div>
      <nav className="menu">
        {navItems?.map((value, i) => {
          return (
            <div className={isCollapsed ? " mb-2" : " mb-4"}>
              {!isCollapsed && (
                <div className="section-title">{value?.title}</div>
              )}

              <ul className="list-unstyled m-0">
                {/* Dashboard */}
                {value?.list?.map((v, i) => {
                  if (v?.subMenu?.length > 0) {
                    return (
                      <li className="nav-item position-relative" data-flyout="">
                        <a
                          className={`nav-link cursor ${
                            v?.subMenu?.some(
                              (s) => s.path === location.pathname
                            )
                              ? " active"
                              : " "
                          }`}
                          data-node=""
                          onClick={(e) => {
                            e.preventDefault(); // page refresh na ho
                            toggleMenu(v?.menu);
                          }}
                        >
                          <span className="icon">
                            <i className={v?.icon} />
                          </span>
                          <span className="text">{v?.menu}</span>
                          <i className="bi bi-chevron-down caret" />
                        </a>
                        {!isCollapsed ? (
                          <div
                            className={
                              "submenu  cursor " +
                              (isOpen.includes(v?.menu)
                                ? " d-block"
                                : " d-none")
                            }
                          >
                            {" "}
                            {v?.subMenu?.map((subMenu, i) => {
                              return (
                                <a
                                  className={
                                    "subitem animate_animated animate_fadeIn cursor " +
                                    (subMenu?.path === location.pathname
                                      ? " textThemePrimary font500 "
                                      : " ")
                                  }
                                  onClick={() => navigate(subMenu?.path)}
                                >
                                  {subMenu?.name}
                                </a>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="subMenuPopup shadow">
                            {v?.subMenu?.map((subMenu, i) => {
                              return (
                                <a
                                  className={
                                    "subitem animate_animated animate_fadeIn cursor " +
                                    (subMenu?.path === location.pathname
                                      ? " textThemePrimary font500 "
                                      : " ")
                                  }
                                  onClick={() => navigate(subMenu?.path)}
                                >
                                  {subMenu?.name}
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </li>
                    );
                  } else {
                    return (
                      <li className="nav-item position-relative" data-flyout="">
                        <a
                          onClick={() => navigate(v?.path)}
                          className={`nav-link cursor d-flex justify-content-center ${
                            v.path === location.pathname ? " active" : " "
                          }`}
                          data-node=""
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
