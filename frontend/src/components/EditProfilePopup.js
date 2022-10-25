import { useEffect, useState, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    //Декларация состоянии
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    function handleRename(e) {
        setName(e.target.value);
    }

    function handleNewDescription(e) {
        setDescription(e.target.value);
    }

    const currentUser = useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }
    return (
        <PopupWithForm
            name="updated-profile"
            title="Редактировать профиль"
            buttonText={props.isSubmitting ? 'Сохранение...' :"Сохранить"}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <>
                <input
                    type="text"
                    id="firstname"
                    value={name || ""}
                    name="name"
                    onChange={handleRename}
                    placeholder="Имя"
                    maxLength="40"
                    className="popup__input popup__input_profile_name"
                    required
                />
                <span className="profile-name-input-error"></span>

                <input
                    type="text"
                    id="profession"
                    value={description || ""}
                    onChange={handleNewDescription}
                    name="about"
                    maxLength="200"
                    placeholder="Род занятии"
                    className="popup__input popup__input_profile_secondary"
                    required
                />
                <span className="profile-secondary-input-error"></span>
            </>
        </PopupWithForm>
    );
}

export default EditProfilePopup;