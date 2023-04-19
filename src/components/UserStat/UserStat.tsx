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
    <div className="field">
      <h1>Статистика игрока</h1>
      <table className={styles.table}>
        <thead>
         <tr>
            <td>Всего игр</td>
            <td>Побед</td>
            <td>Поражений</td>
          </tr>
        </thead>
        <tbody>
          {/* {statistic && statistic.map((userStat: any) => (
            <tr key={userStat.id}>
              <td>{userStat.reduce((acc: any, current: any) => acc + current.result ? 1 : 1, 0)}</td>
              <td>{userStat.reduce((acc: any, current: any) => acc + current.result ? 1 : 0, 0)}</td>
              <td>{userStat.reduce((acc: any, current: any) => acc + current.result ? 0 : 1, 0)}</td>
            </tr>
          ))} */}
            <tr>
              <td>12</td>
              <td>8</td>
              <td>4</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
}