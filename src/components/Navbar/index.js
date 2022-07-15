import React, { useEffect, useState } from 'react'
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
  NavLogoutBtn,
} from './NavbarElement'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import shopLogo from '../Images/shop_logo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
function refreshPage() {
  window.location.reload()
}
const Navbar = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const setNavItem = () => {
    let isLoggedIn = localStorage.getItem('isLoggedIn')
    setIsLoggedIn(isLoggedIn)
  }
  const TokenCheck = async () => {
    console.log('token')
    const token = localStorage.getItem('authToken')
    if (token) {
      try {
        const _data = await fetch(
          `{process.env.REACT_APP_BACKEND_URL}/api/authtoken`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          },
        )
        if (_data.status === 200) {
          return true
        } else {
          localStorage.setItem('authToken', null)
          localStorage.setItem('isLoggedIn', null)
          setNavItem()
        }
      } catch (err) {
        console.log('Unauthorized access denied')
      }
    }
  }

  useEffect(() => {
    TokenCheck()
    let isLoggedIn = localStorage.getItem('authToken')
    setIsLoggedIn(isLoggedIn)
  }, [])
  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">
            <img src={shopLogo} width="120px" height={'120px'} />
            Ruwan Bakehouse
          </NavLogo>
          <MobileIcon onClick={props.toggle}>
            <MenuIcon fontSize="large" />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to="/">Home</NavLinks>
            </NavItem>
            {/* <NavItem>
              <NavLinks to="/about">About</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/contact">Contact</NavLinks>
            </NavItem> */}
            {isLoggedIn !== 'null' ? (
              <>
                <NavItem>
                  <NavLinks to="/myorders">My Orders</NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks to="/profile">
                    <AccountCircleIcon />
                  </NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks to="/cart">
                    <ShoppingCartIcon />
                  </NavLinks>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <NavLinks to="/signIn">Sign In</NavLinks>
              </NavItem>
            )}

            {isLoggedIn !== 'null' ? (
              <NavBtn>
                <NavLogoutBtn
                  onClick={() => {
                    localStorage.setItem('authToken', null)
                    localStorage.setItem('authID', null)
                    localStorage.setItem('authUser', null)
                    localStorage.setItem('isLoggedIn', null)
                    setNavItem()
                    refreshPage()
                  }}
                >
                  Logout
                </NavLogoutBtn>
              </NavBtn>
            ) : (
              <NavBtn>
                <NavBtnLink to="/signup">Signup</NavBtnLink>
              </NavBtn>
            )}
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  )
}
export default Navbar
