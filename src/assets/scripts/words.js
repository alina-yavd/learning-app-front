const wordsDiv = document.querySelector('#words');
document.addEventListener('DOMContentLoaded', function () {
    showWords();
});

function showWords() {
    if (wordsDiv === null) {
        return;
    }
    let url = serverUrl + 'word/group';
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            wordsDiv.innerHTML = '';
            let groups = data.items;
            return groups.map(function (group) {
                let groupEl = createWordsGroup(group);
                group.words.map(function (word) {
                    let wordEl = createWord(word);
                    groupEl.querySelector('.group-words').append(wordEl);
                })
            });
        })
        .then(function () {
            wordsButtonsEvents();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function createWordsGroup(group) {
    let groupEl = createNode('div', 'group');
    let groupTitle = createNode('div', 'group-title');
    let groupWords = createNode('div', 'group-words');
    let groupTitleHtml = `<div class="group-name-wrap">`;
    if (!!group.image) {
        groupTitleHtml += `<span class="group-image"><img src="${group.image}"></span>`;
    }
    groupTitleHtml += `<span class="group-name">${group.name}</span>`;
    groupTitleHtml += `</div><div class="btns-wrap">`;
    groupTitleHtml += `<div class="btn-test" data-group="${group.id}"><span class="btn btn-outline">Начать тест</span></div>`;
    groupTitleHtml += `<div class="btn-delete-group" data-group="${group.id}"><span class="btn btn-outline" title="Удалить группу"><i class="far fa-times"></i></span></div>`;
    groupTitleHtml += `</div>`;
    groupTitle.innerHTML = groupTitleHtml;
    groupEl.setAttribute('data-id', `${group.id}`);
    wordsDiv.append(groupEl);
    groupEl.append(groupTitle);
    groupEl.append(groupWords);
    return groupEl;
}

function deleteGroup(id) {
    let url = serverUrl + 'word/group/' + id;
    let postData = new FormData;
    let fetchData = {
        headers: new Headers(),
        method: 'DELETE',
        body: postData
    }
    fetch(url, fetchData)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            if (data.status === 'success') {
                document.querySelector('.group[data-id="' + id + '"]').remove();
            } else {
                alert(data.message);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function createWord(word) {
    let wordEl = createNode('div', 'word');
    wordEl.innerHTML = `${word.text}`;
    wordEl.setAttribute('data-id', `${word.id}`);
    return wordEl;
}

function wordsButtonsEvents() {
    document.querySelectorAll('.btn-test').forEach(item => {
        item.addEventListener('click', function () {
            localStorage.setItem('testGroup', this.dataset.group);
            window.location.replace('/');
        });
    });
    document.querySelectorAll('.btn-delete-group').forEach(item => {
        item.addEventListener('click', function () {
            if (confirm('Вы точно хотите удалить группу?')) {
                deleteGroup(this.dataset.group);
            }
        });
    });
}