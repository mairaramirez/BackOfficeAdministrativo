import React, { useEffect, useState } from 'react'
import CardLink from '@/components/common/CardLink.jsx'
import '../../styles/ui.css'
import s from "./index.module.css";

export default function Landing() {
  const [now, setNow] = useState('')
  useEffect(() => {
    const dtf = new Intl.DateTimeFormat('es-AR', { dateStyle: 'full', timeStyle: 'medium' })
    setNow(dtf.format(new Date()))
  }, [])

  return (
    <div className="landing-wrap">

      <div className="landing-inner">

        <h1 className={s.title}>
          BIENVENIDO
        </h1>

        <div className={s.subtitle}>
          Seleccione una opción
        </div>
        <br />

        <div className={s.options}>

          <CardLink to="/myr" className={s.card}>
            <div className={s.systemCard}>

              <img
                src="/logos/MYR.png"
                alt="MYR"
                className={s.systemLogo}
              />

              <span>MYR</span>

            </div>
          </CardLink>

          <CardLink to="/service-home" className={s.card}>
            <div className={s.systemCard}>

              <img
                src="/logos/Service.png"
                alt="Service Home"
                className={s.systemLogo}
              />

              <span>Service Home</span>

            </div>
          </CardLink>

        </div>

        <div
          className="datetime"
          aria-live="polite"
        >
          {now}
        </div>

      </div>

    </div>
  )
}
