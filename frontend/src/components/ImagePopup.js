function ImagePopup({ card, onClose }) {
    const className = `popup popup_open-card ${card.opened ? "popup_opened" : ""}`;

    return (
        <div className={className} id="open-card">
            <div className="popup__image-container">
                <button className="popup__close popup__close-icon popup__close-icon_position-place" id="image-close-button"
                    type="button" onClick={onClose}></button>
                <img className="popup__image" src={card.src} alt={card.alt} />
                <p className="popup__place-name">{card.alt}</p>
            </div>
        </div>
    );
}

export default ImagePopup;