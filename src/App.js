import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard'
import UpdateProfile from './pages/UpdateProfile/UpdateProfile';
import ChangePassword from './pages/UpdateProfile/ChangePassword';
import RoleRoute from './components/RoleRoute';
import AddCourse from './pages/Course/AddCourse';
import ManageCourse from './pages/Course/ManageCourse'
import AddSubject from './pages/Subject/AddSubject';
import ManageSubject from './pages/Subject/ManageSubject';
import EditCourse from './pages/Course/EditCourse';
import EditSubject from './pages/Subject/EditSubject';
import AddStaff from './pages/Staff/AddStaff';
import ManageStaff from './pages/Staff/ManageStaff';
import EditStaff from './pages/Staff/EditStaff';
import AddStudent from './pages/Student/AddStudent';
import ManageStudent from './pages/Student/ManageStudent';
import EditStudent from './pages/Student/EditStudent';
import NotifyStudent from './pages/Student/NotifyStudent';
import ViewNotifications from './pages/ViewNotifications/ViewNotifications';
import AddSession from './pages/Session/AddSession';
import ManageSession from './pages/Session/ManageSession';
import EditSession from './pages/Session/EditSession';
import LayoutComponent from './components/LayoutComponent';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import useAuth from './hooks/useAuth';
import PrivateRoutes from './components/PrivateRoutes';
import Loading from './components/Loading';
import NotifyStaff from './pages/Staff/NotifyStaff';
import Feedback from './pages/Feedback/Feedback';
import ApplyLeave from './pages/ApplyLeave/ApplyLeave';
import TakeAttendance from './pages/Attendance/TakeAttendance';
import UpdateAttendance from './pages/Attendance/UpdateAttendance';
import AddResult from './pages/Result/AddResult';
import EditResult from './pages/Result/EditResult';
import ViewAttendance from './pages/Attendance/ViewAttendance';
import ViewAttendanceAdmin from './pages/Attendance/ViewAttendanceAdmin';
import ViewFeedback from './pages/Feedback/ViewFeedback';
import ViewFeedbackStaff from './pages/Feedback/ViewFeedbackStaff';
import ViewLeaveStaff from './pages/ApplyLeave/ViewLeaveStaff';
import ViewLeaveStudent from './pages/ApplyLeave/ViewLeaveStudent';
export const URLi = 'http://localhost:5000'
function App() {
  const { auth, userInfo } = useAuth()
  return (
    <>
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            fontSize: '1.5rem'
          }
        }}
      ></Toaster>
      <Routes>

        <Route path='/register' element={auth ? <Navigate to='/' /> : auth === undefined ? <Loading /> : <Register />} />
        <Route path='/login' element={auth ? <Navigate to='/' /> : auth === undefined ? <Loading /> : <Login />} />
        <Route element={<LayoutComponent />}>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<RoleRoute roles={['Admin', 'Staff', 'Student']} role={userInfo?.role}><Dashboard /></RoleRoute>} />
            <Route path='/update_profile/update_basic_info' element={<RoleRoute roles={['Admin', 'Staff', 'Student']} role={userInfo?.role}><UpdateProfile /></RoleRoute>} />
            <Route path='/update_profile/change_password' element={<RoleRoute roles={['Admin', 'Staff', 'Student']} role={userInfo?.role}><ChangePassword /></RoleRoute>} />
            <Route path='/course/add' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><AddCourse /></RoleRoute>} />
            <Route path='/course/manage' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><ManageCourse /></RoleRoute>} />
            <Route path='/course/manage/edit_course/:uuid' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><EditCourse /></RoleRoute>} />
            <Route path='/subject/add' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><AddSubject /></RoleRoute>} />
            <Route path='/subject/manage' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><ManageSubject /></RoleRoute>} />
            <Route path='/subject/manage/edit_subject/:uuid' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><EditSubject /></RoleRoute>} />
            <Route path='/staff/add' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><AddStaff /></RoleRoute>} />
            <Route path='/staff/manage' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><ManageStaff /></RoleRoute>} />
            <Route path='/staff/manage/edit_staff/:uuid' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><EditStaff /></RoleRoute>} />
            <Route path='/staff/notify' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><NotifyStaff /></RoleRoute>} />
            <Route path='/student/add' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><AddStudent /></RoleRoute>} />
            <Route path='/student/manage' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><ManageStudent /></RoleRoute>} />
            <Route path='/student/manage/edit_student/:uuid' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><EditStudent /></RoleRoute>} />
            <Route path='/student/notify' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><NotifyStudent /></RoleRoute>} />
            <Route path='/session/add' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><AddSession /></RoleRoute>} />
            <Route path='/session/manage' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><ManageSession /></RoleRoute>} />
            <Route path='/session/manage/edit_session/:uuid' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><EditSession /></RoleRoute>} />
            <Route path='/view/notifications' element={<RoleRoute roles={['Student', 'Staff']} role={userInfo?.role}><ViewNotifications /></RoleRoute>} />
            <Route path='/apply/leave' element={<RoleRoute roles={['Student', 'Staff']} role={userInfo?.role}><ApplyLeave /></RoleRoute>} />
            <Route path='/feedback' element={<RoleRoute roles={['Student', 'Staff']} role={userInfo?.role}><Feedback /></RoleRoute>} />
            <Route path='/take/attendance' element={<RoleRoute roles={['Staff']} role={userInfo?.role}><TakeAttendance /></RoleRoute>} />
            <Route path='/update/attendance' element={<RoleRoute roles={['Staff']} role={userInfo?.role}><UpdateAttendance /></RoleRoute>} />
            <Route path='/add/result' element={<RoleRoute roles={['Staff']} role={userInfo?.role}><AddResult /></RoleRoute>} />
            <Route path='/edit/result' element={<RoleRoute roles={['Staff']} role={userInfo?.role}><EditResult /></RoleRoute>} />
            <Route path='/view/attendance' element={<RoleRoute roles={['Student']} role={userInfo?.role}><ViewAttendance /></RoleRoute>} />
            <Route path='/admin/view/attendance' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><ViewAttendanceAdmin /></RoleRoute>} />
            <Route path='/student/feedback' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><ViewFeedback /></RoleRoute>} />
            <Route path='/staff/feedback' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><ViewFeedbackStaff /></RoleRoute>} />
            <Route path='/staff/leave' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><ViewLeaveStaff /></RoleRoute>} />
            <Route path='/student/leave' element={<RoleRoute roles={['Admin']} role={userInfo?.role}><ViewLeaveStudent /></RoleRoute>} />
          </Route>
        </Route>
        <Route path='*' element={<ErrorPage />} />

        {/* <Route path='/' element={userInfo?.role === '2' ? <UpdateUser setForceRender={setForceRender} /> : <MainPage forceRender={forceRender} />} /> */}

      </Routes>
    </>
  );
}

export default App;
