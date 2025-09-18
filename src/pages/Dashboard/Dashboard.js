import React from "react";
import Sidebar from "../../components/Sidebar";
import TopNav from "../../components/TopNav";

function Dashboard() {
  return (
    <div className="container-fluid main-content-box py-3">
      <div className="container maxw-1400">
        {/* KPIs */}
        <div className="row g-3">
          {/* Loan Applications */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card-soft p-3 kpi">
              <div className="d-flex justify-content-between align-items-center">
                <span
                  className="icon"
                  style={{ background: "#f4f6ff", color: "var(--primary)" }}
                >
                  <i className="bi bi-journal-text" />
                </span>
                <div className="card-soft-content">
                  <div className="text-uppercase small">Applications</div>
                  <div className="value">1,245</div>
                  <div className="delta text-success">
                    +5.2% from last month
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Approved Loans */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card-soft p-3 kpi">
              <div className="d-flex justify-content-between align-items-center">
                <span
                  className="icon"
                  style={{ background: "#f4f6ff", color: "var(--primary)" }}
                >
                  <i className="bi bi-check2-circle" />
                </span>
                <div className="card-soft-content">
                  <div className="text-uppercase small">Approved Loans</div>
                  <div className="value">872</div>
                  <div className="delta text-success">
                    +3.8% from last month
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Disbursed Amount */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card-soft p-3 kpi">
              <div className="d-flex justify-content-between align-items-center">
                <span
                  className="icon"
                  style={{ background: "#f4f6ff", color: "var(--primary)" }}
                >
                  <i className="bi bi-currency-rupee" />
                </span>
                <div className="card-soft-content">
                  <div className="text-uppercase small">Disbursed</div>
                  <div className="value">₹2.35 Cr</div>
                  <div className="delta text-success">
                    +6.1% from last month
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Active Customers */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card-soft p-3 kpi">
              <div className="d-flex justify-content-between align-items-center">
                <span
                  className="icon"
                  style={{ background: "#f4f6ff", color: "var(--primary)" }}
                >
                  <i className="bi bi-people" />
                </span>
                <div className="card-soft-content">
                  <div className="text-uppercase small">Active Customers</div>
                  <div className="value">1,032</div>
                  <div className="delta text-success">
                    +4.5% from last month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
}

export default Dashboard;
