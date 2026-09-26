import { useState } from "react";
import "./App.css";
import logo from "./assets/roadwatch-logo.png";

/* =========================================================
   DEFAULT USERS
========================================================= */

const DEFAULT_USERS = [
  {
    firstName: "Juan",
    lastName: "Dela Cruz",
    birthday: "2000-05-15",
    mobile: "09171234567",
    address: {
      houseNumber: "123",
      street: "Main Street",
      barangay: "Commonwealth",
      city: "Quezon City",
    },
    email: "citizen@roadwatch.com",
    password: "123456",
    role: "Citizen",
  },
  {
    firstName: "Maria",
    lastName: "Santos",
    birthday: "1995-03-10",
    mobile: "09181234567",
    address: {
      houseNumber: "456",
      street: "Malaya Street",
      barangay: "Malaya",
      city: "Quezon City",
    },
    email: "inspector@roadwatch.com",
    password: "123456",
    role: "Field Inspector",
  },
  {
    firstName: "Admin",
    lastName: "User",
    birthday: "1990-01-01",
    mobile: "09191234567",
    address: {
      houseNumber: "789",
      street: "Central Street",
      barangay: "Central",
      city: "Quezon City",
    },
    email: "admin@roadwatch.com",
    password: "123456",
    role: "Administrator",
  },
];

/* =========================================================
   DEFAULT REPORTS
========================================================= */

const DEFAULT_REPORTS = [
  {
    id: "PF-0012",
    issue: "Large Pothole",
    category: "Road Damage",
    location: "Barangay Commonwealth, Quezon City",
    date: "September 25, 2026",
    time: "9:30 AM",
    priority: "High",
    status: "Ongoing",
    description:
      "Large pothole near the school zone creating traffic delays and safety concerns.",
    reporter: "Juan Dela Cruz",
    reporterEmail: "citizen@roadwatch.com",
    evidence: "",
  },
  {
    id: "PF-0013",
    issue: "Broken Streetlight",
    category: "Streetlight",
    location: "Barangay Malaya, Quezon City",
    date: "September 24, 2026",
    time: "7:15 PM",
    priority: "Medium",
    status: "New",
    description:
      "Streetlight is no longer functioning and the area becomes very dark at night.",
    reporter: "Juan Dela Cruz",
    reporterEmail: "citizen@roadwatch.com",
    evidence: "",
  },
  {
    id: "PF-0015",
    issue: "Drainage Problem",
    category: "Drainage",
    location: "Barangay Central, Quezon City",
    date: "September 20, 2026",
    time: "2:20 PM",
    priority: "High",
    status: "Ongoing",
    description:
      "Drainage is blocked and water accumulates along the road during rainfall.",
    reporter: "Juan Dela Cruz",
    reporterEmail: "citizen@roadwatch.com",
    evidence: "",
  },
  {
    id: "PF-0018",
    issue: "Flooded Drainage",
    category: "Drainage",
    location: "Barangay Central, Quezon City",
    date: "September 15, 2026",
    time: "4:45 PM",
    priority: "Medium",
    status: "Closed",
    description:
      "Flooding caused by a blocked drainage system.",
    reporter: "Juan Dela Cruz",
    reporterEmail: "citizen@roadwatch.com",
    evidence: "",
  },
];

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function calculateAge(birthday) {
  if (!birthday) return 0;

  const birthDate = new Date(birthday);
  const today = new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDifference =
    today.getMonth() -
    birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

/* =========================================================
   SUCCESS MODAL
========================================================= */

function SuccessModal({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal success-modal">
        <img
          src={logo}
          alt="RoadWatch Logo"
          className="modal-logo"
        />

        <div className="success-icon">
          ✓
        </div>

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

/* =========================================================
   MINOR MODAL
========================================================= */

function MinorModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal warning-modal">
        <div className="warning-icon">
          !
        </div>

        <h2>Registration Blocked</h2>

        <p>
          You must be at least 18 years old
          to create a RoadWatch account.
        </p>

        <button
          className="gold small-btn"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({
  role,
  active,
  setActive,
  user,
}) {
  const navigation = [
    "Dashboard",

    ...(role === "Citizen"
      ? ["Submit Report", "My Reports"]
      : []),

    ...(role === "Field Inspector"
      ? ["Verification Queue"]
      : []),

    ...(role === "Administrator"
      ? ["Administrator"]
      : []),

    "Profile",
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <img
          src={logo}
          alt="RoadWatch Logo"
          className="sidebar-logo"
        />

        <div>
          <strong>ROADWATCH</strong>

          <span>
            PUBLIC INFRASTRUCTURE MONITOR
          </span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navigation.map((item) => (
          <button
            key={item}
            className={
              active === item
                ? "nav active"
                : "nav"
            }
            onClick={() =>
              setActive(item)
            }
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="account">
        <b>
          {user?.firstName}{" "}
          {user?.lastName}
        </b>

        <span>{role}</span>

        <span>{user?.email}</span>
      </div>
    </aside>
  );
}

/* =========================================================
   LOGIN
========================================================= */

function Login({
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
  setAuthPage,
}) {
  return (
    <main className="auth-page">
      <div className="auth-card login-card">
        <img
          src={logo}
          alt="RoadWatch Logo"
          className="auth-logo"
        />

        <h1>RoadWatch</h1>

        <p className="auth-subtitle">
          Public Infrastructure Monitoring
          System
        </p>

        <div className="form">
          <label>
            Email Address

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </label>

          <label>
            Password

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </label>

          <button
            className="gold auth-submit"
            onClick={onLogin}
          >
            Log In
          </button>
        </div>

        <p className="auth-footer">
          Don't have an account?

          <button
            className="link-btn"
            onClick={() =>
              setAuthPage("register")
            }
          >
            Create Account
          </button>
        </p>
      </div>
    </main>
  );
}

/* =========================================================
   REGISTER / CREATE ACCOUNT
========================================================= */

function Register({
  setAuthPage,
  onRegister,
  setShowMinorModal,
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    mobile: "",
    houseNumber: "",
    street: "",
    barangay: "",
    city: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function updateField(field, value) {
    setForm({
      ...form,
      [field]: value,
    });
  }

  function handleRegister() {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.birthday ||
      !form.mobile ||
      !form.houseNumber ||
      !form.street ||
      !form.barangay ||
      !form.city ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert(
        "Please complete all required fields."
      );
      return;
    }

    const age = calculateAge(
      form.birthday
    );

    if (age < 18) {
      setShowMinorModal(true);
      return;
    }

    if (form.password.length < 6) {
      alert(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    const existingUsers = JSON.parse(
      localStorage.getItem("users") ||
        JSON.stringify(DEFAULT_USERS)
    );

    const emailExists =
      existingUsers.some(
        (user) =>
          user.email.toLowerCase() ===
          form.email.toLowerCase()
      );

    if (emailExists) {
      alert(
        "An account with this email already exists."
      );
      return;
    }

    const newUser = {
      firstName: form.firstName,
      lastName: form.lastName,
      birthday: form.birthday,
      mobile: form.mobile,

      address: {
        houseNumber:
          form.houseNumber,
        street: form.street,
        barangay: form.barangay,
        city: form.city,
      },

      email: form.email,
      password: form.password,
      role: "Citizen",
    };

    localStorage.setItem(
      "users",
      JSON.stringify([
        ...existingUsers,
        newUser,
      ])
    );

    onRegister();
  }

  return (
    <main className="auth-page">
      <div className="auth-card register-card">

        <div className="register-header">
          <img
            src={logo}
            alt="RoadWatch Logo"
            className="auth-logo"
          />

          <h1>Create Account</h1>

          <p className="auth-subtitle">
            Join RoadWatch and help monitor
            your community.
          </p>
        </div>

        {/* PERSONAL INFORMATION */}

        <div className="register-section">
          <h3>
            Personal Information
          </h3>

          <div className="two-column">
            <label>
              First Name

              <input
                type="text"
                placeholder="Enter first name"
                value={form.firstName}
                onChange={(e) =>
                  updateField(
                    "firstName",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Last Name

              <input
                type="text"
                placeholder="Enter last name"
                value={form.lastName}
                onChange={(e) =>
                  updateField(
                    "lastName",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Birthday

              <input
                type="date"
                value={form.birthday}
                onChange={(e) =>
                  updateField(
                    "birthday",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Mobile Number

              <input
                type="tel"
                placeholder="09XXXXXXXXX"
                value={form.mobile}
                onChange={(e) =>
                  updateField(
                    "mobile",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
        </div>

        {/* ADDRESS */}

        <div className="register-section">
          <h3>Address</h3>

          <div className="address-grid">
            <label>
              House No.

              <input
                type="text"
                placeholder="House no."
                value={
                  form.houseNumber
                }
                onChange={(e) =>
                  updateField(
                    "houseNumber",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Street

              <input
                type="text"
                placeholder="Street"
                value={form.street}
                onChange={(e) =>
                  updateField(
                    "street",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Barangay

              <input
                type="text"
                placeholder="Barangay"
                value={form.barangay}
                onChange={(e) =>
                  updateField(
                    "barangay",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              City

              <input
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(e) =>
                  updateField(
                    "city",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
        </div>

        {/* ACCOUNT INFORMATION */}

        <div className="register-section">
          <h3>
            Account Information
          </h3>

          <div className="two-column">
            <label>
              Email Address

              <input
                type="email"
                placeholder="Enter email address"
                value={form.email}
                onChange={(e) =>
                  updateField(
                    "email",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Password

              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={(e) =>
                  updateField(
                    "password",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Confirm Password

              <input
                type="password"
                placeholder="Confirm password"
                value={
                  form.confirmPassword
                }
                onChange={(e) =>
                  updateField(
                    "confirmPassword",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
        </div>

        {/* CREATE ACCOUNT */}

        <button
          className="gold auth-submit"
          onClick={handleRegister}
        >
          Create Account
        </button>

        {/* BACK TO LOGIN */}

        <button
          className="link-btn register-back"
          onClick={() =>
            setAuthPage("login")
          }
        >
          ← Back to Login
        </button>

      </div>
    </main>
  );
}

/* =========================================================
   CITIZEN DASHBOARD
========================================================= */

function Dashboard({
  setActive,
  reports,
  user,
}) {
  const citizenReports =
    reports.filter(
      (report) =>
        report.reporterEmail ===
        user.email
    );

  const ongoing =
    citizenReports.filter(
      (report) =>
        report.status === "Ongoing"
    ).length;

  const closed =
    citizenReports.filter(
      (report) =>
        report.status === "Closed"
    ).length;

  return (
    <main className="main">

      <div className="dashboard-header">
        <div>
          <p className="eyebrow">
            CITIZEN DASHBOARD
          </p>

          <h1>
            Hello, {user.firstName}!
          </h1>

          <p className="subtitle">
            Track infrastructure issues
            and follow their repair
            progress.
          </p>
        </div>

        <img
          src={logo}
          alt="RoadWatch Logo"
          className="dashboard-logo"
        />
      </div>

      <section className="stats">

        <div>
          <span>My Reports</span>
          <strong>
            {citizenReports.length}
          </strong>
        </div>

        <div>
          <span>New</span>

          <strong>
            {
              citizenReports.filter(
                (r) =>
                  r.status === "New"
              ).length
            }
          </strong>
        </div>

        <div>
          <span>Ongoing</span>
          <strong>{ongoing}</strong>
        </div>

        <div>
          <span>Closed</span>
          <strong>{closed}</strong>
        </div>

      </section>

      <section className="submit-highlight">

        <div>
          <p className="eyebrow">
            NEED TO REPORT SOMETHING?
          </p>

          <h2>
            Help improve your community.
          </h2>

          <p>
            Submit a report about potholes,
            damaged streetlights, drainage
            problems, or other public
            infrastructure concerns.
          </p>
        </div>

        <button
          className="gold submit-main-btn"
          onClick={() =>
            setActive(
              "Submit Report"
            )
          }
        >
          + Submit Report
        </button>

      </section>

      <section className="panel">

        <div className="section-heading">

          <div>
            <h2>Recent Reports</h2>

            <p>
              Your latest submitted reports.
            </p>
          </div>

          <button
            className="outline-btn"
            onClick={() =>
              setActive(
                "My Reports"
              )
            }
          >
            View All
          </button>

        </div>

        {citizenReports.length ===
        0 ? (
          <div className="empty-state">
            <p>
              You have not submitted any
              reports yet.
            </p>
          </div>
        ) : (
          <div className="table-container">

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

                {citizenReports
                  .slice(0, 5)
                  .map((report) => (
                    <tr key={report.id}>

                      <td>
                        <strong>
                          {report.id}
                        </strong>
                      </td>

                      <td>
                        {report.issue}
                      </td>

                      <td>
                        {report.location}
                      </td>

                      <td>
                        <span
                          className={`status status-${report.status.toLowerCase()}`}
                        >
                          {report.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="outline-btn small-btn"
                          onClick={() =>
                            setActive(
                              `Report Details:${report.id}`
                            )
                          }
                        >
                          View Details
                        </button>
                      </td>

                    </tr>
                  ))}

              </tbody>

            </table>

          </div>
        )}

      </section>

    </main>
  );
}

/* =========================================================
   SUBMIT REPORT
========================================================= */

function SubmitReport({
  setActive,
  user,
  onSubmit,
}) {
  const [form, setForm] =
    useState({
      category: "Road Damage",
      description: "",
      location: "",
      evidence: "",
    });

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.description ||
      !form.location
    ) {
      alert(
        "Please complete the description and location."
      );

      return;
    }

    const report = {
      id: `PF-${String(
        Date.now()
      ).slice(-4)}`,

      issue: form.category,

      category:
        form.category,

      location:
        form.location,

      date:
        new Date().toLocaleDateString(
          "en-US",
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          }
        ),

      time:
        new Date().toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            minute: "2-digit",
          }
        ),

      priority: "Medium",

      status: "New",

      description:
        form.description,

      reporter:
        `${user.firstName} ${user.lastName}`,

      reporterEmail:
        user.email,

      evidence:
        form.evidence,
    };

    onSubmit(report);
  }

  return (
    <main className="main">

      <button
        className="back-btn"
        onClick={() =>
          setActive("Dashboard")
        }
      >
        ← Back to Dashboard
      </button>

      <p className="eyebrow">
        REPORT AN ISSUE
      </p>

      <h1>Submit Damage Report</h1>

      <p className="subtitle">
        Provide accurate details so the
        issue can be verified and
        assigned.
      </p>

      <section className="form-grid">

        <form
          className="panel form"
          onSubmit={handleSubmit}
        >

          <label>
            Reporter Name

            <input
              className="readonly-input"
              value={`${user.firstName} ${user.lastName}`}
              disabled
              readOnly
            />

            <small>
              Automatically filled from
              your account.
            </small>
          </label>

          <label>
            Category

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category:
                    e.target.value,
                })
              }
            >
              <option>
                Road Damage
              </option>

              <option>
                Streetlight
              </option>

              <option>
                Drainage
              </option>

              <option>
                Public Facility
              </option>
            </select>
          </label>

          <label>
            Description

            <textarea
              placeholder="Describe the damage or issue..."
              value={
                form.description
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
            />
          </label>

          <label>
            Exact Location

            <input
              placeholder="Street / Barangay / Landmark"
              value={
                form.location
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  location:
                    e.target.value,
                })
              }
            />
          </label>

          <label>
            Photo Evidence

            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) =>
                setForm({
                  ...form,
                  evidence:
                    e.target.files?.[0]
                      ?.name || "",
                })
              }
            />
          </label>

          <button
            className="gold"
            type="submit"
          >
            Submit Report
          </button>

        </form>

        <aside className="panel information-panel">

          <p className="eyebrow">
            HOW IT WORKS
          </p>

          <h2>
            Submission Process
          </h2>

          <div className="process-step">
            <span>01</span>

            <div>
              <strong>
                Submit
              </strong>

              <p>
                Send your infrastructure
                concern.
              </p>
            </div>
          </div>

          <div className="process-step">
            <span>02</span>

            <div>
              <strong>
                Verify
              </strong>

              <p>
                An inspector reviews
                your report.
              </p>
            </div>
          </div>

          <div className="process-step">
            <span>03</span>

            <div>
              <strong>
                Assign
              </strong>

              <p>
                The issue is assigned
                for action.
              </p>
            </div>
          </div>

          <div className="process-step">
            <span>04</span>

            <div>
              <strong>
                Track
              </strong>

              <p>
                Follow the repair
                progress.
              </p>
            </div>
          </div>

        </aside>

      </section>

    </main>
  );
}

/* =========================================================
   MY REPORTS
========================================================= */

function MyReports({
  setActive,
  reports,
  user,
}) {
  const citizenReports =
    reports.filter(
      (report) =>
        report.reporterEmail ===
        user.email
    );

  const newReports =
    citizenReports.filter(
      (report) =>
        report.status === "New"
    );

  const ongoingReports =
    citizenReports.filter(
      (report) =>
        report.status === "Ongoing"
    );

  const closedReports =
    citizenReports.filter(
      (report) =>
        report.status === "Closed"
    );

  function ReportSection({
    title,
    data,
  }) {
    return (
      <section className="panel report-section">

        <div className="section-heading">

          <h2>{title}</h2>

          <span className="section-count">
            {data.length}
          </span>

        </div>

        {data.length === 0 ? (
          <div className="empty-state">
            <p>
              No reports in this
              section.
            </p>
          </div>
        ) : (
          <div className="table-container">

            <table className="table">

              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Issue</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {data.map((report) => (
                  <tr key={report.id}>

                    <td>
                      <strong>
                        {report.id}
                      </strong>
                    </td>

                    <td>
                      {report.issue}
                    </td>

                    <td>
                      {report.location}
                    </td>

                    <td>
                      {report.date}
                    </td>

                    <td>
                      <span
                        className={`status status-${report.status.toLowerCase()}`}
                      >
                        {report.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="outline-btn small-btn"
                        onClick={() =>
                          setActive(
                            `Report Details:${report.id}`
                          )
                        }
                      >
                        View Details
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </section>
    );
  }

  return (
    <main className="main">

      <button
        className="back-btn"
        onClick={() =>
          setActive("Dashboard")
        }
      >
        ← Back to Dashboard
      </button>

      <p className="eyebrow">
        REPORT HISTORY
      </p>

      <h1>My Reports</h1>

      <p className="subtitle">
        Track all infrastructure reports
        you have submitted.
      </p>

      <ReportSection
        title="New Reports"
        data={newReports}
      />

      <ReportSection
        title="Ongoing Reports"
        data={ongoingReports}
      />

      <ReportSection
        title="Closed Reports"
        data={closedReports}
      />

    </main>
  );
}

/* =========================================================
   CITIZEN REPORT DETAILS
========================================================= */

function ReportDetails({
  setActive,
  report,
}) {
  if (!report) {
    return (
      <main className="main">

        <button
          className="back-btn"
          onClick={() =>
            setActive(
              "My Reports"
            )
          }
        >
          ← Back
        </button>

        <section className="panel empty-state">

          <h2>
            Report Not Found
          </h2>

          <p>
            The selected report could
            not be found.
          </p>

        </section>

      </main>
    );
  }

  return (
    <main className="main">

      <button
        className="back-btn"
        onClick={() =>
          setActive(
            "My Reports"
          )
        }
      >
        ← Back to My Reports
      </button>

      <p className="eyebrow">
        REPORT DETAILS
      </p>

      <h1>{report.issue}</h1>

      <p className="subtitle">
        Report ID: {report.id}
      </p>

      <section className="details-grid">

        <section className="panel">

          <div className="detail-header">

            <h2>
              Report Information
            </h2>

            <span
              className={`status status-${report.status.toLowerCase()}`}
            >
              {report.status}
            </span>

          </div>

          <div className="detail-list">

            <p>
              <strong>
                Issue:
              </strong>

              {report.issue}
            </p>

            <p>
              <strong>
                Category:
              </strong>

              {report.category}
            </p>

            <p>
              <strong>
                Location:
              </strong>

              {report.location}
            </p>

            <p>
              <strong>
                Date:
              </strong>

              {report.date}
            </p>

            <p>
              <strong>
                Time:
              </strong>

              {report.time}
            </p>

            <p>
              <strong>
                Priority:
              </strong>

              {report.priority}
            </p>

          </div>

        </section>

        <section className="panel">

          <h2>
            Description
          </h2>

          <p className="description-text">
            {report.description}
          </p>

        </section>

      </section>

      <section className="panel">

        <h2>Evidence</h2>

        <div className="evidence-placeholder">

          {report.evidence ? (
            <p>
              Uploaded file:{" "}
              {report.evidence}
            </p>
          ) : (
            <p>
              No evidence photo uploaded.
            </p>
          )}

        </div>

      </section>

      <section className="panel">

        <h2>
          Report Timeline
        </h2>

        <div className="timeline">

          <div className="timeline-item active">
            <span>01</span>
            <strong>
              Reported
            </strong>
          </div>

          <div
            className={
              report.status !== "New"
                ? "timeline-item active"
                : "timeline-item"
            }
          >
            <span>02</span>
            <strong>
              Verified
            </strong>
          </div>

          <div
            className={
              report.status === "Ongoing" ||
              report.status === "Closed"
                ? "timeline-item active"
                : "timeline-item"
            }
          >
            <span>03</span>
            <strong>
              Assigned
            </strong>
          </div>

          <div
            className={
              report.status === "Ongoing" ||
              report.status === "Closed"
                ? "timeline-item active"
                : "timeline-item"
            }
          >
            <span>04</span>
            <strong>
              In Progress
            </strong>
          </div>

          <div
            className={
              report.status === "Closed"
                ? "timeline-item active"
                : "timeline-item"
            }
          >
            <span>05</span>
            <strong>
              Completed
            </strong>
          </div>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   FIELD INSPECTOR DASHBOARD
========================================================= */

function InspectorDashboard({
  setActive,
  reports,
}) {
  const pending =
    reports.filter(
      (report) =>
        report.status === "New"
    );

  const rejected =
    reports.filter(
      (report) =>
        report.status === "Rejected"
    );

  return (
    <main className="main">

      <div className="dashboard-header">

        <div>

          <p className="eyebrow">
            FIELD INSPECTOR
          </p>

          <h1>
            Verification Queue
          </h1>

          <p className="subtitle">
            Review submitted reports and
            take appropriate action.
          </p>

        </div>

        <img
          src={logo}
          alt="RoadWatch Logo"
          className="dashboard-logo"
        />

      </div>

      <section className="stats inspector-stats">

        <div>
          <span>
            Pending Verification
          </span>

          <strong>
            {pending.length}
          </strong>

          <small>
            Requires review
          </small>
        </div>

        <div>
          <span>
            Due Today
          </span>

          <strong>4</strong>

          <small>
            Reports needing action
          </small>
        </div>

        <div>
          <span>
            Verified This Week
          </span>

          <strong>21</strong>

          <small>
            Successfully reviewed
          </small>
        </div>

        <div>
          <span>
            Rejected
          </span>

          <strong>
            {rejected.length}
          </strong>

          <small>
            Reports rejected
          </small>
        </div>

      </section>

      <section className="panel queue-panel">

        <div className="section-heading">

          <div>

            <p className="eyebrow">
              MAIN WORK AREA
            </p>

            <h2>
              Verification Queue
            </h2>

            <p>
              Review reports that require
              verification.
            </p>

          </div>

          <span className="section-count">
            {pending.length} Pending
          </span>

        </div>

        <div className="table-container">

          <table className="table inspector-table">

            <thead>

              <tr>
                <th>Report ID</th>
                <th>Issue Type</th>
                <th>Location</th>
                <th>Date Submitted</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned Action</th>
              </tr>

            </thead>

            <tbody>

              {pending.map((report) => (
                <tr key={report.id}>

                  <td>
                    <strong>
                      {report.id}
                    </strong>
                  </td>

                  <td>
                    {report.issue}
                  </td>

                  <td>
                    {report.location}
                  </td>

                  <td>
                    {report.date}
                  </td>

                  <td>
                    <span
                      className={`priority priority-${report.priority.toLowerCase()}`}
                    >
                      {report.priority}
                    </span>
                  </td>

                  <td>
                    <span className="status status-new">
                      Pending
                    </span>
                  </td>

                  <td>
                    <button
                      className="gold small-btn"
                      onClick={() =>
                        setActive(
                          `Inspector Details:${report.id}`
                        )
                      }
                    >
                      View Details
                    </button>
                  </td>

                </tr>
              ))}

              {pending.length ===
                0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="empty-cell"
                  >
                    No reports currently
                    require verification.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   INSPECTOR REPORT DETAILS
========================================================= */

function InspectorReportDetails({
  setActive,
  report,
  onUpdateReport,
}) {
  const [notes, setNotes] =
    useState("");

  if (!report) {
    return (
      <main className="main">

        <button
          className="back-btn"
          onClick={() =>
            setActive(
              "Verification Queue"
            )
          }
        >
          ← Back to Verification Queue
        </button>

        <section className="panel">

          <h2>
            Report Not Found
          </h2>

        </section>

      </main>
    );
  }

  function updateStatus(status) {
    onUpdateReport(
      report.id,
      status
    );

    setActive(
      "Verification Queue"
    );
  }

  return (
    <main className="main">

      <button
        className="back-btn"
        onClick={() =>
          setActive(
            "Verification Queue"
          )
        }
      >
        ← Back to Verification Queue
      </button>

      <div className="detail-page-header">

        <div>

          <p className="eyebrow">
            REVIEW REPORT
          </p>

          <h1>
            {report.issue}
          </h1>

          <p className="subtitle">
            Report ID: {report.id}
          </p>

        </div>

        <span className="status status-new">
          {report.status}
        </span>

      </div>

      <section className="inspector-detail-grid">

        <section className="panel evidence-panel">

          <h2>
            Evidence Photo
          </h2>

          <div className="large-evidence">

            {report.evidence ? (
              <p>
                Uploaded evidence:{" "}
                {report.evidence}
              </p>
            ) : (
              <div>

                <span className="evidence-icon">
                  📷
                </span>

                <p>
                  Evidence photo
                  placeholder
                </p>

              </div>
            )}

          </div>

        </section>

        <section className="panel">

          <h2>
            Report Description
          </h2>

          <p className="description-text">
            {report.description}
          </p>

          <div className="detail-list">

            <p>
              <strong>
                Issue Type:
              </strong>

              {report.category}
            </p>

            <p>
              <strong>
                Priority:
              </strong>

              {report.priority}
            </p>

            <p>
              <strong>
                Date:
              </strong>

              {report.date}
            </p>

            <p>
              <strong>
                Time:
              </strong>

              {report.time}
            </p>

          </div>

        </section>

      </section>

      <section className="panel">

        <h2>
          Exact Location
        </h2>

        <p>
          <strong>
            Location:
          </strong>{" "}
          {report.location}
        </p>

        <div className="map-placeholder">

          <span>📍</span>

          <p>
            Map location will appear
            here
          </p>

          <small>
            {report.location}
          </small>

        </div>

      </section>

      <section className="panel">

        <h2>
          Citizen Information
        </h2>

        <div className="citizen-info-grid">

          <div>
            <span>Name</span>

            <strong>
              {report.reporter}
            </strong>
          </div>

          <div>
            <span>Email</span>

            <strong>
              {report.reporterEmail}
            </strong>
          </div>

        </div>

      </section>

      <section className="panel">

        <h2>
          Inspector Notes
        </h2>

        <textarea
          className="notes-area"
          placeholder="Enter verification notes..."
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
        />

      </section>

      <section className="panel action-panel">

        <div>

          <h2>
            Review Decision
          </h2>

          <p>
            Choose an action based on
            your verification.
          </p>

        </div>

        <div className="action-buttons">

          <button
            className="gold"
            onClick={() =>
              updateStatus(
                "Ongoing"
              )
            }
          >
            ✓ Verify Report
          </button>

          <button
            className="danger-btn"
            onClick={() =>
              updateStatus(
                "Rejected"
              )
            }
          >
            Reject Report
          </button>

          <button
            className="outline-btn"
            onClick={() =>
              alert(
                "Request for more information sent to the citizen."
              )
            }
          >
            Request More Information
          </button>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   ADMIN
========================================================= */

function AdminDashboard() {
  return (
    <main className="main">

      <p className="eyebrow">
        ADMINISTRATION
      </p>

      <h1>
        Administrator Dashboard
      </h1>

      <p className="subtitle">
        Manage users, reports, and system
        activity.
      </p>

      <section className="stats">

        <div>
          <span>
            Total Reports
          </span>

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

        <div>
          <span>Pending</span>
          <strong>15</strong>
        </div>

      </section>

      <section className="panel">

        <h2>
          User Management
        </h2>

        <div className="table-container">

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
                <td>
                  Kelvin Fulgencio
                </td>

                <td>
                  Citizen
                </td>

                <td>
                  Active
                </td>
              </tr>

              <tr>
                <td>
                  Jayson Godin
                </td>

                <td>
                  Field Inspector
                </td>

                <td>
                  Active
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </section>

      <section className="panel">

        <h2>
          Audit Logs
        </h2>

        <div className="table-container">

          <table className="table">

            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>
                  Sep 24
                </td>

                <td>
                  Inspector
                </td>

                <td>
                  Verified PF-0012
                </td>
              </tr>

              <tr>
                <td>
                  Sep 24
                </td>

                <td>
                  Citizen
                </td>

                <td>
                  Submitted PF-0013
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   PROFILE
========================================================= */

function Profile({
  user,
  role,
  onLogout,
}) {
  return (
    <main className="main">

      <p className="eyebrow">
        ACCOUNT
      </p>

      <h1>Profile</h1>

      <p className="subtitle">
        View your RoadWatch account
        information.
      </p>

      <section className="panel profile-card">

        <div className="profile-header">

          <img
            src={logo}
            alt="RoadWatch Logo"
          />

          <div>

            <h2>
              {user.firstName}{" "}
              {user.lastName}
            </h2>

            <span>
              {role}
            </span>

          </div>

        </div>

        <div className="profile-info">

          <p>
            <strong>
              Email
            </strong>

            {user.email}
          </p>

          <p>
            <strong>
              Mobile
            </strong>

            {user.mobile}
          </p>

          <p>
            <strong>
              Address
            </strong>

            {user.address.houseNumber}{" "}
            {user.address.street},{" "}
            {user.address.barangay},{" "}
            {user.address.city}
          </p>

        </div>

        <button
          className="danger-btn"
          onClick={onLogout}
        >
          Log Out
        </button>

      </section>

    </main>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

export default function App() {

  const [active, setActive] =
    useState("Dashboard");

  const [users, setUsers] =
    useState(() =>
      JSON.parse(
        localStorage.getItem(
          "users"
        ) ||
          JSON.stringify(
            DEFAULT_USERS
          )
      )
    );

  const [reports, setReports] =
    useState(DEFAULT_REPORTS);

  const [role, setRole] =
    useState(
      localStorage.getItem(
        "role"
      ) || ""
    );

  const [email, setEmail] =
    useState(
      localStorage.getItem(
        "email"
      ) || ""
    );

  const [password, setPassword] =
    useState("");

  const [
    authenticated,
    setAuthenticated,
  ] = useState(
    localStorage.getItem(
      "authenticated"
    ) === "true"
  );

  const [authPage, setAuthPage] =
    useState("login");

  const [modal, setModal] =
    useState("");

  const [
    showMinorModal,
    setShowMinorModal,
  ] = useState(false);

  const currentUser =
    users.find(
      (user) =>
        user.email === email
    );

  /* =====================================================
     LOGIN
  ===================================================== */

  function handleLogin() {
    const user =
      users.find(
        (item) =>
          item.email.toLowerCase() ===
            email.toLowerCase() &&
          item.password ===
            password
      );

    if (!user) {
      alert(
        "Invalid email or password."
      );

      return;
    }

    setRole(user.role);

    setEmail(user.email);

    localStorage.setItem(
      "role",
      user.role
    );

    localStorage.setItem(
      "email",
      user.email
    );

    localStorage.setItem(
      "authenticated",
      "true"
    );

    setPassword("");

    setAuthenticated(true);

    setActive("Dashboard");

    setModal(
      "Login successful."
    );
  }

  /* =====================================================
     REGISTRATION
  ===================================================== */

  function handleRegistrationSuccess() {
    const storedUsers =
      JSON.parse(
        localStorage.getItem(
          "users"
        ) ||
          JSON.stringify(
            DEFAULT_USERS
          )
      );

    setUsers(storedUsers);

    setAuthPage("login");

    setModal(
      "Your account has been created successfully."
    );
  }

  /* =====================================================
     SUBMIT REPORT
  ===================================================== */

  function handleSubmitReport(
    report
  ) {
    setReports(
      (previousReports) => [
        report,
        ...previousReports,
      ]
    );

    setActive("My Reports");

    setModal(
      "Your report has been submitted successfully."
    );
  }

  /* =====================================================
     UPDATE REPORT
  ===================================================== */

  function updateReportStatus(
    reportId,
    status
  ) {
    setReports(
      (previousReports) =>
        previousReports.map(
          (report) =>
            report.id === reportId
              ? {
                  ...report,
                  status,
                }
              : report
        )
    );
  }

  /* =====================================================
     LOGOUT
  ===================================================== */

  function handleLogout() {
    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "email"
    );

    localStorage.removeItem(
      "authenticated"
    );

    setRole("");
    setEmail("");
    setPassword("");

    setAuthenticated(false);

    setAuthPage("login");

    setActive("Dashboard");
  }

  /* =====================================================
     AUTHENTICATION SCREEN
  ===================================================== */

  if (!authenticated) {

    if (authPage === "login") {
      return (
        <>
          <Login
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={
              setPassword
            }
            onLogin={
              handleLogin
            }
            setAuthPage={
              setAuthPage
            }
          />

          {modal && (
            <SuccessModal
              message={modal}
              onClose={() =>
                setModal("")
              }
            />
          )}
        </>
      );
    }

    return (
      <>
        <Register
          setAuthPage={
            setAuthPage
          }
          onRegister={
            handleRegistrationSuccess
          }
          setShowMinorModal={
            setShowMinorModal
          }
        />

        {modal && (
          <SuccessModal
            message={modal}
            onClose={() =>
              setModal("")
            }
          />
        )}

        {showMinorModal && (
          <MinorModal
            onClose={() =>
              setShowMinorModal(
                false
              )
            }
          />
        )}
      </>
    );
  }

  /* =====================================================
     SELECTED REPORT
  ===================================================== */

  const selectedReportId =
    active.includes(":")
      ? active.split(":")[1]
      : null;

  const selectedReport =
    reports.find(
      (report) =>
        report.id ===
        selectedReportId
    );

  /* =====================================================
     AUTHENTICATED APPLICATION
  ===================================================== */

  return (
    <div className="app">

      <Sidebar
        role={role}
        active={
          active.includes(":")
            ? active.split(":")[0]
            : active
        }
        setActive={
          setActive
        }
        user={
          currentUser
        }
      />

      {/* CITIZEN DASHBOARD */}

      {active ===
        "Dashboard" &&
        role === "Citizen" && (
          <Dashboard
            setActive={
              setActive
            }
            reports={
              reports
            }
            user={
              currentUser
            }
          />
        )}

      {/* INSPECTOR DASHBOARD */}

      {active ===
        "Dashboard" &&
        role ===
          "Field Inspector" && (
          <InspectorDashboard
            setActive={
              setActive
            }
            reports={
              reports
            }
          />
        )}

      {/* ADMIN DASHBOARD */}

      {active ===
        "Dashboard" &&
        role ===
          "Administrator" && (
          <AdminDashboard />
        )}

      {/* SUBMIT REPORT */}

      {active ===
        "Submit Report" &&
        role === "Citizen" && (
          <SubmitReport
            setActive={
              setActive
            }
            user={
              currentUser
            }
            onSubmit={
              handleSubmitReport
            }
          />
        )}

      {/* MY REPORTS */}

      {active ===
        "My Reports" &&
        role === "Citizen" && (
          <MyReports
            setActive={
              setActive
            }
            reports={
              reports
            }
            user={
              currentUser
            }
          />
        )}

      {/* CITIZEN REPORT DETAILS */}

      {active.startsWith(
        "Report Details:"
      ) &&
        role === "Citizen" && (
          <ReportDetails
            setActive={
              setActive
            }
            report={
              selectedReport
            }
          />
        )}

      {/* VERIFICATION QUEUE */}

      {active ===
        "Verification Queue" &&
        role ===
          "Field Inspector" && (
          <InspectorDashboard
            setActive={
              setActive
            }
            reports={
              reports
            }
          />
        )}

      {/* INSPECTOR DETAILS */}

      {active.startsWith(
        "Inspector Details:"
      ) &&
        role ===
          "Field Inspector" && (
          <InspectorReportDetails
            setActive={
              setActive
            }
            report={
              selectedReport
            }
            onUpdateReport={
              updateReportStatus
            }
          />
        )}

      {/* ADMINISTRATOR */}

      {active ===
        "Administrator" &&
        role ===
          "Administrator" && (
          <AdminDashboard />
        )}

      {/* PROFILE */}

      {active === "Profile" && (
        <Profile
          user={
            currentUser
          }
          role={role}
          onLogout={
            handleLogout
          }
        />
      )}

      {/* SUCCESS MODAL */}

      {modal && (
        <SuccessModal
          message={modal}
          onClose={() =>
            setModal("")
          }
        />
      )}

    </div>
  );
}