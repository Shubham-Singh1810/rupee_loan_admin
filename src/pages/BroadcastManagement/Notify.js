import React, { useState, useEffect } from "react";
import { createNotifyServ } from "../../services/notification.service";
import { getUserListServ } from "../../services/user.service";
import { toast } from "react-toastify";
import { MultiSelect } from "react-multi-select-component";
function Notify() {
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    icon: "",
    notifyUserIds: [],
    mode: [],
    isScheduled:false,
    date:"",
    time:""
  });
  const [btnLoader, setBtnLoader] = useState(false);
  const createNotifyFunc = async () => {
    setBtnLoader(true);
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("subTitle", formData.subTitle);
      if (formData.icon) {
        fd.append("icon", formData.icon);
      }
      fd.append("notifyUserIds", JSON.stringify(formData.notifyUserIds));
      fd.append("mode", JSON.stringify(formData.mode));
      fd.append("isScheduled", formData.isScheduled);
      if (formData.isScheduled) {
        fd.append("date", formData.date);
        fd.append("time", formData.time);
      }
      let response = await createNotifyServ(fd);
      if (response?.data?.statusCode == "200") {
        setFormData({
          title: "",
          subTitle: "",
          icon: "",
          notifyUserIds: [],
          mode: [],
          isScheduled:false,
          date:"",
          time:""
        });
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
    setBtnLoader(false);
  };
  const [userList, setUserList] = useState([]);
  const getUserListFunc = async () => {
    try {
      let response = await getUserListServ({pageCount:100, isUserApproved:true});
      if (response?.data?.statusCode == "200") {
        setUserList(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserListFunc();
  }, []);
  return (
    <div className="m-4">
      <div className="border shadow-sm p-5 bg-white rounded">
        <h3>Notify</h3>
        <p className="text-secondary">
          Effortlessly create custom notifications and keep your users updated.
        </p>
        <hr />
        <div className="row">
          <div className="col-8">
            <div>
              <label>
                Title <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                placeholder="Write a title for your notification"
                onChange={(e) =>
                  setFormData({ ...formData, title: e?.target?.value })
                }
                value={formData?.title}
              />
            </div>
            <div className="mt-3">
              <label>
                Message <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                placeholder="Write your message"
                onChange={(e) =>
                  setFormData({ ...formData, subTitle: e?.target?.value })
                }
                value={formData?.subTitle}
              />
            </div>
            <div className="mt-3">
              <label>
                Choose File <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.files[0] })
                }
              />
            </div>
            <div className="mt-3">
              <label>
                Select Users <span className="text-danger">*</span>
              </label>
              <MultiSelect
                options={userList.map((v) => ({
                  value: v?._id,
                  label: v?.firstName,
                }))}
                value={
                  userList
                    ?.filter((v) => {
                      // ✅ Handle both: when branch is array of objects or array of IDs
                      const userIds = formData?.notifyUserIds?.map((b) =>
                        typeof b === "object" ? b._id : b
                      );
                      return userIds?.includes(v._id);
                    })
                    ?.map((v) => ({
                      value: v._id,
                      label: v.firstName,
                    })) || []
                }
                // onChange={(selected) =>
                //   setFieldValue(
                //     "branch",
                //     selected.map((s) => s.value)
                //   )
                // }
                onChange={(selected) =>
                  setFormData({
                    ...formData,
                    notifyUserIds: selected.map((s) => s.value),
                  })
                }
                labelledBy="Select User"
              />
            </div>
            <div className="mt-3">
              <label>
                Select Mode <span className="text-danger">*</span>
              </label>

              <div className="border p-3 rounded">
                {[
                  { id: "allMode", label: "All", value: "all" },
                  { id: "emailMode", label: "Email", value: "email" },
                  { id: "textMode", label: "Text / SMS", value: "text" },
                  { id: "pushMode", label: "Push Notification", value: "push" },
                  {
                    id: "inAppMode",
                    label: "In-App Notification",
                    value: "in_app",
                  },
                ].map(({ id, label, value }) => (
                  <div className="form-check mb-2" key={id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={id}
                      value={value}
                      checked={
                        value === "all"
                          ? formData.mode.length === 4 // 4 actual modes selected
                          : formData.mode.includes(value)
                      }
                      onChange={(e) => {
                        let newModes = [...formData.mode];

                        if (value === "all") {
                          // Select all or unselect all
                          if (newModes.length === 4) {
                            newModes = [];
                          } else {
                            newModes = ["email", "text", "push", "in_app"];
                          }
                        } else {
                          // Toggle individual mode
                          if (newModes.includes(value)) {
                            newModes = newModes.filter((m) => m !== value);
                          } else {
                            newModes.push(value);
                          }
                        }

                        setFormData({ ...formData, mode: newModes });
                      }}
                    />
                    <label className="form-check-label" htmlFor={id}>
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-check form-switch mt-3">
              <input
                type="checkbox"
                onChange={() => setFormData({...formData, isScheduled:!formData?.isScheduled})}
                className="form-check-input"
                value={formData?.isScheduled}
              />
              <label className="form-check-label">
                Do you want to schedule this notification
              </label>
            </div> 
            {formData?.isScheduled && <div className="mt-3 row">
             <div className="col-6">
              <label>Date</label>
              <input className="form-control" type="date" value={formData?.date} onChange={(e)=>setFormData({...formData, date:e?.target?.value})}/>
             </div>
             <div className="col-6">
              <label>Time</label>
              <input className="form-control" type="time" value={formData?.time} onChange={(e)=>setFormData({...formData, time:e?.target?.value})}/>
             </div>

              </div>}

            <div className="mt-3">
              {formData?.title &&
              formData?.subTitle &&
              formData?.notifyUserIds?.length > 0 ? (
                btnLoader ? (
                  <button
                    style={{ opacity: 0.5 }}
                    className="btn bgThemePrimary w-100"
                  >
                    Sending ...
                  </button>
                ) : (
                  <button
                    onClick={() => createNotifyFunc()}
                    className="btn bgThemePrimary w-100"
                  >
                    Send
                  </button>
                )
              ) : (
                <button
                  style={{ opacity: "0.5" }}
                  onClick={() => createNotifyFunc()}
                  className="btn bgThemePrimary w-100"
                >
                  Send
                </button>
              )}
            </div>
          </div>
          <div className="col-4">
            <div className="notifyMobile">
              <img src="/assets/images/phone.png" />
              <div className="notificationContent">
                <div className="d-flex justify-content-between w-100 bg-light p-1 shadow">
                  <p className="mb-0 text-center w-50 p-1">Notifications</p>
                  <p className="mb-0 text-center w-50 bg-danger text-light py-1 rounded">
                    News feed
                  </p>
                </div>
                {(formData?.title || formData?.subTitle || formData?.icon) && (
                  <div className="border mt-4 shadow bg-light p-2">
                    <p className="mb-0" style={{ fontSize: "18px" }}>
                      {formData?.title}
                    </p>
                    <small className="text-secondary mb-1">
                      {formData?.subTitle}
                    </small>
                    <div>
                      {formData?.icon && (
                        <img
                          className="img-fluid mt-2"
                          src={URL.createObjectURL(formData?.icon)}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notify;
