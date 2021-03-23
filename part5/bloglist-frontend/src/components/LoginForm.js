import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import TextBox from './TextBox'
import Button from './Button'
import Notification from './Notification'
import loginService from '../services/login'

const LoginForm = ({ onLogin }) => {
  const [error, setError] = useState(false)
  const { register, handleSubmit } = useFormContext()

  const login = async user => {
    try {
      const res = await loginService.login(user)
      setError(false)
      onLogin(res.data)
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  return (
    <form onSubmit={handleSubmit(login)}>
      <TextBox name="username" register={register} />
      <TextBox name="password" type="password" register={register} />
      <Button type="submit" label="Login" />
      {error && 
        <Notification type="error" message="Incorrect username or password" />
      }
    </form>
  )
}

export default LoginForm;