import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../css/index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import AddFilm from "./pages/AddFilm/AddFilm.jsx";
import FilmList from "./pages/FilmList/FilmList.jsx";
import FilmDetails from "./pages/FilmDetails/FilmDetails.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter basename="/cinephile-dashboard">
          <Routes>
              <Route path="/" element={<App />} >
                  <Route index element={<Dashboard />} />
                  <Route path="add" element={<AddFilm />} />
                  <Route path="filmlist" element={<FilmList />} />
                  <Route path="films/:id" element={<FilmDetails />} />
              </Route>
          </Routes>
      </BrowserRouter>,
  </StrictMode>,
)
