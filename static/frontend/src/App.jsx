import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Toast from './components/Toast'
import Catalog from './components/Catalog'
import LoginModal from './components/LoginModal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Categories from './components/Categories'
import PopularCourses from './components/PopularCourses'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ProfileModal from './components/ProfileModal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [modalMode, setModalMode] = useState('login')
  const [currentUser, setCurrentUser] = useState(null)
  const [favoriteCourses, setFavoriteCourses] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [toast, setToast] = useState({
  message: '',
  type: 'success'
})

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    })
  }, [])
function showToast(message, type = 'success') {
  setToast({ message, type })

  setTimeout(() => {
    setToast({ message: '', type: 'success' })
  }, 3000)
}
  function openLoginModal() {
    setModalMode('login')
    setIsModalOpen(true)
  }

  function handleLogout() {
    setCurrentUser(null)
    setIsProfileOpen(false)
    setFavoriteCourses([])
    showToast('Вы вышли из аккаунта', 'success')
  }

  function toggleFavorite(courseTitle) {
    if (!currentUser) {
    showToast('Сначала войдите в аккаунт', 'error')
      return
    }

    if (favoriteCourses.includes(courseTitle)) {
      setFavoriteCourses(
        favoriteCourses.filter(title => title !== courseTitle)
      )
    } else {
      setFavoriteCourses([...favoriteCourses, courseTitle])
    }
  }

  async function handleRegister(name, email, password) {
    const response = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })

    const data = await response.json()
   showToast(data.message, data.success ? 'success' : 'error')

    if (data.success) {
      setModalMode('login')
    }
  }

async function handleLogin(email, password) {
  const response = await fetch('http://127.0.0.1:8000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  const data = await response.json()

  showToast(
    data.message,
    data.success ? 'success' : 'error'
  )

  if (data.success) {
    setCurrentUser(data.user)
    setIsModalOpen(false)
    setIsProfileOpen(true)
  }
}

  return (
    <>
      <Navbar
        openModal={openLoginModal}
        currentUser={currentUser}
        openProfile={() => setIsProfileOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Hero />
      <Stats />
      <Categories />
      <PopularCourses />

      <Catalog
        favoriteCourses={favoriteCourses}
        toggleFavorite={toggleFavorite}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <CTA />
      <Footer />

      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        setMode={setModalMode}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <ProfileModal
  isOpen={isProfileOpen}
  onClose={() => setIsProfileOpen(false)}
  user={currentUser}
  onLogout={handleLogout}
  favoriteCourses={favoriteCourses}
/>

<Toast
  message={toast.message}
  type={toast.type}
  onClose={() =>
    setToast({
      message: '',
      type: 'success'
    })
  }
/>
    </>
  )
}

export default App