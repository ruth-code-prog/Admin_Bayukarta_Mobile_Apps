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
import { useDispatch, useSelector } from 'react-redux'
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

import DemoNavbar from 'components/Navbars/DemoNavbar.js'
import Footer from 'components/Footer/Footer.js'
import Sidebar from 'components/Sidebar/Sidebar.js'

import routes from 'routes.js'
import { getListAppo } from 'actions/AppoAction'
import FIREBASE from '../config/FIREBASE'
import { getListAssmit } from 'actions/AssmitAction'

var ps

function Dashboard(props) {
  const [showModal, setShowModal] = React.useState(false)
  const [notification, setNotification] = React.useState(null)
  const [backgroundColor, setBackgroundColor] = React.useState('white')
  const [activeColor, setActiveColor] = React.useState('info')
  const mainPanel = React.useRef()
  const location = useLocation()
  const history = useHistory()

  const dispatch = useDispatch()
  const { unreadListAppo } = useSelector((state) => state.AppoReducer)

  React.useEffect(() => {
    dispatch(getListAppo())
    dispatch(getListAssmit())

    FIREBASE.messaging()
      .getToken({
        vapidKey:
          'BHMDsWcdzx0oaRtBhvbakhmYIaAgeDOQQgTNTBgG99plJF3bPXqUSkA-dhxFmMlZRN6P9LnW7ogYsRe6_OhrERc',
      })
      .then((token) => {
        FIREBASE.database()
          .ref('firebaseToken')
          .once('value', (querySnapshot) => {
            const data = querySnapshot.val()

            if (!data) {
              FIREBASE.database().ref('firebaseToken').push(token)
            } else {
              const filterData = []
              Object.keys(data).map((key) => filterData.push(data[key]))

              if (!filterData.includes(token)) {
                FIREBASE.database().ref('firebaseToken').push(token)
              }
            }
          })
          .catch((error) => console.log('err get list token', error))
      })
      .catch((err) => console.log('err get token: ', err))

    FIREBASE.messaging().onMessage((data) => {
      setShowModal(true)
      setNotification(data)
      dispatch(getListAppo())
    })
  }, [])

  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current)
      document.body.classList.toggle('perfect-scrollbar-on')
    }
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
        document.body.classList.toggle('perfect-scrollbar-on')
      }
    }
  })
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [location])
  const handleActiveClick = (color) => {
    setActiveColor(color)
  }
  const handleBgClick = (color) => {
    setBackgroundColor(color)
  }

  const toggle = () => setShowModal(!showModal)

  return (
    <div className='wrapper'>
      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className='main-panel' ref={mainPanel}>
        <DemoNavbar {...props} />
        <Switch>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
                exact
              />
            )
          })}
        </Switch>
        <Footer fluid />
      </div>

      <Modal isOpen={showModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {notification?.notification?.title}
        </ModalHeader>
        <ModalBody>{notification?.notification?.body}</ModalBody>
        <ModalFooter>
          <Button color='danger' onClick={toggle}>
            TUTUP
          </Button>
          <Button
            color='primary'
            onClick={() => [toggle(), history.push(notification?.data?.page)]}
          >
            LIHAT
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Dashboard
