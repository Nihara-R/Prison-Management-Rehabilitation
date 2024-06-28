import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import MainDashboard from './components/MainDashboard';
import RehabilitationDashboard from './Rehabilitation and Education/RehabilitationDashboard';
import AllEducations from './Rehabilitation and Education/education/AllEducations';
import AllEvents from './Rehabilitation and Education/events/AllEvents';
import AllTrainings from './Rehabilitation and Education/vocationalTraining/AllTrainings';
import AllReintegrations from './Rehabilitation and Education/Reintegration/AllReintegrations';
import UpcommingEvents from './Rehabilitation and Education/events/UpcommingEvents';
import PastEvents from './Rehabilitation and Education/events/PastEvents';
import EducationHome from './Rehabilitation and Education/education/EducationHome';
import YouthEducation from './Rehabilitation and Education/education/YouthEducation';
import AdultEducation from './Rehabilitation and Education/education/AdultEducation';
import DigitalEducation from './Rehabilitation and Education/education/DigitalEducation';



function App() {
  return (
    <div className="App">
      <Router>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<MainDashboard />} />

          {/* Rehabilitation and Education Management */}
          <Route path="/rehabilitationDashboard" element={<RehabilitationDashboard />} />
          <Route path="/allEducation" element={<AllEducations />} />
          <Route path="/educationHome" element={<EducationHome />} />
          <Route path="/allEvents" element={<AllEvents />} />
          <Route path="/allTrainings" element={<AllTrainings />} />
          <Route path="/allReintegrations" element={<AllReintegrations />} />
          <Route path="/upcommongEvents" element={<UpcommingEvents />} />
          <Route path="/pastEvents" element={<PastEvents />} />
          <Route path="/youthEducation" element={<YouthEducation />} />
          <Route path="/adultEducation" element={<AdultEducation />} />
          <Route path="/digitalEducation" element={<DigitalEducation />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
