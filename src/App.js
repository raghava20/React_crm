import './App.css';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar';
import DashBoard from './components/DashBoard';
import React, { useState } from "react";
import Leads from './components/Leads';
import ServiceRequest from './components/ServiceRequest';

export const LeadContext = React.createContext("");

function App() {


  // const API_URL = fetch("https://node-plus-react-crm-app.herokuapp.com/leads").then(data => data.json()).then(data => console.log(data))
  // const [hide, setHide] = useState(true)
  const API_URL = [
    {
      "_id": "61aec72fb1c4fa3a0db0cde2",
      "name": "Marvin Tillman V",
      "email": "Reanna.Dooley39@hotmail.com",
      "contact": "1-562-646-5217 x7464",
      "company": "O'Keefe, Crona and Abbott",
      "id": "1"
    },
    {
      "_id": "61aec72fb1c4fa3a0db0cde3",
      "name": "Mindy Hermiston",
      "email": "Kirstin_Swift61@yahoo.com",
      "contact": "513-835-4957",
      "company": "Boyle, O'Reilly and Orn",
      "id": "2"
    },
    {
      "_id": "61aec72fb1c4fa3a0db0cde4",
      "name": "Rodolfo Cummerata",
      "email": "Clinton_Jast@hotmail.com",
      "contact": "1-239-504-8164 x77587",
      "company": "Brakus, Emard and Kilback",
      "id": "3"
    },
    {
      "_id": "61aec72fb1c4fa3a0db0cde5",
      "name": "Angelo Denesik",
      "email": "Therese50@hotmail.com",
      "contact": "413-512-0629",
      "company": "Kilback Inc",
      "id": "4"
    },
    {
      "_id": "61aec72fb1c4fa3a0db0cde6",
      "name": "Lula Dare",
      "email": "Genesis_Swift@hotmail.com",
      "contact": "(723) 445-2359 x018",
      "company": "DuBuque - Cummerata",
      "id": "5"
    },
    {
      "_id": "61aec72fb1c4fa3a0db0cde7",
      "name": "Kerry Ferry",
      "email": "Nicklaus18@hotmail.com",
      "contact": "501-402-2272 x71082",
      "company": "Braun - Reinger",
      "id": "6"
    },
    {
      "_id": "61aec72fb1c4fa3a0db0cde8",
      "name": "Lila Kris",
      "email": "Sigrid4@hotmail.com",
      "contact": "556.297.8601 x03103",
      "company": "Mraz LLC",
      "id": "7"
    },
    {
      "_id": "61aec72fb1c4fa3a0db0cde9",
      "name": "Ronald Schumm",
      "email": "Dillon59@gmail.com",
      "contact": "1-396-504-3783",
      "company": "Hoppe - Pollich",
      "id": "8"
    },
    {
      "_id": "61aec72fb1c4fa3a0db0cdea",
      "name": "Phyllis Osinski",
      "email": "Sterling_Parker9@hotmail.com",
      "contact": "857-595-1216 x54759",
      "company": "Klein - Kertzmann",
      "id": "9"
    },
    {
      "_id": "61aec72fb1c4fa3a0db0cdeb",
      "name": "Grant Schuster",
      "email": "Braxton1@gmail.com",
      "contact": "1-868-385-2214",
      "company": "Lueilwitz Inc",
      "id": "10"
    }
  ]
  let [data, setData] = useState(API_URL)

  return (
    <Router>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <LeadContext.Provider value={{ data, setData }} >
        <div style={{ display: "grid", gridTemplateColumns: "16% 84%" }}>
          <div>
            <Routes>
              <Route element={<SideBar />} />
            </Routes>
          </div>
          <div>
            <Routes>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/view-only" element={<DashBoard />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/service-requests" element={<ServiceRequest />} />
            </Routes>
          </div>
        </div>
      </LeadContext.Provider>

    </Router>
  );
}

export default App;
