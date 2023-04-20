import React from 'react';
import './BattleModal.css';

function BattleModal({ active, children }) {
  return (
    <div className={active ? 'battle-modal-content active cssanimation fadeIn' : 'battle-modal'}>
      {children}
    </div>
  );
}

export default BattleModal;
