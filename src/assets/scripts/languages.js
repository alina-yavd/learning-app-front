const languageForm = document.querySelector('#language-form');
const LanguageSelects = document.querySelectorAll('.language-select');
let languages = [];

getLanguages();

document.addEventListener('DOMContentLoaded', function () {
    showCurrentLanguage();
    renderLanguageSelect();

    if (!!languageForm) {
        languageForm.addEventListener('submit', function (event) {
            event.preventDefault();
            createLanguage();
        })
    }
});

function createLanguage() {
    let formData = new FormData(languageForm);
    let url = serverUrl + 'language/create';
    let request = new Request(url, {
        method: 'POST',
        body: formData
    });
    fetch(request)
        .then((resp) => resp.json())
        .then(function (data) {
            if (data.status === 'success') {
                location.reload();
            } else {
                alert(data.message);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getLanguages() {
    let url = serverUrl + 'language';
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            languages = data.items;
        })
        .then(function () {
            showCurrentLanguage();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function showCurrentLanguage() {
    let languageName = '';
    let localLanguage = localStorage.getItem('language');
    if (!!localLanguage) {
        languageName = languages.find(lang => lang.name === localLanguage);
    } else {
        languageName = languages.shift();
    }
    if (!!languageName) {
        document.querySelector('#language').innerHTML = languageName.name;
    }
}

function renderLanguageSelect() {
    if (!LanguageSelects.length) {
        return;
    }
    if (languages.length) {
        LanguageSelects.forEach(select => {
            languages.forEach(language => {
                let option = createNode('option', '');
                option.value = `${language.code}`;
                option.innerHTML = `${language.name}`;
                select.append(option);
            });
        });
    }
}
