import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TopNav from "../../components/TopNav";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createLoanTypeServ } from "../../services/loan.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { MultiSelect } from "react-multi-select-component";
import { getDocumentSetServ } from "../../services/document.services";

function CreateLoan() {
  const navigate = useNavigate();
  const [showDaysForm, setShowDaysForm] = useState(false);
  const getLoanSchema = (showDaysForm) =>
    Yup.object().shape({
      name: Yup.string(),
      code: Yup.string(),
      description: Yup.string().required("Description is required"),
      status: Yup.boolean().required("Status is required"),
      icon: Yup.mixed().required("Icon is required"),

      ...(showDaysForm
        ? {
            minAmountDays: Yup.number().required(
              "Minimum amount (days) is required"
            ),
            maxAmountDays: Yup.number().required(
              "Maximum amount (days) is required"
            ),
            minTenureDays: Yup.number().required(
              "Minimum tenure (days) is required"
            ),
            maxTenureDays: Yup.number().required(
              "Maximum tenure (days) is required"
            ),
            intrestRateDays: Yup.number().required(
              "Interest rate (days) is required"
            ),
            intrestTypeDays: Yup.string().required(
              "Interest type (days) is required"
            ),
            repaymentFrequencyDays: Yup.number().required(
              "Repayment frequency (days) is required"
            ),
          }
        : {
            minAmount: Yup.number().required("Minimum amount is required"),
            maxAmount: Yup.number().required("Maximum amount is required"),
            minTenure: Yup.number().required("Minimum tenure is required"),
            maxTenure: Yup.number().required("Maximum tenure is required"),
            intrestRate: Yup.number().required("Interest rate is required"),
            intrestType: Yup.string().required("Interest type is required"),
            repaymentFrequency: Yup.number().required(
              "Repayment frequency is required"
            ),
          }),

      minIncome: Yup.number(),
      creditScoreRequired: Yup.number(),
      minAge: Yup.number(),
      maxAge: Yup.number(),
      employmentTypesAllowed: Yup.array(),
      DTIR: Yup.number(),

      collateralRequired: Yup.boolean().required(
        "Collateral required is required"
      ),
      collateralTypes: Yup.array().of(Yup.string()),
      maxLTV: Yup.number(),

      processingFee: Yup.number().required("Processing fee is required"),
      latePaymentPenalty: Yup.number().required(
        "Late payment penalty is required"
      ),
      prepaymentFee: Yup.number().required("Prepayment fee is required"),

      auto_approval: Yup.boolean().required("Auto approval is required"),

      documentRequired: Yup.array()
        .of(Yup.string().required("Document is required"))
        .min(1, "At least one document is required"),
    });
  const createLoanTypeFunc = async (values) => {
    try {
      const formData = new FormData();

      // sabhi values append karo
      Object.keys(values).forEach((key) => {
        if (key === "documentRequired") {
          // multiple documents ke liye array append
          values.documentRequired.forEach((doc) => {
            formData.append("documentRequired[]", doc);
          });
        } else if (key === "icon" && values.icon instanceof File) {
          // agar file select hui hai to as file bhejo
          formData.append("icon", values.icon);
        } else {
          formData.append(key, values[key]);
        }
      });

      let response = await createLoanTypeServ(formData);

      if (response?.data?.statusCode === 200) {
        toast.success(response?.data?.message);
        navigate("/loan-type-list");
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error");
    }
  };

  const [selectedDocument, setSelectedDocument] = useState([]);
  const [documentList, setDocumentList] = useState([]);

  const getDocumentListFunc = async () => {
    try {
      let response = await getDocumentSetServ({ status: true });
      if (response?.data?.statusCode == "200") {
        const documentOption = response?.data?.data?.map((v) => ({
          value: v?.name,
          label: v?.name,
        }));

        setDocumentList(documentOption);
      }
    } catch (error) {}
  };
  useEffect((v, i) => {
    getDocumentListFunc();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="ms-1 mb-0">Create New Loan Type</h5>
          </div>

          {/* ✅ Formik Wrapper */}
          <Formik
            initialValues={{
              name: "",
              code: "",
              description: "",
              status: "",
              icon: "",

              // normal fields
              minAmount: "",
              maxAmount: "",
              minTenure: "",
              maxTenure: "",
              intrestRate: "",
              intrestType: "",
              repaymentFrequency: "",

              // days fields
              minAmountDays: "",
              maxAmountDays: "",
              minTenureDays: "",
              maxTenureDays: "",
              intrestRateDays: "",
              intrestTypeDays: "",
              repaymentFrequencyDays: "",

              // common fields
              minIncome: "",
              creditScoreRequired: "",
              minAge: "",
              maxAge: "",
              employmentTypesAllowed: [],
              DTIR: "",

              collateralRequired: false,
              collateralTypes: [],
              maxLTV: "",

              processingFee: "",
              latePaymentPenalty: "",
              prepaymentFee: "",

              auto_approval: false,
              documentRequired: [],
            }}
            validationSchema={getLoanSchema(showDaysForm)}
            onSubmit={(values) => {
              console.log("VALUES", values);
              createLoanTypeFunc(values);
            }}
          >
            {({ values, setFieldValue , isSubmitting}) => (
              <Form>
                {/* Basic Information */}
                <div className="form-section shadow-sm">
                  <div className="form-section-header">
                    Basic Information
                  </div>
                  <div className="form-section-body">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label">
                          Loan Name<span className="text-danger">*</span>
                        </label>
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter loan type name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger small"
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Loan Code / ID</label>
                        <Field
                          type="text"
                          name="code"
                          className="form-control"
                          placeholder="Auto-generated if empty"
                        />
                        <ErrorMessage
                          name="code"
                          component="div"
                          className="text-danger small"
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">
                          Status<span className="text-danger">*</span>
                        </label>
                        <Field
                          as="select"
                          name="status"
                          className="form-select"
                        >
                          <option value="">Select</option>
                          <option value={true}>Active</option>
                          <option value={false}>Inactive</option>
                        </Field>
                        <ErrorMessage
                          name="status"
                          component="div"
                          className="text-danger small"
                        />
                      </div>
                      <div className="col-2 mt-auto">
                        <div className="text-center">
                          <input
                            id="iconUpload"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setFieldValue("icon", file);

                                // ✅ preview ke liye
                                const previewUrl = URL.createObjectURL(file);
                                setFieldValue("iconPreview", previewUrl);
                              }
                            }}
                          />

                          <label
                            htmlFor="iconUpload"
                            className="cursor-pointer"
                          >
                            <img
                              src={
                                values.iconPreview ||
                                "https://cdn-icons-png.flaticon.com/128/8191/8191607.png"
                              }
                              alt="Loan Icon"
                              style={{
                                width: "90px",
                                height: "90px",
                                objectFit: "contain",
                              }}
                            />
                          </label>
                          <p>
                            Upload Icon <span className="text-danger">*</span>
                          </p>
                          <ErrorMessage
                            name="icon"
                            component="div"
                            className="text-danger small"
                          />
                        </div>
                      </div>

                      <div className="col-10">
                        <label className="form-label">
                          Description<span className="text-danger">*</span>
                        </label>
                        <Field
                          as="textarea"
                          name="description"
                          className="form-control"
                          rows={4}
                          placeholder="Please enter brief description about this loan type"
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-danger small"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Loan Amount & Duration */}
                <div className="form-section shadow-sm">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-section-header">
                      
                      Loan Amount & Duration (Months)
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input
                        type="checkbox"
                        onChange={() => setShowDaysForm(!showDaysForm)}
                        className="form-check-input"
                      />
                      <label className="form-check-label">
                        Also add for days
                      </label>
                    </div>
                  </div>

                  <div className="form-section-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">
                          Minimum Loan Amount (INR)
                        </label>
                        <Field
                          type="number"
                          name="minAmount"
                          className="form-control"
                          placeholder="Enter Amount"
                        />
                        <ErrorMessage
                          name="minAmount"
                          component="div"
                          className="text-danger small"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">
                          Maximum Loan Amount (INR)
                        </label>
                        <Field
                          type="number"
                          name="maxAmount"
                          className="form-control"
                          placeholder="Enter Amount"
                        />
                        <ErrorMessage
                          name="maxAmount"
                          component="div"
                          className="text-danger small"
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">
                          Minimum Tenure (Months)
                        </label>
                        <Field
                          type="number"
                          name="minTenure"
                          className="form-control"
                          placeholder="Enter Tenure"
                        />
                        <ErrorMessage
                          name="minTenure"
                          component="div"
                          className="text-danger small"
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">
                          Maximum Tenure (Months)
                        </label>
                        <Field
                          type="number"
                          name="maxTenure"
                          className="form-control"
                          placeholder="Enter Tenure "
                        />
                        <ErrorMessage
                          name="maxTenure"
                          component="div"
                          className="text-danger small"
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">Interest Rate (%)</label>
                        <Field
                          type="number"
                          name="intrestRate"
                          step="0.01"
                          className="form-control"
                          placeholder="Enter Intrest Rate"
                        />
                        <ErrorMessage
                          name="intrestRate"
                          component="div"
                          className="text-danger small"
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">Interest Type</label>
                        <Field
                          as="select"
                          name="intrestType"
                          className="form-select"
                        >
                          <option value="">Select</option>
                          <option value="flat">Flat</option>
                          <option value="reducing">Reducing</option>
                          <option value="simple">Simple</option>
                          <option value="compound">Compound</option>
                        </Field>
                        <ErrorMessage
                          name="intrestType"
                          component="div"
                          className="text-danger small"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">
                          Repayment Frequency (In Months)
                        </label>

                        <Field
                          type="number"
                          name="repaymentFrequency"
                          className="form-control"
                          placeholder="Enter Repayment Frequency"
                        />
                        <ErrorMessage
                          name="repaymentFrequency"
                          component="div"
                          className="text-danger small"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {showDaysForm && (
                  <div className="form-section shadow-sm">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="form-section-header">
                        <i className="bi bi-info-circle me-2" />
                        Loan Amount & Duration (Days)
                      </div>
                    </div>

                    <div className="form-section-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">
                            Minimum Loan Amount (INR)
                          </label>
                          <Field
                            type="number"
                            name="minAmountDays"
                            className="form-control"
                            placeholder="Enter Amount"
                          />
                          <ErrorMessage
                            name="minAmountDays"
                            component="div"
                            className="text-danger small"
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">
                            Maximum Loan Amount (INR)
                          </label>
                          <Field
                            type="number"
                            name="maxAmountDays"
                            className="form-control"
                            placeholder="Enter Amount"
                          />
                          <ErrorMessage
                            name="maxAmountDays"
                            component="div"
                            className="text-danger small"
                          />
                        </div>

                        <div className="col-md-3">
                          <label className="form-label">
                            Minimum Tenure (Days)
                          </label>
                          <Field
                            type="number"
                            name="minTenureDays"
                            className="form-control"
                            placeholder="Enter Tenure"
                          />
                          <ErrorMessage
                            name="minTenureDays"
                            component="div"
                            className="text-danger small"
                          />
                        </div>

                        <div className="col-md-3">
                          <label className="form-label">
                            Maximum Tenure (Days)
                          </label>
                          <Field
                            type="number"
                            name="maxTenureDays"
                            className="form-control"
                            placeholder="Enter Tenure"
                          />
                          <ErrorMessage
                            name="maxTenureDays"
                            component="div"
                            className="text-danger small"
                          />
                        </div>

                        <div className="col-md-3">
                          <label className="form-label">
                            Interest Rate (%)
                          </label>
                          <Field
                            type="number"
                            name="intrestRateDays"
                            step="0.01"
                            className="form-control"
                            placeholder="Enter Intrest Rate"
                          />
                          <ErrorMessage
                            name="intrestRateDays"
                            component="div"
                            className="text-danger small"
                          />
                        </div>

                        <div className="col-md-3">
                          <label className="form-label">Interest Type</label>
                          <Field
                            as="select"
                            name="intrestTypeDays"
                            className="form-select"
                          >
                            <option value="">Select</option>
                            <option value="simple">Simple</option>
                            <option value="compound">Compound</option>
                          </Field>
                          <ErrorMessage
                            name="intrestTypeDays"
                            component="div"
                            className="text-danger small"
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">
                            Repayment Frequency (In Days)
                          </label>

                          <Field
                            type="number"
                            name="repaymentFrequencyDays"
                            className="form-control"
                            placeholder="Enter Repayment Frequency"
                          />
                          <ErrorMessage
                            name="repaymentFrequencyDays"
                            component="div"
                            className="text-danger small"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Eligibility Rules */}
                <div className="form-section shadow-sm">
                  <div className="form-section-header">
                   
                    Eligibility Rules
                  </div>
                  <div className="form-section-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">
                          Minimum Income
                        </label>
                        <Field
                          type="number"
                          name="minIncome"
                          className="form-control"
                          placeholder="Enter Income"
                        />
                        <ErrorMessage
                          name="minIncome"
                          component="div"
                          className="text-danger small"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">
                          Credit Score Requirement
                        </label>
                        <Field
                          type="number"
                          name="creditScoreRequired"
                          className="form-control"
                          placeholder="Enter Credit Score"
                        />
                        <ErrorMessage
                          name="creditScoreRequired"
                          component="div"
                          className="text-danger small"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">
                          Minimum Age
                        </label>
                        <Field
                          type="number"
                          name="minAge"
                          className="form-control"
                          placeholder="Enter Age"
                        />
                        <ErrorMessage
                          name="minAge"
                          component="div"
                          className="text-danger small"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">
                          Maximum Age
                        </label>
                        <Field
                          type="number"
                          name="maxAge"
                          className="form-control"
                          placeholder="Enter Age"
                        />
                        <ErrorMessage
                          name="maxAge"
                          component="div"
                          className="text-danger small"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">
                          Employement Type
                        </label>
                        <MultiSelect
                          options={[
                            { value: "Government", label: "Government" },
                            { value: "Private", label: "Private" },
                            { value: "Self-Employed", label: "Self-Employed" },
                            { value: "Any", label: "Any" },
                          ]}
                          value={values.employmentTypesAllowed.map((v) => ({
                            value: v,
                            label: v,
                          }))}
                          onChange={(selected) =>
                            setFieldValue(
                              "employmentTypesAllowed",
                              selected.map((s) => s.value)
                            )
                          }
                          labelledBy="Select Employment Types"
                        />
                        <ErrorMessage
                          name="employmentTypesAllowed"
                          component="div"
                          className="text-danger small"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">
                          Dept To Income Max Ration
                          
                        </label>
                        <Field
                          type="string"
                          name="DTIR"
                          className="form-control"
                          placeholder="Enter Dept To Income Ratio"
                        />
                        <ErrorMessage
                          name="DTIR"
                          component="div"
                          className="text-danger small"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collateral / Security */}
                <div className="form-section shadow-sm">
                  <div className="form-section-header">
                   
                    Collateral / Security
                  </div>
                  <div className="form-section-body">
                    <div className="form-check form-switch mb-3">
                      <Field
                        type="checkbox"
                        name="collateralRequired"
                        className="form-check-input"
                      />
                      <label className="form-check-label">
                        Collateral Required
                      </label>
                    </div>

                    {values.collateralRequired && (
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">
                            Accepted Collateral Type
                          </label>
                          {/* <Field
                            as="select"
                            name="collateralTypes"
                            className="form-select"
                          >
                            <option value="property">Property</option>
                            <option value="vehicle">Vehicle</option>
                            <option value="fd">Fixed Deposit</option>
                            <option value="gold">Gold</option>
                            <option value="others">Others</option>
                          </Field> */}
                          <MultiSelect
                            options={[
                              { value: "Property", label: "Property" },
                              { value: "Vehicle", label: "Vehicle" },
                              { value: "Deposit", label: "Deposit" },
                              { value: "Gold", label: "Gold" },
                              { value: "Others", label: "Others" },
                            ]}
                            value={values.collateralTypes.map((v) => ({
                              value: v,
                              label: v,
                            }))}
                            onChange={(selected) =>
                              setFieldValue(
                                "collateralTypes",
                                selected.map((s) => s.value)
                              )
                            }
                            labelledBy="Select Collateral Types"
                          />
                          <ErrorMessage
                            name="collateralTypes"
                            component="div"
                            className="text-danger small"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Maximum LTV (%)</label>
                          <Field
                            type="number"
                            name="maxLTV"
                            className="form-control"
                            placeholder="Enter MaxLTV"
                          />
                          <ErrorMessage
                            name="maxLTV"
                            component="div"
                            className="text-danger small"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Fees & Charges */}
                <div className="form-section shadow-sm">
                  <div className="form-section-header">
                   
                    Fees & Charges
                  </div>
                  <div className="form-section-body">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label">
                          Processing Fee (%)
                          <span className="text-danger">*</span>
                        </label>
                        <Field
                          type="number"
                          step="0.01"
                          name="processingFee"
                          className="form-control"
                          placeholder="Enter Processing Fee"
                        />
                        <ErrorMessage
                          name="processingFee"
                          component="div"
                          className="text-danger small"
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">
                          Late Payment Penalty (%)
                          <span className="text-danger">*</span>
                        </label>
                        <Field
                          type="number"
                          step="0.01"
                          name="latePaymentPenalty"
                          className="form-control"
                          placeholder="Enter Late Payment Penalty"
                        />
                        <ErrorMessage
                          name="latePaymentPenalty"
                          component="div"
                          className="text-danger small"
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">
                          Prepayment Fee (%)
                          <span className="text-danger">*</span>
                        </label>
                        <Field
                          type="number"
                          step="0.01"
                          name="prepaymentFee"
                          className="form-control"
                          placeholder="Enter Prepayment Fee"
                        />
                        <ErrorMessage
                          name="prepaymentFee"
                          component="div"
                          className="text-danger small"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Disbursal Settings */}
                <div className="form-section shadow-sm">
                  <div className="form-section-header">
                    
                    Disbursal Settings
                  </div>
                  <div className="form-section-body">
                    <div className="form-check form-switch">
                      <Field
                        type="checkbox"
                        name="auto_approval"
                        className="form-check-input"
                      />
                      <label className="form-check-label">
                        Auto-Disbursal Allowed
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-section shadow-sm">
                  <div className="form-section-header">
                    
                    Document Required
                  </div>
                  <div className="form-section-body">
                    <label className="form-label">
                      Required Documents<span className="text-danger">*</span>
                    </label>
                    <MultiSelect
                      options={documentList}
                      value={values.documentRequired.map((doc) => ({
                        value: doc,
                        label: doc,
                      }))}
                      onChange={(selected) =>
                        setFieldValue(
                          "documentRequired",
                          selected.map((s) => s.value)
                        )
                      }
                      labelledBy="Select Document"
                      hasSelectAll={true}
                      overrideStrings={{
                        selectSomeItems: "Select Documents", // Placeholder text
                        allItemsAreSelected: "All Documents Selected",
                        selectAll: "Select All",
                        search: "Search Documents...",
                      }}
                    />
                    <ErrorMessage
                      name="documentRequired"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="d-flex justify-content-end align-items-center mb-5 mt-4">
                  <div>
                    <button type="reset" className="btn btn-danger me-2">
                      Cancel
                    </button>
                    <button
                            className="btn bgThemePrimary "
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : " Save Loan Type"}
                          </button>
                    
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default CreateLoan;
