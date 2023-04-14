import { Button, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import React from 'react'

function CreateAndJoinGame({handle}:any) {
  return (
    <div><h3>Создание комнаты</h3>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handle}
      > 
       <FormLabel>Название комнаты</FormLabel>
            <TextField required name="name"  />
            <FormLabel>Пароль</FormLabel>
        <TextField required type='password' name="password" />
        <RadioGroup name='size'>
          <FormControlLabel value={2} control={<Radio/>} label='2 игрока'/>
          <FormControlLabel value={3} control={<Radio/>} label='3 игрока'/>
        </RadioGroup>
        <Button type="submit" className="cssanimation btnAuth">
          Создать
        </Button>
         {/* <input type="text" placeholder="Название комнаты" name="name" />
            <input
              type="password"
              placeholder="Пароль от сессии"
              name="password"
            />
            <select name="size">
              <option value="2">2 игрока</option>
              <option value="3">3 игрока</option>
            </select>

            <button type="submit">DA</button> */}
      </form>
    </div>
  )
}

export default CreateAndJoinGame