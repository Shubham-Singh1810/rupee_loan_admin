import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { createUserServ } from "../../services/user.service";

function Profile() {
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
            <u>Profile</u>
          </b>
          <div className="d-flex">
            <span className="status-badge bg-light-subtle text-secondary border cursor">
              Overview
            </span>
            <span className="status-badge bg-light-subtle text-secondary mx-3 border cursor">
              Settings
            </span>
             <span className="status-badge bg-danger-subtle text-secondary border cursor">
              Logout
            </span>
          </div>
        </div>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            countryCode: "+91",
            dob: "",
            gender: "",
            status: "",
            state: "",
            city: "",
            pincode: "",
            address: "",
            employmentType: "",
            monthlyIncome: "",
            annualIncome: "",
            creditScore: "",
            profilePic: "",
            panNumber: "",
            aadharNumber: "",
          }}
          validationSchema={userSchema}
          onSubmit={handleCreateUser}
        >
          {({ setFieldValue, isSubmitting, values }) => (
            <Form>
              {/* Personal Details */}
              <div className="form-section shadow-sm mb-3">
                <div className="form-section-header">Personal Details</div>
                <div className="form-section-body row g-3">
                  <div className="col-md-12 ">
                    <input
                      type="file"
                      id="profilePic"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        setFieldValue("profilePic", e.target.files[0])
                      }
                    />
                    <label htmlFor="profilePic" className="cursor-pointer">
                      <img
                        src={
                          values.profilePic
                            ? URL.createObjectURL(values.profilePic)
                            : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                        }
                        alt="Profile"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </label>
                    <ErrorMessage
                      name="profilePic"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <Field
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="Enter First Name"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <Field
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Enter Last Name"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <div className="input-group">
                      {/* Country Code Dropdown */}
                      <Field
                        as="select"
                        name="countryCode"
                        className="form-select"
                        style={{ maxWidth: "100px" }}
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+61">🇦🇺 +61</option>
                      </Field>

                      {/* Phone Number Input */}
                      <Field
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Enter Phone"
                      />
                    </div>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Role</label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Branch</label>
                    <div className="input-group">
                      {/* Country Code Dropdown */}
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter Email"
                      />
                    </div>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-danger small"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <Field as="select" name="status" className="form-select">
                      <option value="">Select</option>
                      <option value="registered">Registered</option>
                      <option value="verified">Verified</option>
                      <option value="active">Active</option>
                      <option value="blocked">Blocked</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                </div>
              </div>

            
              <div className="d-flex justify-content-between align-items-center mb-5 mt-4">
                 <button type="reset" className="btn btn-warning me-2">
                  Change Password
                </button>
                <div>
                    <button type="reset" className="btn btn-secondary me-2">
                  Enable Editiong
                </button>
                <button
                  className="btn bgThemePrimary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ opacity: "0.8" }}
                >
                  {isSubmitting ? "Submitting..." : "Update"}
                </button>
                </div>
                
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Profile;
