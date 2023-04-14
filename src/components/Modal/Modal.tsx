import React from 'react'
import './Modal.css'

function Modal({active, setActive, children}) {
  return (
    <div className={active? 'modal active' : 'modal' }onClick={() => setActive(false)}>
        modal
        <div className={active? 'modal-content active' : 'modal' } onClick={e => e.stopPropagation()}>
            {children}
        </div>
        </div>
  )
}

export default Modal