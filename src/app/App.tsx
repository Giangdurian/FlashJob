import React, { useState } from 'react';
import { LandingPage } from './components/worker/LandingPage';
import { JobListings } from './components/worker/JobListings';
import { WorkerDashboard } from './components/worker/WorkerDashboard';
import { JobDetail } from './components/worker/JobDetail';
import { UtilitiesGuide } from './components/worker/UtilitiesGuide';
import { EmployerDashboard } from './components/employer/EmployerDashboard';
import { JobDetailManagement } from './components/employer/JobDetailManagement';
import { CandidateSelection } from './components/employer/CandidateSelection';
import { LoginPage } from './components/auth/LoginPage';

type Screen = 'landing' | 'jobs' | 'dashboard' | 'job-detail' | 'utilities' | 'employer' | 'employer-job-detail' | 'candidate-selection' | 'login';
type UserRole = 'worker' | 'employer' | null;

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('landing');
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [selectedEmployerJobId, setSelectedEmployerJobId] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [defaultLoginRole, setDefaultLoginRole] = useState<'worker' | 'employer'>('worker');

  const handleLogin = (role: 'worker' | 'employer') => {
    setIsAuthenticated(true);
    setUserRole(role);
    if (role === 'worker') {
      setActiveScreen('landing');
    } else {
      setActiveScreen('employer');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setDefaultLoginRole('worker');
    setActiveScreen('login');
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
        return <LandingPage onViewJobs={handleViewJobs} onNavigate={setActiveScreen} onLogout={handleLogout} onViewJobDetail={handleViewJobDetail} onNavigateToLogin={handleNavigateToLogin} />;
      case 'jobs':
        return <JobListings onViewJobDetail={handleViewJobDetail} onNavigate={setActiveScreen} onLogout={handleLogout} />;
      case 'dashboard':
        return <WorkerDashboard onNavigate={setActiveScreen} onLogout={handleLogout} />;
      case 'job-detail':
        return <JobDetail jobId={selectedJobId} onBack={() => setActiveScreen('jobs')} onNavigate={setActiveScreen} onLogout={handleLogout} />;
      case 'utilities':
        return <UtilitiesGuide onBack={() => setActiveScreen('landing')} onNavigate={setActiveScreen} onLogout={handleLogout} />;
      case 'employer':
        return <EmployerDashboard onNavigate={setActiveScreen} onViewJobDetail={handleViewCandidates} onViewJobStatus={handleViewJobStatus} onLogout={handleLogout} />;
      case 'employer-job-detail':
        return <JobDetailManagement jobId={selectedEmployerJobId || 1} onBack={() => setActiveScreen('employer')} onNavigate={setActiveScreen} onLogout={handleLogout} />;
      case 'candidate-selection':
        return <CandidateSelection jobId={selectedEmployerJobId || 1} onBack={() => setActiveScreen('employer')} onNavigate={setActiveScreen} onLogout={handleLogout} />;
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
