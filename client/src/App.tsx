import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingForm from "./pages/BookingForm";
import BookingList from "./pages/BookingList";

function App() {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/list" element={<BookingList />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
