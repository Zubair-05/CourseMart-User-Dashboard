import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Courses from './components/Courses';
import Navbar from './utils/Navbar';
import Footer from './utils/Footer';
import PurchasedCourses from './components/PurchasedCourses';
import CourseDetails from './components/CourseDetails';
import LandingPage from './components/LandingPage';
import UpdateProfile from './components/UpdateProfile';
import Profile from './components/Profile';
import Cart from './components/Cart';
import Init from './utils/Init';
import InitCart from './utils/InitCart';
import InitPurchased from './utils/InitPurchased';

export default function App() {
  return (
    <Router>
      <Init />
      <InitCart />
      <InitPurchased />
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