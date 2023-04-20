import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import React from 'react';
import useSound from 'use-sound';
import clickSound from '../../assets/mouseClick.wav'

function CreateAndJoinGame({ handle }: any) {
  const [clickSoundPlay] = useSound(clickSound);

  return (
    <div>
      <h3>Создание комнаты</h3>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handle}
      >
       <FormLabel>Название комнаты</FormLabel>
            <TextField required name="name"  />
        <RadioGroup name='size' onClick={()=>clickSoundPlay()}>
          <FormControlLabel value={2} control={<Radio/>} label='2 игрока'/>
          <FormControlLabel value={3} control={<Radio/>} label='3 игрока'/>
        </RadioGroup>
        <Button type="submit" className="cssanimation btnAuth">
          Создать
        </Button>

      </form>
    </div>
  );
}

export default CreateAndJoinGame;
