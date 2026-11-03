
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import HomePage from './pages/public/HomePage'
import Programs from './pages/public/Programs'
import About from './pages/public/About'
import Contact from './pages/public/Contact'
import PortalLogin from './pages/public/PortalLogin'

import AdminDashboard from './pages/admin/AdminDashboard'

import StudentDashboard from './pages/student/StudentDashboard'

import TeacherDashboard from './pages/teacher/TeacherDashboard'


function ComingSoon({ title }) {
  return (
    <main
      className="container"
      style={{ padding: '80px 24px' }}
    >
      <p style={{ color: 'var(--text-secondary)' }}>
        NexLearn
      </p>

      <h1>{title}</h1>

      <p style={{ color: 'var(--text-secondary)' }}>
        This page is under development.
      </p>
    </main>
  )
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/programs"
          element={<Programs />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Common Portal Login */}

        <Route
          path="/login"
          element={<PortalLogin />}
        />

        {/* Admin Portal */}

        <Route
          path="/admin/*"
          element={<AdminDashboard />}
        />

        {/* Teacher Portal */}

        <Route
          path="/teacher/*"
          element={<TeacherDashboard />}
        />

        {/* Student Portal */}

        <Route
          path="/student/*"
          element={<StudentDashboard />}
        />
        {/* Forgot Password */}

        <Route
          path="/forgot-password"
          element={
            <ComingSoon title="Forgot Password" />
          }
        />

        {/* Fallback Route */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
