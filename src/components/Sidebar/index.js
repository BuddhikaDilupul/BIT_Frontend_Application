import React, { useState, useEffect } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {
  CloseIcon,
  Icon,
  SidebarContainer,
  SidebarMenu,
  SidebarLink,
  SidebarRoute,
  SideBtnWrap,
  SidebarLogoutRoute,
  SideWrapper,
} from './SidebarElement'
function refreshPage() {
  window.location.reload()
}
function Sidebar(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const setNavItem = () => {
    let isLoggedIn = localStorage.getItem('authToken')
    setIsLoggedIn(isLoggedIn)
  }
  useEffect(() => {
    let isLoggedIn = localStorage.getItem('authToken')
    setIsLoggedIn(isLoggedIn)
  }, [])
  return (
    <SidebarContainer isOpen={props.isOpen} onClick={props.toggle}>
      <Icon>
        <CloseIcon fontSize="large" />
      </Icon>
      <SideWrapper>
        <SidebarMenu>
          <SidebarLink to="/" onClick={props.toggle}>
            Home
          </SidebarLink>
          <SidebarLink to="/profile" onClick={props.toggle}>
            <AccountCircleIcon />
          </SidebarLink>
          <SidebarLink to="/cart" onClick={props.toggle}>
            <ShoppingCartIcon />
          </SidebarLink>
          {isLoggedIn === 'null' ? (
            <SidebarLink to="/signup" onClick={props.toggle}>
              Signup
            </SidebarLink>
          ) : (
            <SidebarLink to="/myorders" onClick={props.toggle}>
              My Orders
            </SidebarLink>
          )}
        </SidebarMenu>
        {isLoggedIn === 'null' ? (
          <SideBtnWrap>
            <SidebarRoute to="/signIn">Sign In</SidebarRoute>
          </SideBtnWrap>
        ) : (
          <SideBtnWrap>
            <SidebarLogoutRoute
              onClick={() => {
                localStorage.setItem('authToken', null)
                localStorage.setItem('isLoggedIn', null)
                setNavItem()
                refreshPage()
              }}
            >
              Logout
            </SidebarLogoutRoute>
          </SideBtnWrap>
        )}
      </SideWrapper>
    </SidebarContainer>
  )
}

export default Sidebar
