import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getBranchListServ,
  handleDeleteBranchServ,
  handleCreateBranchServ,
  handleUpdateBranchServ,
} from "../../services/branch.service";
import { getNotifyServ } from "../../services/notification.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NoDataScreen from "../../components/NoDataScreen";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import moment from "moment";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { useGlobalState } from "../../GlobalProvider";
function ScheduleRemainders() {
  const { globalState } = useGlobalState();
  const permissions = globalState?.user?.role?.permissions || [];
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [showSkelton, setShowSkelton] = useState(false);
  const [showStatsSkelton, setShowStatsSkelton] = useState(false);
  const [formData, setFormData] = useState({
    mode: [],
  });
  const [payload, setPayload] = useState({
    searchKey: "",
    pageNo: 1,
    pageCount: 20,
    isScheduled: true,
    isDelivered: "",
  });
  const [documentCount, setDocumentCount] = useState();
  const getListFunc = async () => {
    if (list?.length == 0) {
      setShowSkelton(true);
    }
    try {
      let response = await getNotifyServ(payload);
      if (response?.data?.statusCode == "200") {
        setList(response?.data?.data);
        setDocumentCount(response?.data?.documentCount);
      }
    } catch (error) {
      console.log(error);
    }
    setShowSkelton(false);
  };

  useEffect(() => {
    getListFunc();
  }, [payload]);
  const [addFormData, setAddFormData] = useState({
    name: "",
    phone: "",
    contactPerson: "",
    status: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    description: "",
    show: false,
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    phone: "",
    contactPerson: "",
    status: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    description: "",
    _id: "",
  });
  const renderProfile = (isDelivered) => {
    if (isDelivered) {
      return (
        <span className="status-badge bg-success-subtle text-success">
          Delivered
        </span>
      );
    } else {
      return (
        <span className="status-badge bg-warning-subtle text-warning">
          Scheduled
        </span>
      );
    }
  };
  const staticsData = [
    {
      label: "Total Notification",
      icon: "bi bi-bell",
      count: documentCount?.totalCount,

      iconColor: "#010a2d",
    },
    {
      label: "Scheduled",
      icon: "bi bi-bell",
      count: documentCount?.activeCount,

      iconColor: "green",
    },
    {
      label: "Delivered",
      icon: "bi bi-bell",
      count: documentCount?.inactiveCount,
      iconColor: "red",
    },
  ];
  const handleDeleteFunc = async (id) => {
    try {
      let response = await handleDeleteBranchServ(deleteId);
      if (response?.data?.statusCode == "200") {
        getListFunc();
        toast.success(response?.data?.message);
        setShowConfirm(false);
        setDeleteId("");
      }
    } catch (error) {
      toast.error("Internal Server error");
    }
  };
  const BranchSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be a valid 10-digit number")
      .required("Contact Number is required"),
    contactPerson: Yup.string().required("Contact Person is required"),
    status: Yup.string().required("Status is required"),
    description: Yup.string(),
    address: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Enter valid 6-digit pincode")
      .required("Pincode is required"),
  });
  const handleAddBranch = async (value) => {
    try {
      let response = await handleCreateBranchServ(value);
      if (response?.data?.statusCode == "200") {
        setAddFormData({
          name: "",
          phone: "",
          contactPerson: "",
          status: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          description: "",
          show: false,
        });
        toast.success(response?.data?.message);
        getListFunc();
      } else {
        toast?.error("Something went wrong!");
      }
    } catch (error) {
      toast?.error("Internal Server Error!");
    }
  };
  const handleUpdateBranch = async (value) => {
    try {
      let response = await handleUpdateBranchServ({
        ...value,
        _id: editFormData?._id,
      });
      if (response?.data?.statusCode == "200") {
        setEditFormData({
          name: "",
          phone: "",
          contactPerson: "",
          status: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          description: "",
          _id: "",
        });
        toast.success(response?.data?.message);
        getListFunc();
      } else {
        toast?.error("Something went wrong!");
      }
    } catch (error) {
      toast?.error("Internal Server Error!");
    }
  };

  return (
    <div className="container-fluid user-table py-3">
      {/* KPIs */}
      <div className="row g-3">
        {/* Loan Applications */}
        {showSkelton
          ? [1, 2, 3]?.map((v, i) => {
              return (
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="card-soft p-2 kpi">
                    <div className="d-flex justify-content-between align-items-center">
                      <Skeleton height={50} width={50} />
                      <div className="card-soft-content">
                        <div className="text-uppercase small">
                          <Skeleton height={20} width={100} />
                        </div>
                        <div className="value">
                          <Skeleton height={30} width={150} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : staticsData?.map((v, i) => {
              return (
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="card-soft p-3 kpi">
                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        className="icon"
                        style={{ background: "#f4f6ff", color: v?.iconColor }}
                      >
                        <i className={v?.icon} />
                      </span>
                      <div className="card-soft-content">
                        <div className="text-uppercase small">{v.label}</div>
                        <div className="value">{v?.count}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center my-4">
        <h4 className="mb-0">Scheduled Notifications</h4>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center px-2 user-search">
            <form className="input-group search ms-2 d-none d-md-flex">
              <span className="input-group-text input-span">
                <i className="bi bi-search" />
              </span>
              <input
                type="search"
                className="form-control search-input"
                placeholder="Title, Message..."
                value={payload?.searchKey}
                onChange={(e) =>
                  setPayload({ ...payload, searchKey: e?.target?.value })
                }
              />
            </form>
          </div>
          <div className="dropdown me-2">
            <button
              className="btn btn-light dropdown-toggle border height37"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                width: "150px",
                fontSize: "14px",
              }}
            >
              {payload?.isDelivered === ""
                ? "Select Status"
                : payload?.isDelivered === true
                ? "Delivered"
                : "Scheduled"}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setPayload({ ...payload, isDelivered: "" })}
                >
                  Select Status
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setPayload({ ...payload, isDelivered: false });
                  }}
                >
                  Scheduled
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setPayload({ ...payload, isDelivered: true })}
                >
                  Delivered
                </button>
              </li>
            </ul>
          </div>
          {permissions?.includes("Branches-Create") && (
            <button
              className="btn  bgThemePrimary shadow-sm"
              onClick={() => navigate("/notify")}
            >
              + Notification
            </button>
          )}
        </div>
      </div>
      {/* Table Card */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table
              id="usersTable"
              className="table table-hover align-middle mb-0"
            >
              <thead className="table-light">
                <tr>
                  <th className="text-center">Sr No.</th>
                  <th>Icon</th>
                  <th>Title</th>
                  <th>Message</th>
                  <th className="text-center">Date & Time</th>
                  <th className="text-center">Mode</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Users</th>
                  {(permissions?.includes("Branches-Edit") ||
                    permissions?.includes("Branches-Delete")) && (
                    <th style={{ textAlign: "center" }}>Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {showSkelton
                  ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((v, i) => {
                      return (
                        <tr key={i}>
                          <td className="text-center">
                            <Skeleton width={100} />
                          </td>
                          <td>
                            <Skeleton width={100} />
                          </td>
                          <td>
                            <Skeleton width={100} />
                          </td>

                          <td>
                            <Skeleton width={100} />
                          </td>
                          <td className="text-center">
                            <Skeleton width={100} />
                          </td>
                          <td className="text-center">
                            <Skeleton width={100} />
                          </td>
                          <td className="text-center">
                            <Skeleton width={100} />
                          </td>
                          <td className="text-center">
                            <Skeleton width={100} />
                          </td>
                          {(permissions?.includes("Branches-Edit") ||
                            permissions?.includes("Branches-Delete")) && (
                            <td className="text-center">
                              <Skeleton width={100} />
                            </td>
                          )}
                        </tr>
                      );
                    })
                  : list?.map((v, i) => {
                      return (
                        <tr>
                          <td className="text-center">
                            {i + 1 + (payload?.pageNo - 1) * payload?.pageCount}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={
                                  v?.icon ||
                                  "https://cdn-icons-png.flaticon.com/128/2645/2645890.png"
                                }
                                alt="User"
                                className="rounded-circle me-2"
                                width={40}
                                height={40}
                              />
                            </div>
                          </td>
                          <td>
                            <h6
                              className="mb-0"
                              style={{ fontSize: "14px", width: "150px" }}
                            >
                              {v?.title}
                            </h6>{" "}
                          </td>
                          <td style={{ width: "200px" }}>{v?.subTitle}</td>
                          <td className="text-center">
                            {moment(v?.date).format("DD MMM, YYYY")} ||{" "}
                            {v?.time}
                          </td>
                          <td className="text-center">
                            {v?.mode?.map((item, i) => (
                              <span key={i} className="me-1">
                                {item.toUpperCase()}
                                {i !== v.mode.length - 1 && ", "}
                              </span>
                            ))}
                          </td>

                          <td className="text-center">
                            {renderProfile(v?.isDelivered)}
                          </td>
                          <td className="text-center">
                            <a
                              className="cursor"
                              // onClick={() => navigate("/view-staff/" + v?._id)}
                              onClick={() => toast.info("Work in progress")}
                            >
                              <u
                                style={{
                                  color: "#010a2d",
                                  fontWeight: "500",
                                  fontSize: "13px",
                                }}
                              >
                                View Users
                              </u>
                            </a>
                          </td>

                          {/* <td className="text-center">{moment(v?.lastLogin).format("DD MMM, YYYY")}</td> */}
                          <td style={{ textAlign: "center" }}>
                            {v?.isDelivered && "--"}
                            {permissions?.includes("Branches-Edit") && (
                              !v?.isDelivered &&
                              <a
                                onClick={() =>
                                  toast.info("Work in progress")
                                }
                                className="text-primary text-decoration-underline me-2"
                              >
                                <i class="bi bi-pencil fs-6"></i>
                              </a>
                            )}
                            {permissions?.includes("Branches-Delete") && (
                              !v?.isDelivered &&
                              <a
                               
                                // onClick={() => {
                                //   setDeleteId(v?._id);
                                //   setShowConfirm(true);
                                // }}
                                onClick={()=>toast.info("Work in progress")}
                                className="text-danger text-decoration-underline"
                              >
                                <i class="bi bi-trash fs-6"></i>
                              </a>
                            )}
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
            {list?.length == 0 && !showSkelton && <NoDataScreen />}
            <Pagination
              payload={payload}
              setPayload={setPayload}
              totalCount={documentCount?.totalCount || 0}
            />
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        show={showConfirm}
        handleClose={() => setShowConfirm(false)}
        handleConfirm={handleDeleteFunc}
        title="Branch Delete"
        body="Do you really want to delete this branch?"
      />
    </div>
  );
}

export default ScheduleRemainders;
