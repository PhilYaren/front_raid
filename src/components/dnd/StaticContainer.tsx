import React from 'react';
import { current } from '@reduxjs/toolkit';

function StaticContainer({
  opponents,
  first,
  current,
  secret,
}: {
  opponents: any;
  current: string;
  first: boolean;
  secret: boolean;
}): JSX.Element {
  console.log('secret', secret);
  return (
    <div
      className="opponent"
      style={{
        padding: '10',
        margin: '0 20px',
        flex: '1',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        minWidth: '104px',
        minHeight: '140px',
        position: 'relative',
        overflow: 'wrap',
      }}
    >
      {opponents && Object.entries(opponents).length && first
        ? Object.entries(opponents).map((data: any) => {
            if (data[0] === current && data[1].length) {
              return (
                <img
                  key={data[1][0].id}
                  style={{ width: '100px' }}
                  src={secret ? '/img/cover.jpg' : data[1][0].image}
                  alt="Карточка"
                />
              );
            }
          })
        : Object.entries(opponents).map((data: any) => {
            if (data[0] !== current && data[1].length) {
              return (
                <img
                  key={data[1][0].id}
                  style={{ width: '100px' }}
                  src={secret ? '/img/cover.jpg' : data[1][0].image}
                  alt="Карточка"
                />
              );
            }
          })}
    </div>
  );
}

export default StaticContainer;
