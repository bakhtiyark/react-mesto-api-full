import { useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";


export default function EditAvatarPopup(props) {

    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value = "";
    }, [props.isOpen]); 

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }
    return (
        <PopupWithForm
          name="updated-avatar"
          title="Обновить аватар"
          buttonText={props.isSubmitting ? 'Сохранение...' :"Сохранить"}
          isOpen={props.isOpen}
          modifier="popup__container_avatar"
          onSubmit={handleSubmit}
          onClose={props.onClose}
          placeholder="Ссылка на картинку"
        >
          <div className="popup__input-wrapper">
            <input type="url" ref={avatarRef} required className="popup__input popup__input_link" id="avatar-input"
              name="link" placeholder="Ссылка на картинку" />
            <span className="avatar-input-error"></span>
          </div>
          <button type="submit" className="popup__save-button">Сохранить</button>

        </PopupWithForm>
    );
}