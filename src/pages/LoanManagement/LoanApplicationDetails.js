import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TopNav from "../../components/TopNav";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetailsServ } from "../../services/user.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NoDataScreen from "../../components/NoDataScreen";
import { toast } from "react-toastify";
import TableNavItems from "../../components/TableNavItems";
import {
  getEmisListServ,
  deleteLoanApplicationServ,
  getLoanStatsServ,
} from "../../services/loanApplication.services";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import Pagination from "../../components/Pagination";
function LoanApplicationDetails() {
  const [list, setList] = useState([]);
  const [documentCount, setDocumentCount] = useState();
  const [details, setDetails] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const [showSkelton, setShowSkelton] = useState(false);
  const [showListSkelton, setShowListSkelton] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    pincode: "",
    address: "",
    state: "",
    city: "",
    dob: "",
    gender: "",
    profilePic: "",
  });
  const getUserDetailsFunc = async (id) => {
    setShowSkelton(true);
    try {
      let response = await getUserDetailsServ(id);
      if (response?.data?.statusCode == "200") {
        setDetails(response?.data?.data);
        let userDetails = response?.data?.data;
        setFormData({
          firstName: userDetails?.firstName,
          lastName: userDetails?.lastName,
          email: userDetails?.email,
          phone: userDetails?.phone,
          pincode: userDetails?.pincode,
          address: userDetails?.address,
          state: userDetails?.state,
          city: userDetails?.city,
          dob: userDetails?.dob,
          gender: userDetails?.gender,
          profilePic: "",
          profilePrev: userDetails?.profilePrev,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setShowSkelton(false);
  };
  useEffect(() => {
    getUserDetailsFunc(params?.id);
  }, [params?.id]);
  const [payload, setPayload] = useState({
    pageNo: 1,
    pageCount: 10,
    status: "",
    loanId: "",
    userId: params?.id,
  });
  const getListFunc = async () => {
    if (list?.length == 0) {
      setShowListSkelton(true);
    }
    try {
      let response = await getEmisListServ(payload);
      if (response?.data?.statusCode == "200") {
        setList(response?.data?.data);
        setDocumentCount(response?.data?.documentCount);
      }
    } catch (error) {
      console.log(error);
    }
    setShowListSkelton(false);
  };

  useEffect(() => {
    getListFunc();
  }, [payload]);
  const navItems = [
    {
      name: "Application",
      path: `/user-details/${params?.id}`,
      img: "https://cdn-icons-png.flaticon.com/128/2991/2991106.png",
    },
    {
      name: "User",
      path: `/user-employemt-details/${params?.id}`,
      img: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
    },
    {
      name: "Branch",
      path: `/user-documents/${params?.id}`,
      img: "https://cdn-icons-png.flaticon.com/128/66/66455.png",
    },
    {
      name: "Loan Product",
      path: `/user-pending-emis/${params?.id}`,
      img: "https://cdn-icons-png.flaticon.com/128/6619/6619116.png",
    },
    {
      name: "Scheduled EMIs",
      path: `/user-transection-history/${params?.id}`,
      img: "https://cdn-icons-png.flaticon.com/128/15233/15233273.png",
    },
  ];
 
  const [isEditable, setIsEditable] = useState(false);
 

  return (
    <div className="container-fluid py-3">
      {/* User Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
            className="img-fluid rounded-circle"
            width={50}
            alt="User"
          />
          <div className="ms-3">
            <h5 className="mb-1">Personal Loan</h5>
            <h6 className="text-secondary">
              Application ID: {details?.code} RL2025
            </h6>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="d-flex justify-content-between align-items-center w-100">
        <ul
          className="nav nav-tabs mb-4 bg-white  w-100 "
          id="loanTabs"
          role="tablist"
        >
          {navItems?.map((v, i) => {
            return (
              <li className="nav-item   " role="presentation">
                <button
                  className={
                    "nav-link  d-flex align-items-center" +
                    (v?.name == "Application" ? " active" : " ")
                  }
                  onClick={() => navigate(v?.path)}
                  id="personal-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#personal"
                  type="button"
                  role="tab"
                >
                  <img src={v?.img} className="me-2" width={18} />
                  {v?.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="tab-content user-detail-page bg-light">
        {/* Personal Tab */}
        <div
          className="tab-pane fade show active"
          id="personal"
          role="tabpanel"
          aria-labelledby="personal-tab"
        >
          <div className="card  border-0 p-2 mb-4 bg-white">
            <div className="row g-3">
              <div className="col-md-7">
                <label className="form-label">Loan Amount</label>
                <input
                  type="text"
                  className="form-control"
                  readOnly={!isEditable}
                  value={formData?.firstName}
                  style={{ background: !isEditable ? "whitesmoke" : "white" }}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e?.target?.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Tenure</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData?.lastName}
                  readOnly={!isEditable}
                  style={{ background: !isEditable ? "whitesmoke" : "white" }}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e?.target?.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Tenure Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData?.email}
                  readOnly={!isEditable}
                  style={{ background: !isEditable ? "whitesmoke" : "white" }}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e?.target?.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Intrest Rate</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData?.phone}
                  readOnly={!isEditable}
                  style={{ background: !isEditable ? "whitesmoke" : "white" }}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e?.target?.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Intrest Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData?.dob}
                  readOnly={!isEditable}
                  style={{ background: !isEditable ? "whitesmoke" : "white" }}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e?.target?.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Repayment Frequency</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData?.gender}
                  readOnly={!isEditable}
                  style={{ background: !isEditable ? "whitesmoke" : "white" }}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e?.target?.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Freequency Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData?.city}
                  readOnly={!isEditable}
                  style={{ background: !isEditable ? "whitesmoke" : "white" }}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e?.target?.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Start Date</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData?.pincode}
                  readOnly={!isEditable}
                  style={{ background: !isEditable ? "whitesmoke" : "white" }}
                  onChange={(e) =>
                    setFormData({ ...formData, pincode: e?.target?.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">End Date</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData?.pincode}
                  readOnly={!isEditable}
                  style={{ background: !isEditable ? "whitesmoke" : "white" }}
                  onChange={(e) =>
                    setFormData({ ...formData, pincode: e?.target?.value })
                  }
                />
              </div>
              <div className="d-flex justify-content-end">
                <div
                  className="btn btn-secondary mx-2"
                  onClick={() => {
                    setIsEditable(!isEditable);
                    isEditable
                      ? toast.info("Fields are set to be readonly")
                      : toast.info("You can now start editing the fields");
                  }}
                >
                  Enable Editing
                </div>
                <div
                  className="btn bgThemePrimary"
                  onClick={() => toast.info("Work in progress")}
                >
                  Submit
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default LoanApplicationDetails;
