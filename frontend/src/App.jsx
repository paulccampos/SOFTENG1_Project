import { useState } from "react";
import "./App.css";

const reports = [
  ["Large pothole", "Barangay Commonwealth", "In Progress"],
  ["Broken streetlight", "Barangay Malaya", "Verified"],
  ["Flooded drainage", "Barangay Central", "Completed"],
];

function Login({ onLogin, setAuthPage }) {
  return (
    <main className="auth-page">
      <div className="auth-card">

        <h1>RoadWatch Login</h1>

        <input
          type="email"
          placeholder="Email Address"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button
          className="gold small-btn"
          onClick={onLogin}
        >
          Login
        </button>

        <p>
          Don't have an account?

          <button
            className="link-btn"
            onClick={() => setAuthPage("register")}
          >
            Register
          </button>

        </p>

      </div>
    </main>
  );
}

function Register({ setAuthPage, onRegister }) {
  return (
    <main className="auth-page">
      <div className="auth-card">

        <h1>Create Account</h1>

        <input placeholder="First Name" />

        <input placeholder="Last Name" />

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <input
          type="password"
          placeholder="Confirm Password"
        />

        <button
          className="gold small-btn"
          onClick={onRegister}
        >
          Register
        </button>

        <button
          className="link-btn"
          onClick={() => setAuthPage("login")}
        >
          Back to Login
        </button>

      </div>
    </main>
  );
}

function SuccessModal({
  message,
  onClose
}) {
  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Success</h2>

        <p>{message}</p>

        <button
          className="gold small-btn"
          onClick={onClose}
        >
          Continue
        </button>

      </div>

    </div>
  );
}

function Sidebar({active,setActive}) {
  return <aside className="sidebar">
    <div className="brand">ROADWATCH<span>PUBLIC INFRASTRUCTURE MONITOR</span></div>
    <nav>{[
      "Dashboard",
      "Submit Report",
      "My Reports",
      "Field Inspector",
      "Administrator",
      "Profile"
    ].map(x =>
      <button key={x} className={active===x ? "nav active" : "nav"} onClick={()=>setActive(x)}>{x}</button>)}</nav>
    <div className="account"><b>Citizen Account</b><span>citizen@example.com</span></div>
  </aside>
}

function Dashboard({setActive}) {
  return <main className="main">
    <h1>Hello, Citizen!</h1>
    <p className="subtitle">Track infrastructure issues and follow their repair progress.</p>
    <section className="stats">
      <div><span>Total Reports</span><strong>12</strong></div>
      <div><span>In Progress</span><strong>4</strong></div>
      <div><span>Completed</span><strong>7</strong></div>
      <button className="gold" onClick={()=>setActive("Submit Report")}>+ Submit Report</button>
    </section>
    <section className="panel">

    <h2>Recent Reports</h2>

    <table className="table">

    <thead>
    <tr>
    <th>Report ID</th>
    <th>Issue</th>
    <th>Location</th>
    <th>Status</th>
    <th>Action</th>
    </tr>
    </thead>

    <tbody>

    <tr>
    <td>PF-0012</td>
    <td>Large pothole</td>
    <td>Barangay Commonwealth</td>
    <td>In Progress</td>

    <td>
    <button
    onClick={() =>
    setActive("My Reports")
    }
    >
    View Details
    </button>
    </td>

    </tr>

    <tr>
    <td>PF-0013</td>
    <td>Broken streetlight</td>
    <td>Barangay Malaya</td>
    <td>Verified</td>

    <td>
    <button
    onClick={() =>
    setActive("My Reports")
    }
    >
    View Details
    </button>
    </td>

    </tr>

    </tbody>

    </table>

    </section>
  </main>
}

function SubmitReport({setActive}) {
  return <main className="main">
    <h1>Submit Damage Report</h1>
    <p className="subtitle">Provide accurate details so the issue can be verified and assigned.</p>
    <section className="form-grid">
      <form className="panel form" onSubmit={e=>{e.preventDefault();setActive("My Reports")}}>
        <label>Category<select><option>Road Damage</option><option>Streetlight</option><option>Drainage</option><option>Public Facility</option></select></label>
        <label>Description<textarea placeholder="Describe the damage or issue"/></label>
        <label>Location<input placeholder="Landmark / street / barangay"/></label>
        <label>Photo Evidence<input type="file" accept="image/png,image/jpeg"/></label>
        <button className="gold" type="submit">Submit Report</button>
      </form>
      <aside className="panel"><h2>Submission flow</h2><p>1. Submit report</p><p>2. Inspector verifies</p><p>3. Crew is assigned</p><p>4. Repair is tracked</p></aside>
    </section>
  </main>
}

function Tracking() {
  return <main className="main">
    <h1>Report #PF-0012</h1><p className="subtitle">Large pothole • Barangay Commonwealth</p>
    <section className="panel"><h2>Current Status: <span className="gold-text">In Progress</span></h2>
      <div className="timeline">{["Reported","Verified","Assigned","In Progress","Completed"].map(x=><span key={x}>{x}</span>)}</div>
    </section>
    <section className="panel audit"><h2>Status & Audit Timeline</h2>
      <p><b>Sep 21 • 10:12</b> Report submitted — Citizen</p>
      <p><b>Sep 21 • 13:40</b> Inspection completed — Field Inspector</p>
      <p><b>Sep 21 • 14:05</b> Crew assignment created — Administrator</p>
      <p><b>Sep 21 • 14:30</b> Repair started — Crew Supervisor</p>
    </section>
  </main>
}

function InspectorDashboard() {

return (

<main className="main">

<h1>Field Inspector Dashboard</h1>

<p className="subtitle">
Verify submitted reports
</p>

<section className="stats">

<div>
<span>Pending</span>
<strong>15</strong>
</div>

<div>
<span>Verified</span>
<strong>7</strong>
</div>

<div>
<span>Rejected</span>
<strong>2</strong>
</div>

</section>

<section className="panel">

<h2>Verification Queue</h2>

<input
className="search"
placeholder="Search reports..."
/>

<select className="search">
<option>All</option>
<option>Pending</option>
<option>Verified</option>
<option>Rejected</option>
</select>

<div className="report-row">

<b>Large pothole</b>

<span>
Barangay Commonwealth
</span>

<button
className="gold small-btn"
>
Verify
</button>

<button
className="small-btn"
>
Reject
</button>

</div>

</section>

</main>

);

}

function AdminDashboard() {

return (

<main className="main">

<h1>Administrator Dashboard</h1>

<section className="stats">

<div>
<span>Total Reports</span>
<strong>120</strong>
</div>

<div>
<span>Users</span>
<strong>54</strong>
</div>

<div>
<span>Inspectors</span>
<strong>12</strong>
</div>

</section>

<section className="panel">

<h2>User Management</h2>

<table className="table">

<thead>
<tr>
<th>Name</th>
<th>Role</th>
<th>Status</th>
</tr>
</thead>

<tbody>

<tr>
<td>Kelvin Fulgencio</td>
<td>Citizen</td>
<td>Active</td>
</tr>

<tr>
<td>Jayson Godin</td>
<td>Inspector</td>
<td>Active</td>
</tr>

</tbody>

</table>

</section>

<section className="panel audit">

<h2>Audit History</h2>

<p>
<b>Sep 24</b>
Inspector verified PF-0012
</p>

<p>
<b>Sep 24</b>
Citizen submitted PF-0013
</p>

</section>

</main>

);

}

export default function App() {

const [active,setActive] =
useState("Dashboard");

const [authenticated,
setAuthenticated] =
useState(false);

const [authPage,
setAuthPage] =
useState("login");

const [modal,
setModal] =
useState("");

if(!authenticated){

if(authPage==="login"){

return (

<>

<Login
setAuthPage={setAuthPage}
onLogin={()=>{
setModal("Login Successful");
setAuthenticated(true);
}}
/>

{modal &&
<SuccessModal
message={modal}
onClose={() =>
setModal("")
}
/>
}

</>

);

}

return (

<Register
setAuthPage={setAuthPage}
onRegister={()=>{
alert(
"Account Created"
);
setAuthPage("login");
}}
/>

);

}

return (

<div className="app">

<Sidebar
active={active}
setActive={setActive}
/>

{active==="Dashboard" &&
<Dashboard
setActive={setActive}
/>
}

{active==="Submit Report" &&
<SubmitReport
setActive={setActive}
/>
}

{active==="My Reports" &&
<Tracking/>
}

{active==="Field Inspector" &&
<InspectorDashboard/>
}

{active==="Administrator" &&
<AdminDashboard/>
}

{active==="Profile" &&
<main className="main">
<h1>Profile</h1>
<p className="subtitle">
Account settings
</p>
</main>
}

</div>

);

}