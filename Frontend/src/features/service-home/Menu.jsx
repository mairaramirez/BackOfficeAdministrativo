import React from 'react'

import BackButton from '@/components/common/BackButton.jsx'
import CardLink from '@/components/common/CardLink.jsx'

import {
  UserPlus,
  CalendarDays,
  List
} from 'lucide-react'

import '../../styles/ui.css'

export default function Menu() {

  return (

    <div className="landing-wrap">

      <div
        className="landing-inner service-menu"
        style={{ position: 'relative' }}
      >

        <BackButton
          className="top-right"
          to="/"
        />

        <div className="brand">

          <img
            src="/logos/Service.png"
            alt="Service Home"
            className="brand-logo"
          />

          <h1>Service Home</h1>

        </div>

        <div className="landing-grid">

          <CardLink to="/service-home/nuevo-usuario">

            <div className="menu-action">
              <UserPlus size={18} />
              <span>Alta de cliente</span>
            </div>

          </CardLink>

          <CardLink to="/service-home/nuevo-turno">

            <div className="menu-action">
              <CalendarDays size={18} />
              <span>Nuevo turno</span>
            </div>

          </CardLink>

          <CardLink
            to="/service-home/turnos"
            className="full-width"
          >

            <div className="menu-action">
              <List size={18} />
              <span>Turnos de servicios</span>
            </div>

          </CardLink>

        </div>

      </div>

    </div>

  )
}