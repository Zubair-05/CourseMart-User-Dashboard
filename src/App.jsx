import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Courses from './components/Courses';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PurchasedCourses from './components/PurchasedCourses';
import CourseDetails from './components/CourseDetails';
import LandingPage from './components/LandingPage';
import UpdateProfile from './components/UpdateProfile';
import Profile from './components/Profile';
import Cart from './components/Cart';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        {/* <Route path="/purchase/:id" element={<PurchaseCourse />} /> */}
        <Route path="/purchased" element={<PurchasedCourses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
      </Routes>
      <Footer />
    </Router>
  )
}