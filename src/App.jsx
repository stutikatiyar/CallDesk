

import React, { useEffect, useMemo, useState } from "react";



import {

  Activity,

  ArrowDownRight,

  ArrowUpRight,

  Bell,

  CalendarDays,

  Check,

  ChevronDown,

  ChevronLeft,

  ChevronRight,

  CircleHelp,

  Clock3,

  Headphones,

  LayoutDashboard,

  LogOut,

  Menu,

  MessageSquareText,

  MoreHorizontal,

  Moon,

  Phone,

  Plus,

  Search,

  Settings,

  ShieldCheck,

  SlidersHorizontal,

  Sparkles,

  Sun,

  Users,

  X,

  Zap,

} from "lucide-react";

import "./index.css";



const initialCalls = [

  {

    id: "CC-1048",

    name: "Aarav Mehta",

    initials: "AM",

    email: "aarav.mehta@email.com",

    phone: "+91 98765 43210",

    topic: "Payment not reflecting",

    time: "09:42 AM",

    duration: "08:24",

    status: "In progress",

    priority: "High",

    channel: "Phone",

    color: "purple",

    notes: "Customer completed payment yesterday. Verify transaction reference and update.",

  },

  {

    id: "CC-1047",

    name: "Diya Sharma",

    initials: "DS",

    email: "diya.sharma@email.com",

    phone: "+91 98765 43211",

    topic: "Account access issue",

    time: "09:18 AM",

    duration: "05:12",

    status: "Resolved",

    priority: "Normal",

    channel: "Phone",

    color: "orange",

    notes: "Password reset link sent. Customer confirmed access restored.",

  },

  {

    id: "CC-1046",

    name: "Kabir Nair",

    initials: "KN",

    email: "kabir.nair@email.com",

    phone: "+91 98765 43212",

    topic: "Refund request",

    time: "08:56 AM",

    duration: "12:03",

    status: "Follow-up",

    priority: "High",

    channel: "Phone",

    color: "green",

    notes: "Refund is pending review. Follow up with the billing team tomorrow.",

  },

  {

    id: "CC-1045",

    name: "Ananya Rao",

    initials: "AR",

    email: "ananya.rao@email.com",

    phone: "+91 98765 43213",

    topic: "Update contact details",

    time: "08:31 AM",

    duration: "03:47",

    status: "Resolved",

    priority: "Low",

    channel: "Chat",

    color: "blue",

    notes: "Contact details updated after verification.",

  },

  {

    id: "CC-1044",

    name: "Reyansh Patel",

    initials: "RP",

    email: "reyansh.patel@email.com",

    phone: "+91 98765 43214",

    topic: "Delivery status enquiry",

    time: "08:05 AM",

    duration: "06:19",

    status: "Open",

    priority: "Normal",

    channel: "Phone",

    color: "pink",

    notes: "Check courier tracking and share an update with the customer.",

  },

  {

    id: "CC-1043",

    name: "Ishita Verma",

    initials: "IV",

    email: "ishita.verma@email.com",

    phone: "+91 98765 43215",

    topic: "Subscription cancellation",

    time: "Yesterday",

    duration: "07:02",

    status: "Follow-up",

    priority: "Normal",

    channel: "Email",

    color: "yellow",

    notes: "Customer requested cancellation at the end of the billing period.",

  },

];



const navItems = [

  { label: "Overview", icon: LayoutDashboard },

  { label: "Calls & cases", icon: Headphones },

  { label: "Customers", icon: Users },

  { label: "Follow-ups", icon: CalendarDays },

];



const weeklyCalls = [

  { day: "Mon", current: 48, previous: 35 },

  { day: "Tue", current: 64, previous: 45 },

  { day: "Wed", current: 53, previous: 40 },

  { day: "Thu", current: 74, previous: 51 },

  { day: "Fri", current: 60, previous: 47 },

  { day: "Sat", current: 38, previous: 28 },

  { day: "Sun", current: 27, previous: 22 },

];



function Avatar({ call, small = false }) {

  return (

    <div className={`avatar avatar-${call.color} ${small ? "avatar-small" : ""}`}>

      {call.initials}

    </div>

  );

}



function Status({ status }) {

  const className = status.toLowerCase().replaceAll(" ", "-");



  return (

    <span className={`status status-${className}`}>

      <span className="status-dot" />

      {status}

    </span>

  );

}



function StatCard({ title, value, change, direction, icon: Icon, tone, caption }) {

  return (

    <article className="stat-card">

      <div className="stat-top">

        <span className="stat-title">{title}</span>

        <span className={`stat-icon ${tone}`}>

          <Icon size={19} />

        </span>

      </div>



      <div className="stat-value-row">

        <strong>{value}</strong>

        <span className={`change ${direction}`}>

          {direction === "up" ? (

            <ArrowUpRight size={14} />

          ) : (

            <ArrowDownRight size={14} />

          )}

          {change}

        </span>

      </div>



      <div className="stat-caption">{caption}</div>

    </article>

  );

}



export default function App() {

  const [activeNav, setActiveNav] = useState("Overview");



  const [calls, setCalls] = useState(() => {
  try {
    const savedCalls = localStorage.getItem("calldesk-cases");
    return savedCalls ? JSON.parse(savedCalls) : initialCalls;
  } catch (error) {
    console.error("Could not load saved cases:", error);
    return initialCalls;
  }
});

useEffect(() => {
  try {
    localStorage.setItem("calldesk-cases", JSON.stringify(calls));
  } catch (error) {
    console.error("Could not save cases:", error);
  }
}, [calls]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All cases");

  const [selected, setSelected] = useState(null);

  const [showDetail, setShowDetail] = useState(false);

  const [showNew, setShowNew] = useState(false);

  const [mobileNav, setMobileNav] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {

    try {

      return localStorage.getItem("theme") === "dark";

    } catch {

      return false;

    }

  });

  const [toast, setToast] = useState("");

  const [newName, setNewName] = useState("");

  const [newTopic, setNewTopic] = useState("");

  const [newPhone, setNewPhone] = useState("");

  const [newPriority, setNewPriority] = useState("Normal");

  const [notesDraft, setNotesDraft] = useState("");



  const toggleTheme = () => {

    const next = !darkMode;

    setDarkMode(next);



    try {

      localStorage.setItem("theme", next ? "dark" : "light");

    } catch {

      // Theme still works if localStorage is unavailable.*

    }

  };



  const notify = (message) => {

    setToast(message);

    window.clearTimeout(window.__callDeskToast);

    window.__callDeskToast = window.setTimeout(() => setToast(""), 2600);

  };



  const filteredCalls = useMemo(() => {

    return calls.filter((call) => {

      const searchable = `${call.name} ${call.id} ${call.topic} ${call.phone} ${call.email}`;

      const matchesSearch = searchable.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =

        statusFilter === "All cases" || call.status === statusFilter;

      const matchesNav =

        activeNav !== "Follow-ups" || call.status === "Follow-up";

      const matchesCustomers = activeNav !== "Customers" || true;



      return matchesSearch && matchesStatus && matchesNav && matchesCustomers;

    });

  }, [calls, search, statusFilter, activeNav]);



  const openCases = calls.filter(

    (call) => call.status === "Open" || call.status === "In progress"

  ).length;

  const followUpCases = calls.filter((call) => call.status === "Follow-up").length;

  const resolvedCases = calls.filter((call) => call.status === "Resolved").length;

  const highPriorityCases = calls.filter(

    (call) => call.priority === "High" && call.status !== "Resolved"

  ).length;



  const openDetails = (call) => {

    setSelected(call);

    setNotesDraft(call.notes);

    setShowDetail(true);

  };



  const updateCall = (id, patch) => {

    setCalls((previous) =>

      previous.map((call) => (call.id === id ? { ...call, ...patch } : call))

    );



    setSelected((previous) =>

      previous?.id === id ? { ...previous, ...patch } : previous

    );

  };



  const createCase = (event) => {

    event.preventDefault();



    if (!newName.trim() || !newTopic.trim()) {

      notify("Please fill in the required fields");

      return;

    }



    const initials = newName

      .trim()

      .split(/\s+/)

      .slice(0, 2)

      .map((part) => part[0])

      .join("")

      .toUpperCase();



    const item = {

      id: `CC-${1049 + calls.length - initialCalls.length}`,

      name: newName.trim(),

      initials,

      email: "customer@example.com",

      phone: newPhone.trim() || "Not provided",

      topic: newTopic.trim(),

      time: "Just now",

      duration: "—",

      status: "Open",

      priority: newPriority,

      channel: "Phone",

      color: ["purple", "blue", "green", "orange", "pink"][

        calls.length % 5

      ],

      notes: "New case created. Add notes after speaking with the customer.",

    };



    setCalls((previous) => [item, ...previous]);

    setActiveNav("Calls & cases");

    setStatusFilter("All cases");

    setSearch("");

    setShowNew(false);

    setNewName("");

    setNewTopic("");

    setNewPhone("");

    setNewPriority("Normal");

    notify("New case created successfully");

  };



  const pageTitle =

    activeNav === "Overview"

      ? "Good morning, Stuti"

      : activeNav;



  const pageSubtitle =

    activeNav === "Overview"

      ? "Here's what's happening with your support queue today."

      : activeNav === "Follow-ups"

        ? "Keep track of customers who need another touchpoint."

        : activeNav === "Customers"

          ? "Browse customer conversations and contact details."

          : "Review calls, manage cases, and keep customers moving forward.";



  const visibleCalls = filteredCalls.slice(

    0,

    activeNav === "Overview" ? 5 : 20

  );



  return (

    <div className={`app-shell ${darkMode ? "dark-theme" : "light-theme"}`}>

      {mobileNav && (

        <button

          className="mobile-scrim"

          aria-label="Close navigation"

          onClick={() => setMobileNav(false)}

        />

      )}



      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>

        <div className="brand">

          <div className="brand-mark">

            <Headphones size={22} strokeWidth={2.3} />

          </div>

          <span className="brand-name">

            call<span>desk</span>

          </span>

          <button

            className="icon-button mobile-close"

            aria-label="Close navigation"

            onClick={() => setMobileNav(false)}

          >

            <X size={19} />

          </button>

        </div>



        <div className="workspace-switcher">

          <div className="workspace-logo">C</div>

          <div className="workspace-copy">

            <span>WORKSPACE</span>

            <strong>Customer Support</strong>

          </div>

          <ChevronDown size={15} />

        </div>



        <div className="nav-label">WORKSPACE</div>



        <nav className="main-nav">

          {navItems.map(({ label, icon: Icon }) => (

            <button

              key={label}

              className={`nav-item ${activeNav === label ? "active" : ""}`}

              onClick={() => {

                setActiveNav(label);

                setMobileNav(false);

                setSearch("");

                setStatusFilter("All cases");

              }}

            >

              <Icon size={18} />

              <span>{label}</span>

              {label === "Follow-ups" && followUpCases > 0 && (

                <span className="nav-count">{followUpCases}</span>

              )}

              {activeNav === label && <span className="active-indicator" />}

            </button>

          ))}

        </nav>



        <div className="nav-label tools-label">PREFERENCES</div>



        <button className="nav-item" onClick={toggleTheme}>

          {darkMode ? <Sun size={18} /> : <Moon size={18} />}

          <span>{darkMode ? "Light appearance" : "Dark appearance"}</span>

        </button>



        <button

          className="nav-item"

          onClick={() => notify("Settings are available in this demo soon")}

        >

          <Settings size={18} />

          <span>Settings</span>

        </button>



        <div className="sidebar-spacer" />



        <div className="help-card">

          <div className="help-icon">

            <CircleHelp size={18} />

          </div>

          <strong>Need a hand?</strong>

          <p>Find tips to make every customer conversation count.</p>

          <button onClick={() => notify("Help centre is a demo action")}>

            Visit help centre <ChevronRight size={14} />

          </button>

        </div>



        <div className="profile">

          <div className="profile-avatar">SK</div>

          <div className="profile-info">

            <strong>Stuti Katiyar</strong>

            <span>Support specialist</span>

          </div>

          <button

            className="icon-button profile-menu"

            aria-label="Profile options"

            onClick={() => notify("Signed in as Stuti Katiyar")}

          >

            <MoreHorizontal size={20} />

          </button>

        </div>

      </aside>



      <main className="main-area">

        <header className="topbar">

          <button

            className="icon-button mobile-menu"

            aria-label="Open navigation"

            onClick={() => setMobileNav(true)}

          >

            <Menu size={21} />

          </button>



          <div className="breadcrumb">

            <span>Workspace</span>

            <ChevronRight size={14} />

            <strong>{activeNav}</strong>

          </div>



          <div className="topbar-actions">

            <div className="availability">

              <span className="online-dot" />

              <span>Available</span>

              <ChevronDown size={14} />

            </div>



            <button

              className="icon-button theme-toggle"

              onClick={toggleTheme}

              aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}

              title={darkMode ? "Switch to light theme" : "Switch to dark theme"}

            >

              {darkMode ? <Sun size={19} /> : <Moon size={19} />}

            </button>



            <button

              className="icon-button notification"

              aria-label="Notifications"

              onClick={() => notify("You're all caught up")}

            >

              <Bell size={19} />

              <span className="notification-dot" />

            </button>



            <div className="top-avatar">SK</div>

          </div>

        </header>



        <div className="page-content">

          <section className="page-heading">

            <div>

              <div className="eyebrow">

                <Sparkles size={14} />

                YOUR SUPPORT DESK

              </div>

              <h1>

                {pageTitle}

                {activeNav === "Overview" && <span className="heading-star">✦</span>}

              </h1>

              <p>{pageSubtitle}</p>

            </div>



            <button className="primary-button" onClick={() => setShowNew(true)}>

              <Plus size={17} />

              Create new case

            </button>

          </section>



          {activeNav === "Overview" && (

            <>

              <section className="welcome-banner">

                <div className="welcome-orb orb-one" />

                <div className="welcome-orb orb-two" />

                <div className="welcome-content">

                  <div className="welcome-label">

                    <Zap size={14} /> YOUR DAILY OVERVIEW

                  </div>

                  <h2>Every conversation makes a difference.</h2>

                  <p>

                    You're making progress. Here's your support activity at a glance.

                  </p>

                  <button

                    className="banner-button"

                    onClick={() => setActiveNav("Calls & cases")}

                  >

                    Explore your cases <ChevronRight size={15} />

                  </button>

                </div>

                <div className="welcome-art" aria-hidden="true">

                  <div className="art-ring ring-one" />

                  <div className="art-ring ring-two" />

                  <div className="art-icon">

                    <Headphones size={47} />

                  </div>

                  <div className="art-bubble bubble-one">

                    <MessageSquareText size={19} />

                  </div>

                  <div className="art-bubble bubble-two">

                    <Check size={20} />

                  </div>

                </div>

              </section>



              <section className="stats-grid">

                <StatCard

                  title="Calls handled"

                  value="48"

                  change="12.8%"

                  direction="up"

                  icon={Phone}

                  tone="purple"

                  caption="Compared with yesterday"

                />

                <StatCard

                  title="Avg. handle time"

                  value="06:42"

                  change="4.2%"

                  direction="down"

                  icon={Clock3}

                  tone="orange"

                  caption="Compared with yesterday"

                />

                <StatCard

                  title="Resolution rate"

                  value="94.6%"

                  change="2.4%"

                  direction="up"

                  icon={ShieldCheck}

                  tone="green"

                  caption="Compared with last week"

                />

                <StatCard

                  title="Customer satisfaction"

                  value={<>4.8<span className="value-unit">/5</span></>}

                  change="0.3"

                  direction="up"

                  icon={Activity}

                  tone="blue"

                  caption="From 36 responses"

                />

              </section>



              <section className="overview-grid">

                <article className="panel performance-panel">

                  <div className="panel-heading">

                    <div>

                      <h2>Performance overview</h2>

                      <p>Your call activity throughout the week</p>

                    </div>

                    <span className="period-pill">

                      <CalendarDays size={14} /> This week

                    </span>

                  </div>



                  <div className="performance-summary">

                    <div>

                      <div className="performance-number">

                        312 <span>calls</span>

                      </div>

                      <div className="performance-change">

                        <ArrowUpRight size={15} /> 8.4%

                        <span>vs. last week</span>

                      </div>

                    </div>

                    <div className="chart-legend">

                      <span><i className="legend-current" /> This week</span>

                      <span><i className="legend-previous" /> Last week</span>

                    </div>

                  </div>



                  <div className="chart" aria-label="Weekly calls comparison chart">

                    <div className="chart-y-labels">

                      <span>80</span>

                      <span>60</span>

                      <span>40</span>

                      <span>20</span>

                      <span>0</span>

                    </div>



                    <div className="chart-plot">

                      {[20, 40, 60, 80].map((line) => (

                        <div

                          className="grid-line"

                          key={line}

                          style={{ bottom: `${(line / 80) * 100}%` }}

                        />

                      ))}



                      <div className="bars">

                        {weeklyCalls.map((item) => (

                          <div className="bar-group" key={item.day}>

                            <div className="bar-pair">

                              <div

                                className="bar previous"

                                style={{ height: `${(item.previous / 80) * 100}%` }}

                                title={`${item.previous} calls last week`}

                              />

                              <div

                                className="bar current"

                                style={{ height: `${(item.current / 80) * 100}%` }}

                                title={`${item.current} calls this week`}

                              />

                            </div>

                            <span>{item.day}</span>

                          </div>

                        ))}

                      </div>

                    </div>

                  </div>

                </article>



                <article className="panel queue-panel">

                  <div className="panel-heading">

                    <div>

                      <h2>My queue</h2>

                      <p>Cases that need your attention</p>

                    </div>

                    <button

                      className="text-button"

                      onClick={() => setActiveNav("Calls & cases")}

                    >

                      View all <ChevronRight size={15} />

                    </button>

                  </div>



                  <div className="queue-highlight">

                    <div className="queue-highlight-icon">

                      <Headphones size={21} />

                    </div>

                    <div>

                      <span>ACTIVE CASES</span>

                      <strong>{openCases}</strong>

                    </div>

                    <div className="queue-highlight-meta">

                      <span className="online-dot" /> In your queue

                    </div>

                  </div>



                  <div className="queue-metrics">

                    <div className="queue-metric">

                      <span className="queue-dot open-dot" />

                      <span>Open / in progress</span>

                      <strong>{openCases}</strong>

                    </div>

                    <div className="queue-metric">

                      <span className="queue-dot follow-dot" />

                      <span>Follow-ups needed</span>

                      <strong>{followUpCases}</strong>

                    </div>

                    <div className="queue-metric">

                      <span className="queue-dot done-dot" />

                      <span>Resolved cases</span>

                      <strong>{resolvedCases}</strong>

                    </div>

                  </div>



                  {highPriorityCases > 0 && (

                    <div className="attention-note">

                      <span className="attention-icon">!</span>

                      <span>

                        <strong>{highPriorityCases} high-priority</strong> case

                        {highPriorityCases === 1 ? "" : "s"} need attention.

                      </span>

                      <button

                        aria-label="View high priority cases"

                        onClick={() => {

                          setActiveNav("Calls & cases");

                          setStatusFilter("All cases");

                          setSearch("");

                        }}

                      >

                        <ChevronRight size={16} />

                      </button>

                    </div>

                  )}

                </article>

              </section>

            </>

          )}



          {activeNav !== "Overview" && (

            <section className="quick-stats">

              <div className="quick-stat">

                <span className="quick-stat-icon purple"><Headphones size={18} /></span>

                <div><span>Total cases</span><strong>{calls.length}</strong></div>

              </div>

              <div className="quick-stat">

                <span className="quick-stat-icon orange"><Clock3 size={18} /></span>

                <div><span>Open cases</span><strong>{openCases}</strong></div>

              </div>

              <div className="quick-stat">

                <span className="quick-stat-icon green"><Check size={18} /></span>

                <div><span>Resolved</span><strong>{resolvedCases}</strong></div>

              </div>

              <div className="quick-stat">

                <span className="quick-stat-icon blue"><CalendarDays size={18} /></span>

                <div><span>Follow-ups</span><strong>{followUpCases}</strong></div>

              </div>

            </section>

          )}



          <section className="panel cases-panel">

            <div className="panel-heading cases-heading">

              <div>

                <div className="section-title-row">

                  <h2>

                    {activeNav === "Follow-ups"

                      ? "Upcoming follow-ups"

                      : activeNav === "Customers"

                        ? "Customer directory"

                        : activeNav === "Overview"

                          ? "Recent calls & cases"

                          : "All calls & cases"}

                  </h2>

                  <span className="count-pill">{filteredCalls.length}</span>

                </div>

                <p>

                  {activeNav === "Overview"

                    ? "Stay on top of your latest conversations"

                    : "Search, filter, and open a record to see its details"}

                </p>

              </div>

              <button

                className="text-button"

                onClick={() => {

                  setActiveNav("Calls & cases");

                  setStatusFilter("All cases");

                }}

              >

                View all cases <ChevronRight size={15} />

              </button>

            </div>



            <div className="table-controls">

              <label className="search-box">

                <Search size={17} />

                <input

                  aria-label="Search cases"

                  value={search}

                  onChange={(event) => setSearch(event.target.value)}

                  placeholder="Search name, case ID, issue..."

                />

                {search && (

                  <button

                    className="clear-search"

                    aria-label="Clear search"

                    onClick={() => setSearch("")}

                  >

                    <X size={15} />

                  </button>

                )}

              </label>



              <label className="filter-wrap">

                <SlidersHorizontal size={16} />

                <select

                  aria-label="Filter by status"

                  value={statusFilter}

                  onChange={(event) => setStatusFilter(event.target.value)}

                >

                  <option>All cases</option>

                  <option>Open</option>

                  <option>In progress</option>

                  <option>Follow-up</option>

                  <option>Resolved</option>

                </select>

                <ChevronDown className="filter-chevron" size={14} />

              </label>

            </div>



            <div className="table-scroll">

              <table>

                <thead>

                  <tr>

                    <th>Customer</th>

                    <th>Case details</th>

                    <th>Time</th>

                    <th>Priority</th>

                    <th>Status</th>

                    <th aria-label="Actions" />

                  </tr>

                </thead>

                <tbody>

                  {visibleCalls.map((call) => (

                    <tr

                      key={call.id}

                      className="case-row"

                      onClick={() => openDetails(call)}

                    >

                      <td>

                        <div className="customer-cell">

                          <Avatar call={call} small />

                          <div className="customer-info">

                            <strong>{call.name}</strong>

                            <span>{call.id}</span>

                          </div>

                        </div>

                      </td>

                      <td>

                        <div className="case-topic">

                          <strong>{call.topic}</strong>

                          <span>

                            {call.channel === "Phone" ? (

                              <Phone size={12} />

                            ) : call.channel === "Chat" ? (

                              <MessageSquareText size={12} />

                            ) : (

                              <MessageSquareText size={12} />

                            )}

                            {call.channel} <span className="topic-separator">·</span> {call.duration}

                          </span>

                        </div>

                      </td>

                      <td className="time-cell">{call.time}</td>

                      <td>

                        <span className={`priority priority-${call.priority.toLowerCase()}`}>

                          <i />

                          {call.priority}

                        </span>

                      </td>

                      <td><Status status={call.status} /></td>

                      <td>

                        <button

                          className="row-more icon-button"

                          aria-label={`Open ${call.id}`}

                          onClick={(event) => {

                            event.stopPropagation();

                            openDetails(call);

                          }}

                        >

                          <ChevronRight size={17} />

                        </button>

                      </td>

                    </tr>

                  ))}



                  {visibleCalls.length === 0 && (

                    <tr>

                      <td colSpan="6">

                        <div className="empty-state">

                          <div className="empty-icon"><Search size={23} /></div>

                          <strong>No cases found</strong>

                          <span>Try a different search or status filter.</span>

                          <button

                            className="secondary-button"

                            onClick={() => {

                              setSearch("");

                              setStatusFilter("All cases");

                            }}

                          >

                            Clear filters

                          </button>

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>



            <div className="table-footer">

              <span>

                Showing <strong>{visibleCalls.length}</strong> of{" "}

                <strong>{filteredCalls.length}</strong> cases

              </span>

              <div className="pagination">

                <button className="pagination-button" disabled>

                  <ChevronLeft size={15} /> Previous

                </button>

                <span className="page-number">1</span>

                <button className="pagination-button" disabled>

                  Next <ChevronRight size={15} />

                </button>

              </div>

            </div>

          </section>



          <footer className="page-footer">

            <span>© 2026 CallDesk</span>

            <span className="system-status">

              <span className="online-dot" /> All systems operational

            </span>

            <span>Made for better conversations <span className="footer-heart">♥</span></span>

          </footer>

        </div>

      </main>



      {showDetail && selected && (

        <div className="drawer-backdrop" onClick={() => setShowDetail(false)}>

          <aside

            className="detail-drawer"

            role="dialog"

            aria-modal="true"

            aria-labelledby="drawer-title"

            onClick={(event) => event.stopPropagation()}

          >

            <div className="drawer-header">

              <div>

                <span className="eyebrow">CASE DETAILS</span>

                <h2 id="drawer-title">{selected.id}</h2>

                <p>Customer support record</p>

              </div>

              <button

                className="icon-button"

                aria-label="Close case details"

                onClick={() => setShowDetail(false)}

              >

                <X size={20} />

              </button>

            </div>



            <div className="drawer-customer">

              <Avatar call={selected} />

              <div>

                <h3>{selected.name}</h3>

                <p>{selected.email}</p>

                <p>{selected.phone}</p>

              </div>

            </div>



            <div className="drawer-section">

              <label>ISSUE DESCRIPTION</label>

              <h3>{selected.topic}</h3>

              <div className="drawer-tags">

                <Status status={selected.status} />

                <span className={`priority priority-${selected.priority.toLowerCase()}`}>

                  <i /> {selected.priority} priority

                </span>

              </div>

            </div>



            <div className="drawer-section">

              <label htmlFor="call-notes">CALL NOTES</label>

              <textarea

                id="call-notes"

                rows="5"

                value={notesDraft}

                onChange={(event) => setNotesDraft(event.target.value)}

                placeholder="Add notes from your conversation..."

              />

            </div>



            <div className="drawer-section">

              <label htmlFor="case-status">CASE STATUS</label>

              <select

                id="case-status"

                className="drawer-select"

                value={selected.status}

                onChange={(event) =>

                  updateCall(selected.id, { status: event.target.value })

                }

              >

                <option>Open</option>

                <option>In progress</option>

                <option>Follow-up</option>

                <option>Resolved</option>

              </select>

            </div>



            <div className="drawer-section">

              <label htmlFor="case-priority">PRIORITY LEVEL</label>

              <select

                id="case-priority"

                className="drawer-select"

                value={selected.priority}

                onChange={(event) =>

                  updateCall(selected.id, { priority: event.target.value })

                }

              >

                <option>Low</option>

                <option>Normal</option>

                <option>High</option>

              </select>

            </div>



            <div className="drawer-meta">

              <span><Clock3 size={15} /> Last activity: {selected.time}</span>

              <span><Phone size={15} /> Channel: {selected.channel}</span>

            </div>



            <div className="drawer-actions">

              <button

                className="secondary-button"

                onClick={() => setShowDetail(false)}

              >

                Close

              </button>

              <button

                className="primary-button"

                onClick={() => {

                  updateCall(selected.id, { notes: notesDraft });

                  setShowDetail(false);

                  notify("Case changes saved");

                }}

              >

                <Check size={16} /> Save changes

              </button>

            </div>

          </aside>

        </div>

      )}



      {showNew && (

        <div className="modal-backdrop" onClick={() => setShowNew(false)}>

          <section

            className="new-case-modal"

            role="dialog"

            aria-modal="true"

            aria-labelledby="new-case-title"

            onClick={(event) => event.stopPropagation()}

          >

            <div className="modal-heading">

              <div>

                <span className="eyebrow">NEW CUSTOMER ISSUE</span>

                <h2 id="new-case-title">Create a case</h2>

                <p>Add the details to start tracking this conversation.</p>

              </div>

              <button

                className="icon-button"

                aria-label="Close new case form"

                onClick={() => setShowNew(false)}

              >

                <X size={20} />

              </button>

            </div>



            <form onSubmit={createCase}>

              <label>

                Customer name <span className="required">*</span>

                <input

                  required

                  value={newName}

                  onChange={(event) => setNewName(event.target.value)}

                  placeholder="e.g. Riya Kapoor"

                />

              </label>



              <label>

                Issue / reason for contact <span className="required">*</span>

                <input

                  required

                  value={newTopic}

                  onChange={(event) => setNewTopic(event.target.value)}

                  placeholder="e.g. Payment query"

                />

              </label>



              <label>

                Phone number

                <input

                  type="tel"

                  value={newPhone}

                  onChange={(event) => setNewPhone(event.target.value)}

                  placeholder="+91 98765 43210"

                />

              </label>



              <label>

                Priority

                <select

                  value={newPriority}

                  onChange={(event) => setNewPriority(event.target.value)}

                >

                  <option>Low</option>

                  <option>Normal</option>

                  <option>High</option>

                </select>

              </label>



              <div className="modal-actions">

                <button

                  type="button"

                  className="secondary-button"

                  onClick={() => setShowNew(false)}

                >

                  Cancel

                </button>

                <button type="submit" className="primary-button">

                  <Plus size={16} /> Create case

                </button>

              </div>

            </form>

          </section>

        </div>

      )}



      {toast && (

        <div className="toast" role="status">

          <span className="toast-check"><Check size={15} /></span>

          {toast}

        </div>

      )}

    </div>

  );

}
