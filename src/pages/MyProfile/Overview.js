import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { createUserServ } from "../../services/user.service";

function Overview() {
  const navigate = useNavigate();

  // ✅ Validation Schema
  const userSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    countryCode: Yup.string(),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),
    dob: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    status: Yup.string().required("Status is required"),

    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    address: Yup.string().required("Address is required"),

    employmentType: Yup.string().required("Employment Type is required"),
    monthlyIncome: Yup.number().required("Monthly Income is required"),
    annualIncome: Yup.number().required("Annual Income is required"),
    creditScore: Yup.number().required("Credit Score is required"),
    panNumber: Yup.string(),
    aadharNumber: Yup.string(),
    profilePic: Yup.mixed().required("Profile Picture is required"),
  });

  const handleCreateUser = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      let response = await createUserServ(formData);
      if (response?.data?.statusCode == "200") {
        toast.success(response?.data?.message);
        navigate("/all-users");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error");
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
            <u>Overview</u>
          </b>
          <div className="d-flex">
            <span className="status-badge bg-light-subtle text-secondary border cursor">
              Profile
            </span>
            <span className="status-badge bg-light-subtle text-secondary mx-3 border cursor">
              Settings
            </span>
             <span className="status-badge bg-danger-subtle text-secondary border cursor">
              Logout
            </span>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Overview;
