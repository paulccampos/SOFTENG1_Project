# UI/UX Design

## Navigation Structure

The RoadWatch system uses role-based navigation because different
users perform different tasks within the infrastructure reporting
and repair process.

### Citizen

Dashboard  
→ Submit Report  
→ My Reports  
→ Report Details  
→ Profile

### Field Inspector

Dashboard  
→ Verification Queue  
→ Report Details  
→ Audit Log

### Administrator

Dashboard  
→ Reports  
→ Assignments  
→ Users  
→ Audit Log

### Crew Supervisor / Repair Crew

Dashboard  
→ Assigned Tasks  
→ Task Details  
→ Status Updates  
→ Status History

---

## Report Transaction Flow

A citizen submits an infrastructure damage report containing
the category, description, location, and photo evidence.

The report then follows the system workflow:

**Reported → Verified / Rejected → Assigned → In Progress → Completed**

---

## Figma Mockups

The initial UI prototype contains three primary screens:

### 1. Citizen Dashboard

The dashboard allows citizens to view their submitted reports,
monitor report statuses, and create a new infrastructure damage
report.

### 2. Submit Damage Report

This screen allows citizens to submit an infrastructure issue
with its category, description, location, and photo evidence.

### 3. Report Tracking

This screen allows citizens to monitor the progress of a submitted
report through the system workflow and view its status and audit
timeline.

---

## Color Palette

The RoadWatch interface uses a dark navy and gold color palette
to create a professional, modern, and public-service-oriented
visual identity.

| Element | Color | Hex |
|---|---|---|
| Main Background | Dark Navy | #07152B |
| Sidebar / Cards | Navy | #0B1F3A |
| Secondary Surface | Blue Navy | #0D2748 |
| Borders | Muted Navy | #1D3656 |
| Primary Accent | Dark Gold | #D4AF37 |
| Main Text | White | #F4F7FA |
| Secondary Text | Blue Gray | #8FA1B7 |

---

## Figma Prototype Navigation

The primary citizen transaction flow is:

**Citizen Dashboard**
↓
**Submit Damage Report**
↓
**Report Tracking**

The dashboard also provides direct access to the citizen's
submitted reports:

**Citizen Dashboard**
↓
**My Reports**
↓
**Report Tracking**

The Report Tracking screen provides navigation back to the
Citizen Dashboard.

---

## User Roles

### Citizen

Citizens can submit infrastructure damage reports and monitor
the progress of their submitted reports.

### Field Inspector

Field Inspectors review submitted reports and verify whether
the reported infrastructure problem is valid.

### Administrator

Administrators manage reports, users, assignments, and the
overall repair workflow.

### Crew Supervisor

Crew Supervisors manage assigned repair tasks and update the
progress of repairs.

### Repair Crew

Repair Crew members perform the assigned infrastructure repairs
and provide status updates.

---

## Design Goals

The UI/UX design aims to provide:

- Clear navigation
- Simple report submission
- Easy-to-understand report statuses
- Transparent repair progress
- Role-based access
- Consistent visual design
- Clear transaction workflow
- Support for audit and status tracking