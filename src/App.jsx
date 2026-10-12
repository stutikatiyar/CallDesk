import React from 'react';

import { useMemo, useState } from 'react';

import {

  Activity, ArrowDownRight, ArrowUpRight, Bell, CalendarDays, Check,

  ChevronDown, ChevronRight, CircleHelp, Clock3, Headphones, LayoutDashboard,

  LogOut, Menu, MessageSquareText, MoreHorizontal, Phone, Plus, Search,

  Settings, ShieldCheck, SlidersHorizontal, Sparkles, Sun, Moon, Users, X

} from 'lucide-react';



const initialCalls = [

  { id: 'CC-1048', name: 'Aarav Mehta', initials: 'AM', email: 'aarav.mehta@email.com', phone: '+91 98765 43210', topic: 'Payment not reflecting', time: '09:42 AM', duration: '08:24', status: 'In progress', priority: 'High', channel: 'Phone', color: 'lavender', notes: 'Customer completed payment yesterday. Verify transaction reference and update.' },

  { id: 'CC-1047', name: 'Diya Sharma', initials: 'DS', email: 'diya.sharma@email.com', phone: '+91 98765 43211', topic: 'Account access issue', time: '09:18 AM', duration: '05:12', status: 'Resolved', priority: 'Normal', channel: 'Phone', color: 'peach', notes: 'Password reset link sent; customer confirmed access restored.' },

  { id: 'CC-1046', name: 'Kabir Nair', initials: 'KN', email: 'kabir.nair@email.com', phone: '+91 98765 43212', topic: 'Refund request', time: '08:56 AM', duration: '12:03', status: 'Follow-up', priority: 'High', channel: 'Phone', color: 'mint', notes: 'Refund is pending review. Follow up with billing team tomorrow.' },

  { id: 'CC-1045', name: 'Ananya Rao', initials: 'AR', email: 'ananya.rao@email.com', phone: '+91 98765 43213', topic: 'Update contact details', time: '08:31 AM', duration: '03:47', status: 'Resolved', priority: 'Low', channel: 'Chat', color: 'blue', notes: 'Contact details updated after verification.' },

  { id: 'CC-1044', name: 'Reyansh Patel', initials: 'RP', email: 'reyansh.patel@email.com', phone: '+91 98765 43214', topic: 'Delivery status enquiry', time: '08:05 AM', duration: '06:19', status: 'Open', priority: 'Normal', channel: 'Phone', color: 'rose', notes: 'Check courier tracking and share an update with customer.' },

  { id: 'CC-1043', name: 'Ishita Verma', initials: 'IV', email: 'ishita.verma@email.com', phone: '+91 98765 43215', topic: 'Subscription cancellation', time: 'Yesterday', duration: '07:02', status: 'Follow-up', priority: 'Normal', channel: 'Email', color: 'yellow', notes: 'Customer requested cancellation at the end of the billing period.' },

];



const navItems = [

  { label: 'Overview', icon: LayoutDashboard },

  { label: 'Calls & cases', icon: Headphones },

  { label: 'Customers', icon: Users },

  { label: 'Follow-ups', icon: CalendarDays },

];



function Avatar({ call, small = false }) {

  return <div className={`avatar ${call.color} ${small ? 'avatar-small' : ''}`}>{call.initials}</div>;

}

function Status({ status }) {

  const cls = status.toLowerCase().replaceAll(' ', '-');

  return <span className={`status status-${cls}`}><span />{status}</span>;

}

function StatCard({ title, value, change, direction, icon: Icon, tone, caption }) {

  return <article className="stat-card">

    <div className="stat-top"><span>{title}</span><span className={`stat-icon ${tone}`}><Icon size={18}/></span></div>

    <div className="stat-value-row"><strong>{value}</strong><span className={`change ${direction}`}>{direction === 'up' ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {change}</span></div>

    <div className="stat-caption">{caption}</div>

  </article>;

}



export default function App() {

  const [activeNav, setActiveNav] = useState('Overview');

  const [calls, setCalls] = useState(initialCalls);

  const [search, setSearch] = useState('');

  const [statusFilter, setStatusFilter] = useState('All cases');

  const [selected, setSelected] = useState(initialCalls[0]);

  const [showDetail, setShowDetail] = useState(false);

  const [showNew, setShowNew] = useState(false);

  const [mobileNav, setMobileNav] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem('theme') === 'dark'; } catch { return false; }
  });

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {}
  };

  const [toast, setToast] = useState('');

  const [newName, setNewName] = useState('');

  const [newTopic, setNewTopic] = useState('');

  const [newPhone, setNewPhone] = useState('');

  const [newPriority, setNewPriority] = useState('Normal');



  const filteredCalls = useMemo(() => calls.filter(call => {

    const matchesSearch = `${call.name} ${call.id} ${call.topic} ${call.phone}`.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All cases' || call.status === statusFilter;

    const matchesNav = activeNav !== 'Follow-ups' || call.status === 'Follow-up';

    return matchesSearch && matchesStatus && matchesNav;

  }), [calls, search, statusFilter, activeNav]);



  const notify = (message) => {

    setToast(message);

    window.setTimeout(() => setToast(''), 2600);

  };



  const updateCall = (id, patch) => {

    setCalls(prev => prev.map(c => c.id === id ? { ...c, ...patch } : c));

    setSelected(prev => prev?.id === id ? { ...prev, ...patch } : prev);

  };



  const createCase = (e) => {

    e.preventDefault();

    if (!newName.trim() || !newTopic.trim()) return;

    const initials = newName.trim().split(/\s+/).slice(0, 2).map(s => s[0]).join('').toUpperCase();

    const item = {

      id: `CC-${1049 + calls.length - initialCalls.length}`, name: newName.trim(), initials,

      email: 'customer@example.com', phone: newPhone || 'Not provided', topic: newTopic.trim(),

      time: 'Just now', duration: '—', status: 'Open', priority: newPriority, channel: 'Phone',

      color: 'blue', notes: 'New case created. Add call notes after speaking with the customer.'

    };

    setCalls(prev => [item, ...prev]);

    setSelected(item);

    setShowNew(false);

    setNewName(''); setNewTopic(''); setNewPhone(''); setNewPriority('Normal');

    setActiveNav('Calls & cases');

    notify('New case created successfully');

  };



  const pageTitle = activeNav === 'Overview' ? 'Good morning, Stuti' : activeNav;

  const pageSubtitle = activeNav === 'Overview'

    ? 'Here’s what’s happening with your support queue today.'

    : activeNav === 'Follow-ups'

      ? 'Keep track of customers who need another touchpoint.'

      : activeNav === 'Customers'

        ? 'Search and manage your customer conversations.'

        : 'Review calls, manage cases, and keep customers moving forward.';



  return <div className={`app-shell ${darkMode ? 'dark-theme' : 'light-theme'}`}>

    <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>

      <div className="brand"><div className="brand-mark"><Headphones size={21}/></div><span>call<span className="brand-accent">desk</span></span><button className="mobile-close icon-button" onClick={() => setMobileNav(false)}><X size={18}/></button></div>

      <div className="workspace-label">WORKSPACE</div>

      <nav className="main-nav">

        {navItems.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label); setMobileNav(false); setSearch(''); }}>

          <Icon size={18}/><span>{label}</span>{label === 'Follow-ups' && <span className="nav-count">{calls.filter(c => c.status === 'Follow-up').length}</span>}

        </button>)}

      </nav>

      <div className="sidebar-bottom">

        <div className="help-card"><div className="help-icon"><CircleHelp size={18}/></div><strong>Need a hand?</strong><p>Visit the help centre for tips and guides.</p><button onClick={() => notify('Help centre is a demo action')}>Open help centre <ChevronRight size={14}/></button></div>

        <button className="nav-item"><Settings size={18}/><span>Settings</span></button>

        <div className="profile"><div className="profile-avatar">SK</div><div className="profile-info"><strong>Stuti Katiyar</strong><span>Support specialist</span></div><button className="icon-button" aria-label="Profile menu" onClick={() => notify('Signed in as Stuti Katiyar')}><MoreHorizontal size={19}/></button></div>

      </div>

    </aside>



    <main className="main-area">

      <header className="topbar">

        <button className="mobile-menu icon-button" onClick={() => setMobileNav(true)}><Menu size={20}/></button>

        <div className="breadcrumb">Workspace <ChevronRight size={14}/> <strong>{activeNav}</strong></div>

        <div className="topbar-actions"><div className="availability"><span className="online-dot"/> Available <ChevronDown size={14}/></div><button className="theme-toggle icon-button" onClick={toggleTheme} aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'} title={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}>{darkMode ? <Sun size={19}/> : <Moon size={19}/>}</button><button className="notification icon-button" aria-label="Notifications" onClick={() => notify('You’re all caught up')}><Bell size={19}/><i/></button><div className="top-avatar">SK</div></div>

      </header>



      <div className="page-content">

        <section className="page-heading">

          <div><div className="eyebrow"><Sparkles size={14}/> YOUR SUPPORT DESK</div><h1>{pageTitle}{activeNav === 'Overview' && <span className="wave"> ✦</span>}</h1><p>{pageSubtitle}</p></div>

          <button className="primary-button" onClick={() => setShowNew(true)}><Plus size={17}/> Create new case</button>

        </section>



        {activeNav === 'Overview' && <>

          <section className="stats-grid">

            <StatCard title="Calls handled" value="48" change="12.8%" direction="up" icon={Phone} tone="purple" caption="vs. yesterday"/>

            <StatCard title="Avg. handle time" value="06:42" change="4.2%" direction="down" icon={Clock3} tone="orange" caption="vs. yesterday"/>

            <StatCard title="Resolution rate" value="94.6%" change="2.4%" direction="up" icon={ShieldCheck} tone="green" caption="vs. last week"/>

           <StatCard title="Customer satisfaction" value={<>4.8<span>/5</span></>} change="0.3" direction="up" icon={Activity} tone="blue" caption="from 36 responses" />

          </section>

          <section className="overview-grid">

            <article className="panel performance-panel">

              <div className="panel-heading"><div><h2>Your performance</h2><p>A snapshot of your activity this week</p></div><button className="select-button" onClick={() => notify('Showing this week’s performance')}>This week <ChevronDown size={14}/></button></div>

              <div className="performance-main"><div><strong>312</strong><span className="performance-change"><ArrowUpRight size={14}/> 8.4%</span><p>Calls handled</p></div><div className="chart-legend"><span><i className="legend-purple"/>This week</span><span><i className="legend-gray"/>Last week</span></div></div>

              <div className="chart" aria-label="Weekly calls chart">

                <div className="chart-y-labels"><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span></div>

                <div className="chart-plot"><div className="grid-line l1"/><div className="grid-line l2"/><div className="grid-line l3"/><div className="grid-line l4"/>

                  <div className="bars">{[{d:'Mon',a:48,b:35},{d:'Tue',a:64,b:45},{d:'Wed',a:53,b:40},{d:'Thu',a:74,b:51},{d:'Fri',a:60,b:47},{d:'Sat',a:38,b:28},{d:'Sun',a:27,b:22}].map(x=><div className="bar-group" key={x.d}><div className="bar-pair"><div className="bar previous" style={{height:`${x.b}%`}}/><div className="bar current" style={{height:`${x.a}%`}}/></div><span>{x.d}</span></div>)}</div>

                </div>

              </div>

            </article>

            <article className="panel queue-panel">

              <div className="panel-heading"><div><h2>My queue</h2><p>Cases that need your attention</p></div><button className="text-button" onClick={() => setActiveNav('Calls & cases')}>View all <ChevronRight size={15}/></button></div>

              <div className="queue-metrics"><div className="queue-metric"><span className="queue-dot open-dot"/><span>Open cases</span><strong>{calls.filter(c=>c.status==='Open'||c.status==='In progress').length}</strong></div><div className="queue-metric"><span className="queue-dot follow-dot"/><span>Follow-ups</span><strong>{calls.filter(c=>c.status==='Follow-up').length}</strong></div><div className="queue-metric"><span className="queue-dot done-dot"/><span>Resolved today</span><strong>{calls.filter(c=>c.status==='Resolved').length}</strong></div></div>

              <div className="queue-footer"><div className="queue-illustration"><MessageSquareText size={19}/></div><div><strong>You're making progress!</strong><p>Keep it up — you're on track for your daily goal.</p></div></div>

            </article>

          </section>

        </>}



        <section className="panel cases-panel">

          <div className="panel-heading cases-heading"><div><h2>{activeNav === 'Follow-ups' ? 'Upcoming follow-ups' : activeNav === 'Customers' ? 'Customer directory' : activeNav === 'Overview' ? 'Recent calls & cases' : 'All calls & cases'}</h2><p>{activeNav === 'Overview' ? 'Stay on top of your latest conversations' : 'Search, filter and open a case to see its details'}</p></div><button className="text-button" onClick={() => { setActiveNav('Calls & cases'); setStatusFilter('All cases'); }}>View all cases <ChevronRight size={15}/></button></div>

          <div className="table-controls"><div className="search-box"><Search size={17}/><input aria-label="Search cases" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by customer, case ID..." /></div><div className="filter-wrap"><SlidersHorizontal size={16}/><select aria-label="Filter by status" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option>All cases</option><option>Open</option><option>In progress</option><option>Follow-up</option><option>Resolved</option></select></div></div>

          <div className="table-scroll"><table><thead><tr><th>Customer</th><th>Case details</th><th>Time</th><th>Priority</th><th>Status</th><th></th></tr></thead><tbody>

            {filteredCalls.slice(0, activeNav === 'Overview' ? 5 : 20).map(call=><tr key={call.id} onClick={()=>{setSelected(call);setShowDetail(true);}} className="case-row"><td><div className="customer-cell"><Avatar call={call} small/><div><strong>{call.name}</strong><span>{call.id}</span></div></div></td><td><div className="case-topic"><strong>{call.topic}</strong><span>{call.channel} · {call.duration}</span></div></td><td className="time-cell">{call.time}</td><td><span className={`priority priority-${call.priority.toLowerCase()}`}><i/>{call.priority}</span></td><td><Status status={call.status}/></td><td><button className="row-more icon-button" aria-label={`Open ${call.id}`} onClick={e=>{e.stopPropagation();setSelected(call);setShowDetail(true);}}><ChevronRight size={17}/></button></td></tr>)}

            {filteredCalls.length===0 && <tr><td colSpan="6"><div className="empty-state"><Search size={22}/><strong>No cases found</strong><span>Try another search or change the status filter.</span></div></td></tr>}

          </tbody></table></div>

          <div className="table-footer"><span>Showing <strong>{Math.min(filteredCalls.length, activeNav === 'Overview' ? 5 : 20)}</strong> of <strong>{filteredCalls.length}</strong> cases</span><div><button className="pagination-button" disabled>Previous</button><button className="pagination-button" disabled>Next</button></div></div>

        </section>

        <footer className="page-footer"><span>© 2026 CallDesk</span><span><span className="online-dot"/> All systems operational</span><span>Made for better conversations <span className="footer-heart">♥</span></span></footer>

      </div>

    </main>



    {mobileNav && <button className="scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)}/>}

    {showDetail && selected && <div className="drawer-backdrop" onClick={() => setShowDetail(false)}><aside className="detail-drawer" onClick={e=>e.stopPropagation()}>

      <div className="drawer-header"><div><span className="eyebrow">CASE DETAILS</span><h2>{selected.id}</h2></div><button className="icon-button" onClick={()=>setShowDetail(false)}><X size={20}/></button></div>

      <div className="drawer-customer"><Avatar call={selected}/><div><h3>{selected.name}</h3><p>{selected.email}</p><p>{selected.phone}</p></div></div>

      <div className="drawer-section"><label>Issue</label><h3>{selected.topic}</h3><div className="drawer-tags"><Status status={selected.status}/><span className={`priority priority-${selected.priority.toLowerCase()}`}><i/>{selected.priority} priority</span></div></div>

      <div className="drawer-section"><label>Call notes</label><textarea key={selected.id} defaultValue={selected.notes} id="call-notes" rows="5" placeholder="Add notes from your conversation..."/></div>

      <div className="drawer-section"><label>Update status</label><select className="drawer-select" value={selected.status} onChange={e=>{updateCall(selected.id,{status:e.target.value});notify('Case status updated');}}><option>Open</option><option>In progress</option><option>Follow-up</option><option>Resolved</option></select></div>

      <div className="drawer-section"><label>Priority</label><select className="drawer-select" value={selected.priority} onChange={e=>updateCall(selected.id,{priority:e.target.value})}><option>Low</option><option>Normal</option><option>High</option></select></div>

      <div className="drawer-actions"><button className="secondary-button" onClick={()=>setShowDetail(false)}>Close</button><button className="primary-button" onClick={()=>{const notes=document.getElementById('call-notes')?.value ?? selected.notes;updateCall(selected.id,{notes});setShowDetail(false);notify('Call notes saved');}}><Check size={16}/> Save changes</button></div>

    </aside></div>}



    {showNew && <div className="modal-backdrop" onClick={()=>setShowNew(false)}><section className="new-case-modal" onClick={e=>e.stopPropagation()}><div className="modal-heading"><div><span className="eyebrow">NEW CUSTOMER ISSUE</span><h2>Create a case</h2><p>Capture the details so you can follow up with the customer.</p></div><button className="icon-button" onClick={()=>setShowNew(false)}><X size={20}/></button></div><form onSubmit={createCase}><label>Customer name<input required value={newName} onChange={e=>setNewName(e.target.value)} placeholder="e.g. Riya Kapoor"/></label><label>Issue / reason for contact<input required value={newTopic} onChange={e=>setNewTopic(e.target.value)} placeholder="e.g. Payment query"/></label><label>Phone number<input value={newPhone} onChange={e=>setNewPhone(e.target.value)} placeholder="+91 98765 43210"/></label><label>Priority<select value={newPriority} onChange={e=>setNewPriority(e.target.value)}><option>Low</option><option>Normal</option><option>High</option></select></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={()=>setShowNew(false)}>Cancel</button><button type="submit" className="primary-button"><Plus size={16}/> Create case</button></div></form></section></div>}

    {toast && <div className="toast"><span className="toast-check"><Check size={15}/></span>{toast}</div>}

  </div>;

}