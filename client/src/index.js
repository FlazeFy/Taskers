import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Navbar from './components/navbar/Navbar';
import Tasks_Index from './components/tasks/Index';
import Calendar_Index from './components/calendar/Index';
import Teams_Index from './components/teams/Index';
import Archive_Index from './components/archive/Index';
import './App.css';

export default function App() {
  return (
    <div className='container d-block mx-auto'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="tasks" element={<Tasks_Index />} />
            <Route path="calendar" element={<Calendar_Index />} />
            <Route path="teams" element={<Teams_Index />}  />
            <Route path="archive" element={<Archive_Index />}  />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
