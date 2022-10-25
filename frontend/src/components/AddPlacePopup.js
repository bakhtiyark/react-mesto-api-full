import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setPlace("");
    setLink("");
  }, [props.isOpen]);

  function handleNameSubmit(e) {
    setPlace(e.target.value);
  }

  function handleLinkSubmit(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmitPlace({
      name: place,
      link: link,
    });
  }

  return (

    <PopupWithForm
      name="new-card"
      title="Добавить место"
      buttonText={props.isSubmitting ? 'Сохранение...' :"Сохранить"}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <>
        <input
          value={place || ""}
          onChange={handleNameSubmit}
          type="text"
          id="location"
          name="name"
          maxLength="40"
          className="popup__input popup__input_profile_name"
          required
          placeholder="Название места"
        />
        <span className="profile-name-input-error"></span>

        <input

          value={link || ""}
          onChange={handleLinkSubmit}
          type="text"
          id="link"
          name="link"
          maxLength="200"
          className="popup__input popup__input_profile_secondary"
          required
          placeholder="Ссылка на картинку"
        />
        <span className="profile-secondary-input-error"></span>
      </>
    </PopupWithForm>
  );
}
