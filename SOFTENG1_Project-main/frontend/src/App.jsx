import { useState } from "react";
import "./App.css";

const reports = [
  ["Large pothole", "Barangay Commonwealth", "In Progress"],
  ["Broken streetlight", "Barangay Malaya", "Verified"],
  ["Flooded drainage", "Barangay Central", "Completed"],
];

function Sidebar({active,setActive}) {
  return <aside className="sidebar">
    <div className="brand">ROADWATCH<span>PUBLIC INFRASTRUCTURE MONITOR</span></div>
    <nav>{["Dashboard","Submit Report","My Reports","Profile"].map(x =>
      <button key={x} className={active===x ? "nav active" : "nav"} onClick={()=>setActive(x)}>{x}</button>)}</nav>
    <div className="account"><b>Citizen Account</b><span>citizen@example.com</span></div>
  </aside>
}

function Dashboard({setActive}) {
  return <main className="main">
    <h1>Good afternoon, Citizen</h1>
    <p className="subtitle">Track infrastructure issues and follow their repair progress.</p>
    <section className="stats">
      <div><span>Total Reports</span><strong>12</strong></div>
      <div><span>In Progress</span><strong>4</strong></div>
      <div><span>Completed</span><strong>7</strong></div>
      <button className="gold" onClick={()=>setActive("Submit Report")}>+ Submit Report</button>
    </section>
    <section className="panel"><h2>Recent Reports</h2>
      {reports.map(([a,b,c])=><div className="report-row" key={a}>
        <b>{a}</b><span>{b}</span><em>{c}</em><button onClick={()=>setActive("My Reports")}>View details →</button>
      </div>)}
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

export default function App() {
  const [active,setActive]=useState("Dashboard");
  return <div className="app"><Sidebar active={active} setActive={setActive}/>
    {active==="Dashboard" && <Dashboard setActive={setActive}/>}
    {active==="Submit Report" && <SubmitReport setActive={setActive}/>}
    {active==="My Reports" && <Tracking/>}
    {active==="Profile" && <main className="main"><h1>Profile</h1><p className="subtitle">Account settings will be connected to authentication.</p></main>}
  </div>
}