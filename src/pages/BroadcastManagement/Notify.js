import React from "react";

function Notify() {
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
              />
            </div>
            <div className="mt-3">
              <label>
                Message <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                placeholder="Write your message"
              />
            </div>
            <div className="mt-3">
              <label>
                Choose File <span className="text-danger">*</span>
              </label>
              <input className="form-control" type="file" />
            </div>
            <div className="mt-3">
              <label>
                Select Users <span className="text-danger">*</span>
              </label>
              <select className="form-control">
                <option>Select</option>
              </select>
            </div>
            <div className="mt-3">
  <label>
    Select Mode <span className="text-danger">*</span>
  </label>

  <div className="border p-3 rounded">

    <div className="form-check mb-2">
      <input
        className="form-check-input"
        type="checkbox"
        id="emailMode"
        value="email"
      />
      <label className="form-check-label" htmlFor="emailMode">
        Email
      </label>
    </div>

    <div className="form-check mb-2">
      <input
        className="form-check-input"
        type="checkbox"
        id="textMode"
        value="text"
      />
      <label className="form-check-label" htmlFor="textMode">
        Text / SMS
      </label>
    </div>

    <div className="form-check mb-2">
      <input
        className="form-check-input"
        type="checkbox"
        id="pushMode"
        value="push"
      />
      <label className="form-check-label" htmlFor="pushMode">
        Push Notification
      </label>
    </div>

    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        id="inAppMode"
        value="in_app"
      />
      <label className="form-check-label" htmlFor="inAppMode">
        In-App Notification
      </label>
    </div>

  </div>
</div>
<div className="mt-3">
    <button className="btn bgThemePrimary w-100">Send</button>
</div>

          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </div>
  );
}

export default Notify;
