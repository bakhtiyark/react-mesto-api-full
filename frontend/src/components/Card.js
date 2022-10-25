import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"

function Card(props) {
    const currentUser = useContext(CurrentUserContext)

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.ownerId === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
    );

    //Обработчик клика
    function handleCardClick() {
        return props.onCardClick(props.card)
    }

    //Обработчик удаления
    function handleDelete() {
        return props.onCardDelete(props.card)
    }
    //Обработчик лайков
    function handleLike() {
        return props.onCardLike(props.card)
    }

    return (
        <article className="element">
            <img className="element__image" src={props.link} alt={props.name} onClick={handleCardClick} />
            <div className="element__card">
                <h2 className="element__title">{props.name}</h2>
                <div className="like-compartment">
                    <button className={cardLikeButtonClassName} onClick={handleLike} id="like-button" type="button"></button>
                    <p className="element__like-counter">{props.likes.length}</p>
                </div>

            </div>
            <button className={cardDeleteButtonClassName} onClick={handleDelete} type="button"></button>
        </article>

    )
}
export default Card;