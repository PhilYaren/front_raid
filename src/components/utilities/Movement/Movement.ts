import { sessionSocket } from '../../../socket';
import { getCurrentColor } from '../rotate-func/rotate';

export function movement(
  order: any,
  current: number,
  session: string,
  id: string,
  players: any,
  steps: number
) {
  let winNumber = steps;
  let position = players[order[current]].position;
  const finalPosition = position + Number(winNumber);
  const kek = setInterval(() => {
    if (position + 1 <= finalPosition) {
      if (position + 1 === finalPosition) {
        sessionSocket.emit('move_player', {
          room: session,
          data: { id: id, position: 1 },
          last: true,
        });
      } else if (position + 1 === 51) {
        sessionSocket.emit('move_player', {
          room: session,
          data: { id: id, position: 1 },
          final: true,
        });
        clearInterval(kek);
      } else {
        sessionSocket.emit('move_player', {
          room: session,
          data: { id: id, position: 1 },
        });
      }
      position += 1;
    } else {
      clearInterval(kek);
    }
  }, 250);
}

export function moveBack (
  order: any,
  current: number,
  session: string,
  id: string,
  players: any,
  steps: number
) {
  let winNumber = steps;
  let position = players[order[current]].position;
  const finalPosition = position - Number(winNumber);
  const moveInterval = setInterval(() => {
    if (position - 1 >= finalPosition) {
      if (position - 1 === finalPosition) {
        sessionSocket.emit('move_player', {
          room: session,
          data: { id: id, position: -1 },
          last: true,
        });
      } else if (position - 1 === 1) {
        sessionSocket.emit('move_player', {
          room: session,
          data: { id: id, position: -1 },
          last: true,
        });
        clearInterval(moveInterval);
      } else {
        sessionSocket.emit('move_player', {
          room: session,
          data: { id: id, position: -1 },
        });
      }
      position -= 1;
    } else {
      clearInterval(moveInterval);
    }
  }, 250);
}
