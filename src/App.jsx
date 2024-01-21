import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { fetchAllKanji, fetchAllKanjiTypeLevel, fetchAllRadicals } from './getData'
import LandingPage from './pages/LandingPage'
import ErrorPage from './pages/ErrorPage'
import RadicalReviewPage from './pages/RadicalReviewPage'
import IdentifyRadicalsPage from './pages/IdenfityRadicalsPage'


function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="radicalreview" element={<RadicalReviewPage />} />
        <Route path="identifyradicals" element={<IdentifyRadicalsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
