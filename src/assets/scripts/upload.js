const uploadForm = document.querySelector('#upload-form');

document.addEventListener('DOMContentLoaded', function () {
    if (!!uploadForm) {
        uploadForm.addEventListener('submit', function (event) {
            event.preventDefault();
            apiUploadWords();
        })
    }
});

function resultUploadWords(data) {
    let el = createNode('div', 'message-' + data.status);
    el.innerHTML = `${data.message}`;
    uploadForm.querySelector('.submit-btn').prepend(el);
}
