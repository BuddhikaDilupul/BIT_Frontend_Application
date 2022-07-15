// import React from 'react'
import { useNavigate } from 'react-router'

export const TokenCheck = async (successToken, unsuccessToken) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('authToken')
  if (token) {
    try {
      const _data = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/authtoken`,
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
        localStorage.setItem('authToken', 'null')
        return false
      }
    } catch (err) {
      console.log('Unauthorized access denied')
    }
  }
}
