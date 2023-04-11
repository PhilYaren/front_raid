import React from 'react'
import { FormControl, FormLabel, TextField, Button } from '@mui/material'
import { useLocation } from 'react-router-dom'

function Auth() {
  const endPoint = useLocation().pathname;
  console.log(endPoint);
  
  const form = () => {
    if(endPoint === '/login') {
      return (<FormControl>
        <h3> Войти </h3>
        <FormLabel>Введите email</FormLabel>
        <TextField/>
        <FormLabel>Введите пароль</FormLabel>
        <TextField/>
        <Button>Войти</Button>
    </FormControl>)
    } else return (
    <FormControl>
      <h3> Регистрация </h3>
      <FormLabel>Введите имя</FormLabel>
      <TextField/>
      <FormLabel>Введите email</FormLabel>
      <TextField/>
      <FormLabel>Введите пароль</FormLabel>
      <TextField/>
      <Button>Войти</Button>
  </FormControl>)
  }
    
  return (
    <div>
        {form()}
    </div>
  )
}

export default Auth