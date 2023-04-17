import React from 'react'
import './BattleModal.css'

function BattleModal({active, setActive, children}) {
  return (
    <div className={active? 'battle-modal-content active' : 'battle-modal' } >
        {children}
    </div>
  )
}

export default BattleModal