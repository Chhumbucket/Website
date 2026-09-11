import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Wordle from './components/Wordle'
import Footer from './components/Footer'
import { useRoute } from './lib/router'

export default function App() {
  const path = useRoute()
  const isWordle = path.startsWith('/wordle')

  return (
    <>
      <Navbar />
      {isWordle ? (
        <main className="page">
          <Wordle />
        </main>
      ) : (
        <>
          <Hero />
          <main>
            <Experience />
            <Projects />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
