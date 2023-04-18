import { Session } from '../../types';
import { SET_SESSIONS } from '../types';

export const setSessions = (sessions: Session[]) => ({
  type: SET_SESSIONS,
  payload: sessions,
});
