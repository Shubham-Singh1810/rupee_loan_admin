import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { createUserServ } from "../../services/user.service";

function CreateUser() {
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="ms-1 mb-0">Create New User</h5>
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
                  <div className="col-md-3 text-center">
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
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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

                  <div className="col-md-4">
                    <label className="form-label">DOB</label>
                    <Field type="date" name="dob" className="form-control" />
                    <ErrorMessage
                      name="dob"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Gender</label>
                    <Field as="select" name="gender" className="form-select">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="col-md-4">
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

              {/* Address Details */}
              <div className="form-section shadow-sm mb-3">
                <div className="form-section-header">Address Details</div>
                <div className="form-section-body row g-3">
                  <div className="col-md-4">
                    <label className="form-label">State</label>
                    <Field type="text" name="state" className="form-control" />
                    <ErrorMessage
                      name="state"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">City</label>
                    <Field type="text" name="city" className="form-control" />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Pincode</label>
                    <Field
                      type="text"
                      name="pincode"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="pincode"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Address</label>
                    <Field
                      as="textarea"
                      name="address"
                      className="form-control"
                      rows={3}
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                </div>
              </div>

              {/* Document Uploads */}
              <div className="form-section shadow-sm mb-3">
                <div className="form-section-header">Document Details</div>
                <div className="form-section-body row g-3">
                  <div className="col-md-6">
                    <label className="form-label">PAN Number</label>
                    <Field
                      type="text"
                      name="panNumber"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="panNumber"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Aadhar Number</label>
                    <Field
                      type="text"
                      name="aadharNumber"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="aadharNumber"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                </div>
              </div>

              {/* Employment Details */}
              <div className="form-section shadow-sm mb-3">
                <div className="form-section-header">Employment Details</div>
                <div className="form-section-body row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Employment Type</label>
                    <Field
                      as="select"
                      name="employmentType"
                      className="form-select"
                    >
                      <option value="">Select</option>
                      <option value="government">Government</option>
                      <option value="private">Private</option>
                      <option value="self-employed">Self Employed</option>
                    </Field>
                    <ErrorMessage
                      name="employmentType"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Monthly Income</label>
                    <Field
                      type="number"
                      name="monthlyIncome"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="monthlyIncome"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Annual Income</label>
                    <Field
                      type="number"
                      name="annualIncome"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="annualIncome"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Credit Score</label>
                    <Field
                      type="number"
                      name="creditScore"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="creditScore"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="d-flex justify-content-end align-items-center mb-5 mt-4">
                <button type="reset" className="btn btn-danger me-2">
                  Cancel
                </button>
                <button
                  className="btn bgThemePrimary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Save User"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateUser;
