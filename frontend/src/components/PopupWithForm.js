function PopupWithForm(props) {
    const className = `popup popup__${props.name} ${props.isOpen ? "popup_opened" : ""}`

    return (
        <div className={className}>
            <div className={`popup__container ${props.modifier !== undefined ? props.modifier : ""}`}>
                <button type="button" onClick={props.onClose} className="popup__close popup__close-icon" id="profile-close-button"></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
                    {props.children}
                    <button type="submit" className="popup__save-button">{props.buttonText}</button>
                </form>
            </div>
        </div>
    )
}
export default PopupWithForm;