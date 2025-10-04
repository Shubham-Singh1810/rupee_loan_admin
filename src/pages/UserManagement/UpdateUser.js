import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  getUserDetailsServ,
  updateUserServ,
} from "../../services/user.service";

function UpdateUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);

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
    profileStatus: Yup.string().required("Profile status is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    address: Yup.string().required("Address is required"),
    employementType: Yup.string().required("Employment Type is required"),
    monthlyIncome: Yup.number().required("Monthly Income is required"),
    annualIncome: Yup.number().required("Annual Income is required"),
    creditScore: Yup.number().required("Credit Score is required"),
    panNumber: Yup.string(),
    aadharNumber: Yup.string(),
    profilePic: Yup.mixed(),
  });

  // ✅ Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        let response = await getUserDetailsServ(id);
        if (response?.data?.statusCode == "200") {
          const user = response.data.data;
          setInitialValues({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phone || "",
            countryCode: user.countryCode || "+91",
            dob: user.dob ? user.dob.split("T")[0] : "",
            gender: user.gender || "",
            profileStatus: user.profileStatus || "",
            state: user.state || "",
            city: user.city || "",
            pincode: user.pincode || "",
            address: user.address || "",
            employementType: user.employementType || "",
            monthlyIncome: user.monthlyIncome || "",
            annualIncome: user.annualIncome || "",
            creditScore: user.creditScore || "",
            panNumber: user.panNumber || "",
            aadharNumber: user.aadharNumber || "",
            profilePrev: user?.profilePic,
          });
        } else {
          toast.error("Failed to load user details");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching user details");
      }
    };
    fetchUser();
  }, [id]);

  // ✅ Handle Update
  const handleUpdateUser = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "profilePic") {
          // ✅ Sirf tabhi bhejo jab file ho
          if (values.profilePic) {
            formData.append("profilePic", values.profilePic);
          }
        } else {
          formData.append(key, values[key]);
        }
      });
      formData.append("id", id);
      let response = await updateUserServ(formData);
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

  //   if (!initialValues) {
  //     return <div className="p-5 text-center">Loading...</div>;
  //   }

  return (
    <div className="container-fluid">
      <div className="col-lg-12 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="ms-1 mb-0">
            <i
              className="bi-arrow-left-circle bi cursor"
              onClick={() => navigate("/all-users")}
            ></i>{" "}
            Update User
          </h5>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={userSchema}
          enableReinitialize
          onSubmit={handleUpdateUser}
        >
          {({ setFieldValue, isSubmitting, values, dirty }) => (
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
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFieldValue("profilePic", file);
                          const previewUrl = URL.createObjectURL(file);
                          setFieldValue("profilePrev", previewUrl);
                        }
                      }}
                    />
                    <label htmlFor="profilePic" className="cursor-pointer">
                      <img
                        src={
                          values?.profilePrev
                            ? values?.profilePrev
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
                    <label className="form-label">Profile Status</label>
                    <Field
                      as="select"
                      name="profileStatus"
                      className="form-select"
                    >
                      <option value="">Select</option>
                      <option value="registered">Registered</option>
                      <option value="verified">Verified</option>
                      <option value="active">Active</option>
                      <option value="blocked">Blocked</option>
                    </Field>
                    <ErrorMessage
                      name="profileStatus"
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
                      name="employementType"
                      className="form-select"
                    >
                      <option value="">Select</option>
                      <option value="government">Government</option>
                      <option value="private">Private</option>
                      <option value="self-employed">Self Employed</option>
                    </Field>
                    <ErrorMessage
                      name="employementType"
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
                <button
                  className="btn bgThemePrimary"
                  type="submit"
                  disabled={isSubmitting || !dirty}
                >
                  {isSubmitting ? "Updating..." : "Update User"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default UpdateUser;
