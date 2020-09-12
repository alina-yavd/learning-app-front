const languageForm = document.querySelector('#language-form');
const LanguageSelects = document.querySelectorAll('.language-select');

apiGetLanguages();

document.addEventListener('DOMContentLoaded', function () {
    if (!!languageForm) {
        languageForm.addEventListener('submit', function (event) {
            event.preventDefault();
            apiCreateLanguage();
        })
    }
});

function resultGetLanguages(languages) {
    let group = localData.get('localGroup');
    if (!!group && group.language) {
        let currentLanguage = languages.find(lang => lang.id === group.language.id);
        localData.set('localLanguage', currentLanguage);
    }
}

function renderGetLanguages(languages) {
    const languageDiv = document.querySelector('#language');
    let localLanguage = localData.get('localLanguage');
    if (!!languageDiv && !!localLanguage) {
        languageDiv.innerHTML = localLanguage.name + '<span class="flag"><img src="/src/assets/images/flags/' + localLanguage.code + '.svg"></span>';
    }
    renderLanguageSelect(languages);
}

function renderLanguageSelect(languages) {
    if (!LanguageSelects.length) {
        return;
    }
    if (!!languages && languages.length) {
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
