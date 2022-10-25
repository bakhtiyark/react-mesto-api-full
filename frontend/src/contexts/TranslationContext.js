import React from 'react';

export const translations = {
    ru: {
        registerTitle: "Зарегистрироваться",
        registerPassword: "Пароль",
        registrationButton: "Зарегистрироваться",
        registrationRedirect: "Уже зарегистрированы? Войти",
        authTitle: "Вход",
        signOut:"Выйти",
        editProfileTitle: "Редактировать профиль",
        editProfileName: "Имя",
        editProfileSecondary: "Род занятии",
        editAvatarTitle: "Обновить аватар",

        saveButton: 'Сохранить',
        saveButtoninProcess: 'Сохранение...',
        imagePlaceholder: "Ссылка на картинку",

        addCardTitle: "Добавить место",
        addCardPlaceholder: "Название места",

        messageTextSuccess: 'Вы успешно зарегистрировались!',
        messageTextFailure: 'Что-то пошло не так! Попробуйте ещё раз.'

    },
    en: {
        registerTitle: "Sign Up",
        registerPassword: "Password",
        registrationButton: "Sign Up",
        registrationRedirect: "Already registered? Log in here",
        authTitle: "Log in",
        signOut:"Log out",
        editProfileTitle: "Edit Profile",
        editProfileName: "Name",
        editProfileSecondary: "Occupation",
        editAvatarTitle: "Replace Avatar",

        saveButton: 'Save',
        saveButtoninProcess: 'Saving...',
        imagePlaceholder: "Link to image",

        addCardTitle: "Add Place",
        addCardPlaceholder: "Name of the Place",

        messageTextSuccess: 'You have signed up!',
        messageTextFailure: 'Something went wrong! Please try again.'

    },
    kz: {
        registerTitle: "Tirkeu",
        registerPassword: "Soz",
        registrationButton: "Tirkeu",
        registrationRedirect: "Tirkeldiniz ba? Kiru",
        authTitle: "Kiru",
        signOut:"Shygu",
        editProfileTitle: "Profile ozgertu",
        editProfileName: "At",
        editProfileSecondary: "Qyzmet turi",
        editAvatarTitle: "Avatar ozgertu",

        saveButton: 'Saqtau',
        saveButtoninProcess: 'Saqtalyp jatyr...',
        imagePlaceholder: "Suret siltimesi",

        addCardTitle: "Jer saly",
        addCardPlaceholder: "Jerdin atauy",

        messageTextSuccess: 'Siz oydagydai tirkeldiniz!',
        messageTextFailure: 'Bir zat durys emes! Qaytalaniz.'

    },
    fr: {
        registerTitle: "Inscription",
        registerPassword: "Mot de passe",
        registrationButton: "S'incrire",
        registrationRedirect: "On se connait deja ? Connectez-vous ici",
        authTitle: "Se connecter",        
        signOut:"Se deconnecter",
        editProfileTitle: "Modifier le profil",
        editProfileName: "Nom",
        editProfileSecondary: "Occupation",
        editAvatarTitle: "Modifier l'avatar",

        saveButton: 'Sauvegarder',
        saveButtoninProcess: 'En cours..',
        imagePlaceholder: "Lieu pour image",

        addCardTitle: "Ajouter un lieu",
        addCardPlaceholder: "Nom de lieu",

        messageTextSuccess: 'Vous avez registre!',
        messageTextFailure: 'Oops! Y-a-t-il un truc! Essayer plus une fois SVP.'

    },
};

export const TranslationContext = React.createContext();