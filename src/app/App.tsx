import React, { useState } from 'react';
import { LandingPage } from './components/worker/LandingPage';
import { JobListings } from './components/worker/JobListings';
import { WorkerDashboard } from './components/worker/WorkerDashboard';
import { JobDetail } from './components/worker/JobDetail';
import { CompanyDetail } from './components/worker/CompanyDetail';
import { UtilitiesGuide } from './components/worker/UtilitiesGuide';
import { EmployerDashboard } from './components/employer/EmployerDashboard';
import { JobDetailManagement } from './components/employer/JobDetailManagement';
import { CandidateSelection } from './components/employer/CandidateSelection';
import { PricingPage } from './components/employer/PricingPage';
import { LoginPage } from './components/auth/LoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminBusinesses from './components/admin/AdminBusinesses';
import AdminRevenue from './components/admin/AdminRevenue';

type Screen = 'landing' | 'jobs' | 'dashboard' | 'job-detail' | 'company-detail' | 'utilities' | 'employer' | 'employer-job-detail' | 'candidate-selection' | 'pricing' | 'login' | 'admin-dashboard' | 'admin-businesses' | 'admin-revenue' | 'admin-login';
type UserRole = 'worker' | 'employer' | 'admin' | null;

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('landing');
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>('');
  const [selectedEmployerJobId, setSelectedEmployerJobId] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [defaultLoginRole, setDefaultLoginRole] = useState<'worker' | 'employer'>('worker');
  const [workerDashboardView, setWorkerDashboardView] = useState<'dashboard' | 'training' | 'withdraw' | 'protection' | 'community'>('dashboard');
  const [workerReturnScreen, setWorkerReturnScreen] = useState<'landing' | 'dashboard'>('dashboard');

  const handleLogin = (role: 'worker' | 'employer' | 'admin') => {
    setIsAuthenticated(true);
    setUserRole(role);
    if (role === 'worker') {
      setActiveScreen('landing');
    } else if (role === 'admin') {
      setActiveScreen('admin-dashboard');
    } else {
      setActiveScreen('employer');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setDefaultLoginRole('worker');
    setActiveScreen('landing');
  };

  const handleAdminNavigate = (page: 'businesses' | 'revenue' | 'dashboard') => {
    switch (page) {
      case 'dashboard':
        setActiveScreen('admin-dashboard');
        break;
      case 'businesses':
        setActiveScreen('admin-businesses');
        break;
      case 'revenue':
        setActiveScreen('admin-revenue');
        break;
    }
  };

  const handleNavigateToLogin = (role: 'worker' | 'employer' = 'worker') => {
    setDefaultLoginRole(role);
    setActiveScreen('login');
  };

  const handleViewJobs = (searchQuery?: string) => {
    setActiveScreen('jobs');
  };

  const handleViewJobDetail = (jobId: number) => {
    setSelectedJobId(jobId);
    setActiveScreen('job-detail');
  };

  const handleViewCompany = (companyName: string) => {
    setSelectedCompanyName(companyName);
    setActiveScreen('company-detail');
  };

  const handleViewCandidates = (jobId: number) => {
    setSelectedEmployerJobId(jobId);
    setActiveScreen('candidate-selection');
  };

  const handleViewJobStatus = (jobId: number) => {
    setSelectedEmployerJobId(jobId);
    setActiveScreen('employer-job-detail');
  };

  const renderScreen = () => {
    if (activeScreen === 'login') {
      return <LoginPage onLogin={handleLogin} defaultRole={defaultLoginRole} />;
    }

    switch (activeScreen) {
      case 'landing':
        return <LandingPage onViewJobs={handleViewJobs} onNavigate={setActiveScreen} onLogout={handleLogout} onViewJobDetail={handleViewJobDetail} onNavigateToLogin={handleNavigateToLogin} onSetWorkerView={(view) => { setWorkerDashboardView(view); setWorkerReturnScreen('landing'); }} isAuthenticated={isAuthenticated} onViewCompany={handleViewCompany} />;
      case 'jobs':
        return <JobListings onViewJobDetail={handleViewJobDetail} onNavigate={setActiveScreen} onLogout={handleLogout} onSetWorkerView={(view) => { setWorkerDashboardView(view); setWorkerReturnScreen('landing'); }} isAuthenticated={isAuthenticated} onNavigateToLogin={handleNavigateToLogin} onViewCompany={handleViewCompany} />;
      case 'dashboard':
        return <WorkerDashboard onNavigate={setActiveScreen} onLogout={handleLogout} initialView={workerDashboardView} returnScreen={workerReturnScreen} />;
      case 'job-detail':
        return <JobDetail jobId={selectedJobId} onBack={() => setActiveScreen('jobs')} onNavigate={setActiveScreen} onLogout={handleLogout} onSetWorkerView={setWorkerDashboardView} isAuthenticated={isAuthenticated} onNavigateToLogin={handleNavigateToLogin} onViewCompany={handleViewCompany} />;
      case 'company-detail':
        return <CompanyDetail companyName={selectedCompanyName} onBack={() => setActiveScreen('jobs')} onViewJobDetail={handleViewJobDetail} onNavigate={setActiveScreen} onLogout={handleLogout} onSetWorkerView={setWorkerDashboardView} isAuthenticated={isAuthenticated} onNavigateToLogin={handleNavigateToLogin} />;
      case 'utilities':
        return <UtilitiesGuide onBack={() => setActiveScreen('landing')} onNavigate={setActiveScreen} onLogout={handleLogout} onSetWorkerView={setWorkerDashboardView} />;
      case 'employer':
        return <EmployerDashboard onNavigate={setActiveScreen} onViewJobDetail={handleViewCandidates} onViewJobStatus={handleViewJobStatus} onLogout={handleLogout} />;
      case 'pricing':
        return <PricingPage onNavigate={setActiveScreen} onLogout={handleLogout} currentPlan="pro" userRole={userRole || 'employer'} />;
      case 'employer-job-detail':
        return <JobDetailManagement jobId={selectedEmployerJobId || 1} onBack={() => setActiveScreen('employer')} onNavigate={setActiveScreen} onLogout={handleLogout} />;
      case 'candidate-selection':
        return <CandidateSelection jobId={selectedEmployerJobId || 1} onBack={() => setActiveScreen('employer')} onNavigate={setActiveScreen} onLogout={handleLogout} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleAdminNavigate} onLogout={handleLogout} />;
      case 'admin-businesses':
        return <AdminBusinesses onNavigate={handleAdminNavigate} onLogout={handleLogout} />;
      case 'admin-revenue':
        return <AdminRevenue onNavigate={handleAdminNavigate} onLogout={handleLogout} />;
      default:
        return <LandingPage onViewJobs={handleViewJobs} onNavigate={setActiveScreen} onLogout={handleLogout} onViewJobDetail={handleViewJobDetail} onNavigateToLogin={handleNavigateToLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderScreen()}
    </div>
  );
}
