/*!
=========================================================
* Paper Dashboard React - v1.3.0
=========================================================
* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, Badge } from 'reactstrap'
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar'
import { useSelector, useDispatch } from 'react-redux'

import logo from 'logo.svg'
import FIREBASE from '../../config/FIREBASE'
import { UPDATE_UNREAD_APPO } from 'actions/AppoAction'

var ps

function Sidebar(props) {
  const dispatch = useDispatch()
  const { unreadListAppo } = useSelector((state) => state.AppoReducer)
  const { unreadListAssmit } = useSelector((state) => state.AssmitReducer)

  const sidebar = React.useRef()
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? 'active' : ''
  }
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
    }
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
      }
    }
  })

  const updateAppo = (item) => {
    const data = { ...item }
    data.isRead = true

    FIREBASE.database()
      .ref('appoitment/' + item.id)
      .update(data)
      .then((response) => {
        console.log('berhasil update read appo')
      })
      .catch((error) => {
        console.log('gagal update read appo')
      })
  }

  const handleReadAll = () => {
    FIREBASE.database()
      .ref('appoitment')
      .once('value', (querySnapshot) => {
        const data = querySnapshot.val()

        const updatedData = []

        Object.keys(data).map((key) =>
          updatedData.push({ ...data[key], id: key })
        )

        const unread = updatedData.filter((item) => item.isRead === false)

        Promise.all(unread.map((item) => updateAppo(item)))
      })
      .catch((error) => console.log('err get list appo: ', error))
  }

  const updateAssmit = (item) => {
    const data = { ...item }
    data.isRead = true

    FIREBASE.database()
      .ref('assMit/' + item.id)
      .update(data)
      .then((response) => {
        console.log('berhasil update read assMit')
      })
      .catch((error) => {
        console.log('gagal update read assMit')
      })
  }

  const handleReadAllAssmit = () => {
    FIREBASE.database()
      .ref('assMit')
      .once('value', (querySnapshot) => {
        const data = querySnapshot.val()

        const updatedData = []

        Object.keys(data).map((key) =>
          updatedData.push({ ...data[key], id: key })
        )

        const unread = updatedData.filter((item) => item.isRead === false)

        Promise.all(unread.map((item) => updateAssmit(item)))
      })
      .catch((error) => console.log('err get list assmit: ', error))
  }

  return (
    <div
      className='sidebar'
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className='logo'>
        <a
          href='https://www.creative-tim.com'
          className='simple-text logo-mini'
        >
          <div className='logo-img'>
            <img src={logo} alt='react-logo' />
          </div>
        </a>
        <a
          href='https://www.creative-tim.com'
          className='simple-text logo-normal'
        >
          Bayukarta App
        </a>
      </div>
      <div className='sidebar-wrapper' ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            if (prop.sidebar) {
              return (
                <li
                  className={
                    activeRoute(prop.path) + (prop.pro ? ' active-pro' : '')
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className='nav-link'
                    activeClassName='active'
                    onClick={() =>
                      prop.name === 'Appoitments Umum'
                        ? handleReadAll()
                        : prop.name === 'Appoitments Asuransi & Mitra'
                        ? handleReadAllAssmit()
                        : () => {}
                    }
                  >
                    <i className={prop.icon} />
                    <p>
                      {prop.name}
                      {prop.name === 'Appoitments Umum' && unreadListAppo > 0 && (
                        <Badge
                          color='primary'
                          style={{
                            marginLeft: 7,
                            paddingRight: 5,
                            paddingLeft: 5,
                            fontSize: 12,
                            color: 'white',
                          }}
                        >
                          {unreadListAppo}
                        </Badge>
                      )}

                      {prop.name === 'Appoitments Asuransi & Mitra' &&
                        unreadListAssmit > 0 && (
                          <Badge
                            color='primary'
                            style={{
                              marginLeft: 7,
                              paddingRight: 5,
                              paddingLeft: 5,
                              fontSize: 12,
                              color: 'white',
                            }}
                          >
                            {unreadListAssmit}
                          </Badge>
                        )}
                    </p>
                  </NavLink>
                </li>
              )
            }
            return null
          })}
        </Nav>
      </div>
    </div>
  )
}

export default Sidebar