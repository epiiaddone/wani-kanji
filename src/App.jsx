import { useState } from 'react'
import './App.css'
import { fetchAllKanji, fetchAllKanjiTypeLevel, fetchAllRadicals } from './getData'
import { RadicalReviewSelection } from './components/RadicalReviewSelection'
import { IdentifyRadicalsSelection } from './components/IdentifyRadicalsSeletion'

function App() {


  return (
    <>
      <RadicalReviewSelection />
      <IdentifyRadicalsSelection />
    </>
  )
}

export default App
