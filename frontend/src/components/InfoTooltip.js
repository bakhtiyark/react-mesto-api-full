import React from 'react'

function InfoTooltip({ isOpen, onClose, imgInfo, textInfo }) {
  return (
    <div className={`popup reg-status ${isOpen && 'popup_opened'}`}>
      <div className="reg-status__window">
        <button onClick={onClose} type="button" className="popup__close-icon"></button>
        <img className='reg-status__img' alt="Иконка статуса" src={imgInfo}/>
        <h3 className='reg-status__text'>{textInfo}</h3>
      </div>
    </div>
  )
}

export default InfoTooltip