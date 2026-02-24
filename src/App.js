import React, { useState, useEffect } from 'react';
import { 
  FiUsers, FiUserCheck, FiUserX, FiMenu, FiX, FiHome, FiClock, 
  FiDollarSign, FiSettings, FiBell, FiUser, FiSearch, FiChevronLeft, 
  FiChevronRight, FiSun, FiMoon
} from 'react-icons/fi';
import './App.css';
import { useDarkMode } from './hooks/useDarkMode';

// ========== DATA ==========
const statsData = {
  totalEmployees: 156,
  presentToday: 142,
  onLeave: 14
};

const employeesData = [
  { id: "SJCET081", name: "Dr. Anitha Thomas", department: "Computer Science", designation: "HOD", status: "Active" },
  { id: "SJCET082", name: "Prof. Rajesh Kumar", department: "Mechanical", designation: "Associate Professor", status: "Active" },
  { id: "SJCET083", name: "Dr. Meera Nair", department: "Electronics", designation: "Professor", status: "On Leave" },
  { id: "SJCET084", name: "Prof. Sanjay Pillai", department: "Civil", designation: "Assistant Professor", status: "Active" },
  { id: "SJCET085", name: "Dr. Lakshmi Menon", department: "Computer Science", designation: "Professor", status: "Active" },
  { id: "SJCET086", name: "Prof. Arun George", department: "Electrical", designation: "Associate Professor", status: "On Leave" },
  { id: "SJCET087", name: "Dr. Priya", department: "Mathematics", designation: "HOD", status: "Active" },
  { id: "SJCET088", name: "Prof. Suresh Nair", department: "Physics", designation: "Professor", status: "Active" },
  { id: "SJCET089", name: "Dr. Maya Krishnan", department: "Chemistry", designation: "Associate Professor", status: "Active" },
  { id: "SJCET090", name: "Prof. Biju Thomas", department: "Civil", designation: "Professor", status: "On Leave" },
  { id: "SJCET091", name: "Dr. Shanti Varma", department: "Computer Science", designation: "Professor", status: "Active" },
  { id: "SJCET092", name: "Prof. Manoj Joseph", department: "Mechanical", designation: "Assistant Professor", status: "Active" },
  { id: "SJCET093", name: "Dr. Usha Nair", department: "Electronics", designation: "HOD", status: "Active" },
  { id: "SJCET094", name: "Prof. George Mathew", department: "Electrical", designation: "Associate Professor", status: "On Leave" },
  { id: "SJCET095", name: "Dr. Rema Devi", department: "Mathematics", designation: "Professor", status: "Active" }
];

// ========== ANIMATED COMPONENT ==========
const AnimatedSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
};

// ========== SIDEBAR COMPONENT ==========
const Sidebar = ({ isOpen, toggleSidebar, activePage, setActivePage }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <FiHome /> },
    { name: 'Employees', icon: <FiUsers /> },
    { name: 'Attendance', icon: <FiClock /> },
    { name: 'Payroll', icon: <FiDollarSign /> },
    { name: 'Settings', icon: <FiSettings /> }
  ];

  return (
    <>
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="logo-text">HRMS</h2>
          <p className="college-name">St. Joseph's College of Engineering & Technology</p>
          <p className="college-place">Palai, Kottayam</p>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`nav-item ${activePage === item.name ? 'active' : ''}`}
              onClick={() => {
                setActivePage(item.name);
                if (window.innerWidth <= 768) toggleSidebar();
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <FiUser />
            </div>
            <div className="user-details">
              <p className="user-name">Admin User</p>
              <p className="user-role">HR Administrator</p>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

// ========== HEADER COMPONENT ==========
// FIXED: Added darkMode and setDarkMode as props
const Header = ({ title, darkMode, setDarkMode }) => {
  return (
    <header className="header">
      <h1 className="page-title">{title}</h1>
      
      <div className="header-right">
        {/* Theme toggle button - now using props */}
        <button 
          className="theme-toggle" 
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle theme"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

        <div className="notification-icon">
          <FiBell />
          <span className="notification-badge">3</span>
        </div>
        <div className="profile-icon">
          <FiUser />
        </div>
      </div>
    </header>
  );
};

// ========== STATS CARD COMPONENT ==========
const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="stats-card" style={{ borderLeftColor: color }}>
      <div className="stats-content">
        <h3 className="stats-title">{title}</h3>
        <p className="stats-value">{value}</p>
      </div>
      <div className="stats-icon-wrapper">
        <div className="stats-icon" style={{ backgroundColor: color + '15', color: color }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// ========== SEARCH BAR COMPONENT ==========
const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="search-bar">
      <FiSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search employees..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

// ========== EMPLOYEE TABLE COMPONENT ==========
const EmployeeTable = ({ employees }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 8;

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  return (
    <div className="employee-table-container">
      <div className="table-header">
        <div>
          <h2>Employee Records</h2>
          <p className="employee-count">{filteredEmployees.length} total employees</p>
        </div>
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      </div>

      <div className="table-responsive">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>EMPLOYEE</th>
              <th>DEPARTMENT</th>
              <th>DESIGNATION</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((emp) => (
              <tr key={emp.id}>
                <td><span className="employee-id">{emp.id}</span></td>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>
                  <span className={`status-badge ${emp.status === 'Active' ? 'active' : 'on-leave'}`}>
                    {emp.status === 'Active' ? '● Active' : 'On Leave'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEmployees.length > 0 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            <FiChevronLeft />
          </button>
          
          <span className="page-info">Page {currentPage} of {totalPages}</span>
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

// ========== COMING SOON COMPONENT ==========
const ComingSoon = ({ moduleName }) => {
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-card">
        <h2>{moduleName} Module</h2>
        <p className="coming-soon-text">Coming Soon</p>
        <p className="coming-soon-description">
          This module is currently under development.
        </p>
      </div>
    </div>
  );
};

// ========== DASHBOARD PAGE ==========
const DashboardPage = () => {
  const statsCards = [
    { title: 'Total Employees', value: statsData.totalEmployees, icon: <FiUsers />, color: '#4361ee' },
    { title: 'Present Today', value: statsData.presentToday, icon: <FiUserCheck />, color: '#06d6a0' },
    { title: 'On Leave', value: statsData.onLeave, icon: <FiUserX />, color: '#fb8500' }
  ];

  return (
    <>
      <div className="stats-container">
        {statsCards.map((card, index) => (
          <AnimatedSection key={index} delay={index * 100}>
            <StatsCard {...card} />
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={300}>
        <div className="table-section">
          <EmployeeTable employees={employeesData.slice(0, 8)} />
        </div>
      </AnimatedSection>
    </>
  );
};

// ========== EMPLOYEES PAGE ==========
const EmployeesPage = () => {
  return (
    <AnimatedSection>
      <EmployeeTable employees={employeesData} />
    </AnimatedSection>
  );
};

// ========== PAGE COMPONENTS ==========
const AttendancePage = () => <ComingSoon moduleName="Attendance" />;
const PayrollPage = () => <ComingSoon moduleName="Payroll" />;
const SettingsPage = () => <ComingSoon moduleName="Settings" />;

// ========== MAIN APP COMPONENT ==========
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useDarkMode(); // Hook is called here

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch(activePage) {
      case 'Employees':
        return <EmployeesPage />;
      case 'Attendance':
        return <AttendancePage />;
      case 'Payroll':
        return <PayrollPage />;
      case 'Settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p className="loader-text">Loading HRMS Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="main-content">
        {/* FIXED: Passing darkMode and setDarkMode as props to Header */}
        <Header title={activePage} darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;