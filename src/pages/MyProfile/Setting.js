import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  getAdminProfileServ,
  updateAdminServ,
  updatePasswordServ,
} from "../../services/commandCenter.services";
import { useGlobalState } from "../../GlobalProvider";

function Setting() {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { globalState, setGlobalState } = useGlobalState();

  const adminId = globalState?.user?._id;

  // ✅ Validation Schema
  const userSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    profilePic: Yup.mixed(),
  });

  // ✅ Fetch Profile Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let response = await getAdminProfileServ(adminId);
        if (response?.data?.statusCode == "200") {
          setInitialValues({
            ...response?.data?.data,
            profilePic: "",
            profilePrev: response?.data?.data?.profilePic,
            role: response?.data?.data?.role?.name,
            branch: response?.data?.data?.branch,
            status: response?.data?.data?.status ? "Active" : "Inactive",
          });
        } else {
          toast.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error(error);
        toast.error("Internal Server Error");
      }
    };
    fetchProfile();
  }, [adminId]);

  // ✅ Update Profile
  const updateAdminProfile = async (values) => {
    try {
      const formData = new FormData();
      formData.append("_id", adminId);
      formData.append("firstName", values?.firstName);
      formData.append("lastName", values?.lastName);
      if (values?.profilePrev) {
        formData.append("profilePic", values?.profilePic);
      }

      let response = await updateAdminServ(formData);
      if (response?.data?.statusCode == "200") {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error");
    }
  };

  // ✅ Update Password
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      let response = await updatePasswordServ({
        _id: adminId,
        oldPassword,
        newPassword,
      });
      if (response?.data?.statusCode == "200") {
        toast.success(response?.data?.message);
        setShowPasswordModal(false);
      } else {
        toast.error(response?.data?.message || "Failed to update password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error");
    }
  };

  const handleLogoutFunc = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      setGlobalState({
        user: null,
        token: null,
        permissions: null,
      });
      toast.success("Admin logged out successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("permissions");
      navigate("/");
    }
  };

  return (
    <div className="container-fluid">
      <div className="col-lg-12 p-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="ms-1 mb-0">Admin Section</h5>
        </div>
        <div className="d-flex justify-content-between mb-4 mx-2">
          <b className="textThemePrimary">
            <u>Setting</u>
          </b>
          <div className="d-flex">
            <span
              className="status-badge bg-light-subtle text-secondary border cursor"
              onClick={() => navigate("/my-profile")}
            >
              Profile
            </span>
            <span
              className="status-badge bg-light-subtle text-secondary mx-3 border cursor"
              onClick={() => navigate("/overview")}
            >
              Overview
            </span>
            <span
              className="status-badge bg-danger-subtle text-secondary border cursor"
              onClick={() => handleLogoutFunc()}
            >
              Logout
            </span>
          </div>
        </div>

        <div className=" d-flex justify-content-center align-items-center bg-white rounded border" style={{height:"75vh"}}>
          <h2>Work in progress</h2>
        </div>
      </div>
    </div>
  );
}

export default Setting;
