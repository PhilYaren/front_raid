import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatisticAsync} from '../../redux/actions/stattisticActions';
import styles from './UserStat.module.css';

export default function UserStat() {
  const dispatch = useDispatch();
  const statistic = useSelector((state: any) => state.statistic);


  useEffect(() => {
    dispatch(setStatisticAsync());
  }, [dispatch]);

  return (
    <div>
      <h3>Статистика игрока</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Всего игр</th>
            <th>Побед</th>
            <th>Поражений</th>
          </tr>
        </thead>
        <tbody>
          {statistic && statistic.map((user) => (
            <tr key={user.id}>
              <td>{user.allGames}</td>
              <td>{user.gamesWin}</td>
              <td>
                {user.gamesLost}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}