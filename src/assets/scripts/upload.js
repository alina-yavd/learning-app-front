const uploadForm = document.querySelector('#upload-form');
const LanguageSelects = document.querySelectorAll('.language-select');
document.addEventListener('DOMContentLoaded', function () {
    renderLanguageSelect();
    if (!!uploadForm) {
        uploadForm.addEventListener('submit', function (event) {
            event.preventDefault();
            uploadWords();
        })
    }
});

function uploadWords() {
    let formData = new FormData(uploadForm);
    let url = serverUrl + 'upload';
    let request = new Request(url, {
        method: 'POST',
        body: formData
    });
    fetch(request)
        .then((resp) => resp.json())
        .then(function (data) {
            let el = createNode('div', 'message-' + data.status);
            el.innerHTML = `${data.message}`;
            uploadForm.querySelector('.submit-btn').prepend(el);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function renderLanguageSelect() {
    if (LanguageSelects === null) {
        return;
    }
    let url = serverUrl + 'language/';
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            let languages = data.items;
            LanguageSelects.forEach(select => {
                languages.forEach(language => {
                    let option = createNode('option', '');
                    option.value = `${language.code}`;
                    option.innerHTML = `${language.name}`;
                    select.append(option);
                });
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
