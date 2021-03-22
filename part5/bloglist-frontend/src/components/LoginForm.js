import React from 'react'
import { useFormContext } from 'react-hook-form'

import TextBox from './TextBox';
import Button from './Button';
import loginService from '../services/login'

const LoginForm = ({ onLogin }) => {
  const { register, handleSubmit } = useFormContext()

  const login = async data => {
    try {
      await loginService.login(data)
      onLogin(data)
    } catch (error) {
      console.log(error)
      onLogin(null)
    }
  }

  return (
    <form onSubmit={handleSubmit(login)}>
      <TextBox name="username" register={register} />
      <TextBox name="password" type="password" register={register} />
      <Button type="submit" label="Login" />
    </form>
  )
}

export default LoginForm;