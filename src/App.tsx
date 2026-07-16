import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import VenueSpaces from './components/VenueSpaces'
import Events from './components/Events'
import Services from './components/Services'
import Reviews from './components/Reviews'
import BookingForm from './components/BookingForm'
import Location from './components/Location'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'

function App() {
  const [prefilledEvent, setPrefilledEvent] = useState('')

  return (
    <>
      <Navbar />
      <Hero />
      <Reviews />
      <Events />
      <About />
      <Services />
      <VenueSpaces />
      <Location />
      <BookingForm prefilledEvent={prefilledEvent} onClearPrefill={() => setPrefilledEvent('')} />
      <Footer />
      <FloatingCTA />
    </>
  )
}

export default App
