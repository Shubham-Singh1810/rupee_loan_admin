import React, { useEffect, useState } from "react";
// import {
//   getNotificationSettingsServ,
//   updateNotificationSettingsServ,
// } from "../../services/notificationSetting.services";
import { toast } from "react-toastify";

function NotificationSettings() {
  const [settings, setSettings] = useState({
    email: false,
    sms: false,
    push: false,
    notificationList: false,
  });

  const [btnLoader, setBtnLoader] = useState(false);

  // Get settings from backend
  const getSettings = async () => {
    try {
        let response
    //   let response = await getNotificationSettingsServ();
      if (response?.data?.statusCode === "200") {
        setSettings({
          email: response.data.data.email,
          sms: response.data.data.sms,
          push: response.data.data.push,
          notificationList: response.data.data.notificationList,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  const updateSettings = async () => {
    setBtnLoader(true);
    try {
    //   let response = await updateNotificationSettingsServ(settings);
    let response
      if (response?.data?.statusCode === "200") {
        toast.success(response.data.message);
        getSettings();
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
    setBtnLoader(false);
  };

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="m-4">
      <div className="border shadow-sm p-5 bg-white rounded">
        <h3>Notification Settings</h3>
        <p className="text-secondary">
          Choose how the system should send notifications for important updates.
        </p>
        <hr />

        <div className="row">

          {/* EMAIL NOTIFICATION */}
          <div className="col-6">
            <div className="border-bottom d-flex justify-content-between p-2">
              <div className="d-flex align-items-center">
                <div
                  className="me-3 d-flex justify-content-center border align-items-center"
                  style={{
                    height: "50px",
                    width: "50px",
                    background: "whitesmoke",
                    borderRadius: "50%",
                  }}
                >
                  <i className="bi bi-envelope"></i>
                </div>

                <div>
                  <p className="mb-0">Email Notification</p>
                  <small className="text-secondary">
                    Send notifications to user email.
                  </small>
                </div>
              </div>

               {settings?.email ? <button
                  className="status-toggle pending bg-success"
                  style={{ width: "50px" }}
                  onClick={() => setSettings({...settings, email:false})}
                >
                  <div className="circle"></div>
                </button>:<button
                  className="status-toggle  bg-secondary"
                  style={{ width: "50px" }}
                  onClick={() => setSettings({...settings, email:true})}
                >
                  <div className="circle"></div>
                </button>}
            </div>
          </div>

          {/* SMS */}
          <div className="col-6">
            <div className="border-bottom d-flex justify-content-between p-2">
              <div className="d-flex align-items-center">
                <div
                  className="me-3 d-flex justify-content-center border align-items-center"
                  style={{
                    height: "50px",
                    width: "50px",
                    background: "whitesmoke",
                    borderRadius: "50%",
                  }}
                >
                  <i className="bi bi-chat-dots"></i>
                </div>

                <div>
                  <p className="mb-0">SMS / Text Notification</p>
                  <small className="text-secondary">
                    Notify users through text messages.
                  </small>
                </div>
              </div>

              {settings?.sms ? <button
                  className="status-toggle pending bg-success"
                  style={{ width: "50px" }}
                  onClick={() => setSettings({...settings, sms:false})}
                >
                  <div className="circle"></div>
                </button>:<button
                  className="status-toggle  bg-secondary"
                  style={{ width: "50px" }}
                  onClick={() => setSettings({...settings, sms:true})}
                >
                  <div className="circle"></div>
                </button>}
            </div>
          </div>

          {/* PUSH NOTIF. */}
          <div className="col-6 mt-2">
            <div className="border-bottom d-flex justify-content-between p-2">
              <div className="d-flex align-items-center">
                <div
                  className="me-3 d-flex justify-content-center border align-items-center"
                  style={{
                    height: "50px",
                    width: "50px",
                    background: "whitesmoke",
                    borderRadius: "50%",
                  }}
                >
                  <i className="bi bi-bell"></i>
                </div>

                <div>
                  <p className="mb-0">Push Notification</p>
                  <small className="text-secondary">
                    Send push alerts on mobile devices.
                  </small>
                </div>
              </div>

              {settings?.push ? <button
                  className="status-toggle pending bg-success"
                  style={{ width: "50px" }}
                  onClick={() => setSettings({...settings, push:false})}
                >
                  <div className="circle"></div>
                </button>:<button
                  className="status-toggle  bg-secondary"
                  style={{ width: "50px" }}
                  onClick={() => setSettings({...settings, push:true})}
                >
                  <div className="circle"></div>
                </button>}
            </div>
          </div>

          {/* NOTIFICATION LIST */}
          <div className="col-6 mt-2">
            <div className="border-bottom d-flex justify-content-between p-2">
              <div className="d-flex align-items-center">
                <div
                  className="me-3 d-flex justify-content-center border align-items-center"
                  style={{
                    height: "50px",
                    width: "50px",
                    background: "whitesmoke",
                    borderRadius: "50%",
                  }}
                >
                  <i className="bi bi-card-list"></i>
                </div>

                <div>
                  <p className="mb-0">In-App Notification List</p>
                  <small className="text-secondary">
                    Show notifications inside the app.
                  </small>
                </div>
              </div>

              {settings?.notificationList ? <button
                  className="status-toggle pending bg-success"
                  style={{ width: "50px" }}
                  onClick={() => setSettings({...settings, notificationList:false})}
                >
                  <div className="circle"></div>
                </button>:<button
                  className="status-toggle  bg-secondary"
                  style={{ width: "50px" }}
                  onClick={() => setSettings({...settings, notificationList:true})}
                >
                  <div className="circle"></div>
                </button>}
            </div>
          </div>

        </div>

        {/* SUBMIT BUTTON */}
        <div className="mt-3 d-flex justify-content-end">
          {btnLoader ? (
            <button className="btn bgThemePrimary" style={{ opacity: "0.5" }}>
              Updating...
            </button>
          ) : (
            <button className="btn bgThemePrimary" onClick={updateSettings}>
              Save Settings
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationSettings;
