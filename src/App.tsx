import { useState, useEffect } from 'react'
import './App.css'
import img from './assets/download.webp'
import { Fireworks } from 'fireworks-js'

function App() {
  const [yes, setYes] = useState(false)

  useEffect(() => {
    if (yes) {
      const container = document.getElementById('fireworks') || document.createElement('div')
      container.style.position = 'fixed'
      container.style.top = '-30%'
      container.style.left = '0'
      container.style.width = '100%'
      container.style.height = '100%'
      container.style.zIndex = '9999'
      document.body.appendChild(container)

      const fireworks = new Fireworks(container, {
        rocketsPoint: { min: 50, max: 50 },
        acceleration: 1.05,
        friction: 0.95,
        gravity: 1.5,
        particles: 200, // Increased number of particles
        explosion: 10, // Increased explosion size
        boundaries: {
          x: container.clientWidth,
          y: container.clientHeight
        },
        sound: {
          enabled: true,
          files: [
            'https://fireworks.js.org/sounds/explosion0.mp3',
            'https://fireworks.js.org/sounds/explosion1.mp3',
            'https://fireworks.js.org/sounds/explosion2.mp3'
          ],
          volume: {
            min: 8, // Increased minimum volume
            max: 60 // Increased maximum volume
          }
        }
      })

      fireworks.start()

      const timeoutId = setTimeout(() => {
        window.location.reload()
      }, 30000)

      return () => {
        fireworks.stop()
        document.body.removeChild(container)
        clearTimeout(timeoutId)
      }
    }
  }, [yes])

  const moveAway = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    const button = e.currentTarget as HTMLButtonElement;
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
    let x = Math.floor(Math.random() * (window.innerWidth - buttonWidth));
    let y = Math.floor(Math.random() * (window.innerHeight - buttonHeight));

    // Ensure the button stays within the visible screen
    x = Math.max(0, Math.min(x, window.innerWidth - buttonWidth));
    y = Math.max(0, Math.min(y, Math.min(window.innerHeight - buttonHeight, window.innerHeight * 0.9)));
    button.style.position = 'absolute';
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
  }

  const handleYes = () => {
    setYes(true)
  }

  const handleNo = () => {
    const noButton = document.querySelector('.ugly-no') as HTMLButtonElement;
    const yesButton = document.querySelector('.buttons') as HTMLButtonElement;
    if (noButton) {
      const currentScale = parseFloat(noButton.style.transform.replace('scale(', '').replace(')', '')) || 1;
      noButton.style.transform = `scale(${currentScale * 0.8})`;
    }
    if (yesButton) {
      const currentScale = parseFloat(yesButton.style.transform.replace('scale(', '').replace(')', '')) || 1;
      yesButton.style.transform = `scale(${currentScale * 1.2})`;
    }
  }
  return (
    <main className='container'>
      <div id='fireworks' />
      <img src={img} alt='img' className='mainImage' />
      <p>Would you be my <span>❤️</span> Valentine? <span>❤️</span></p>
      <div className='buttons-container'>
        <div className="love">
          <button type="button" id="button" className="buttons" onClick={handleYes}>Yes</button>
          <div id="heart1" className="hearts"></div>
          <div id="heart2" className="hearts"></div>
          <div id="heart3" className="hearts"></div>
          <div id="heart4" className="hearts"></div>
          <div id="heart5" className="hearts"></div>
        </div>
        <button onMouseEnter={moveAway} onClick={handleNo} className='ugly-no'>No</button>
      </div>
    </main>
  )
}

export default App
