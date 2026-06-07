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
import ChatBot from './components/ChatBot'
import AboutModal from './components/AboutModal'
import { courses } from './data/courses'
import AdminPanel from './components/AdminPanel'
function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [modalMode, setModalMode] = useState('login')
  const [currentUser, setCurrentUser] = useState(null)
  const [favoriteCourses, setFavoriteCourses] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [coursesList, setCoursesList] = useState(() => {
  const savedCourses = localStorage.getItem('stacklearn_courses')

  if (savedCourses) {
    return JSON.parse(savedCourses)
  }

  return courses
})

const [isAdminOpen, setIsAdminOpen] = useState(false)
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
  useEffect(() => {
  localStorage.setItem('stacklearn_courses', JSON.stringify(coursesList))
}, [coursesList])

  function showToast(message, type = 'success') {
    setToast({ message, type })

    setTimeout(() => {
      setToast({ message: '', type: 'success' })
    }, 3000)
  }

  function getErrorMessage(data, fallback) {
    const detail = data?.detail

    if (typeof detail === 'string') {
      return detail
    }

    if (Array.isArray(detail)) {
      return detail[0]?.msg || fallback
    }

    if (detail?.msg) {
      return detail.msg
    }

    return data?.message || fallback
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
    try {
      const response = await fetch('https://stack-learn-7mhw.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        showToast(getErrorMessage(data, 'Ошибка регистрации'), 'error')
        return
      }

      showToast(data.message || 'Аккаунт создан. Теперь войдите.', 'success')
      setModalMode('login')
    } catch (error) {
      showToast('Не удалось подключиться к серверу', 'error')
    }
  }

  async function handleLogin(email, password) {
    try {
      const response = await fetch('https://stack-learn-7mhw.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        showToast(getErrorMessage(data, 'Ошибка входа'), 'error')
        return
      }

      showToast(data.message || 'Вход выполнен успешно', 'success')

      if (data.success) {
        setCurrentUser(data.user)
        setIsModalOpen(false)
        setIsProfileOpen(true)
      }
    } catch (error) {
      showToast('Не удалось подключиться к серверу', 'error')
    }
  }

  return (
    <>
      <Navbar
  openAdmin={() => setIsAdminOpen(true)}
  openModal={openLoginModal}
  currentUser={currentUser}
  openProfile={() => setIsProfileOpen(true)}
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  openChat={() => setIsChatOpen(true)}
  openAbout={() => setIsAboutOpen(true)}
/>

      <Hero openChat={() => setIsChatOpen(true)} />
      <Stats />
      <Categories />
      <PopularCourses />
<Catalog
  coursesList={coursesList}
  favoriteCourses={favoriteCourses}
  toggleFavorite={toggleFavorite}
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
/>

      <CTA openChat={() => setIsChatOpen(true)} />
      <Footer
  openChat={() => setIsChatOpen(true)}
  openAbout={() => setIsAboutOpen(true)}
/>

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

      <ChatBot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
      <AboutModal
  isOpen={isAboutOpen}
  onClose={() => setIsAboutOpen(false)}
/>
<AdminPanel
  isOpen={isAdminOpen}
  onClose={() => setIsAdminOpen(false)}
  coursesList={coursesList}
  setCoursesList={setCoursesList}
/>
    </>
  )
}

export default App