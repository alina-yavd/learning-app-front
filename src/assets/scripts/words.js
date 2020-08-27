const wordsDiv = document.querySelector('#words');
document.addEventListener('DOMContentLoaded', function () {
    showWords();
});

function showWords() {
    if (wordsDiv === null) {
        return;
    }
    let url = serverUrl + 'word/?group=true';
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            wordsDiv.innerHTML = '';
            let words = data.items;
            let groups = data.groups;
            return groups.map(function (group) {
                let groupEl = createWordsGroup(group);
                words[group.id].map(function (word) {
                    let wordEl = createWord(word);
                    groupEl.querySelector('.group-words').append(wordEl);
                })
            });
        })
        .then(function () {
            goToTest();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function createWordsGroup(group) {
    let groupEl = createNode('div', 'group');
    let groupTitle = createNode('div', 'group-title');
    let groupWords = createNode('div', 'group-words');
    groupTitle.innerHTML = `<span class="group-name">${group.name}</span><div class="btn-test" data-group="${group.id}"><span class="btn btn-outline">Начать тест</span></div>`;
    groupEl.setAttribute('data-id', `${group.id}`);
    wordsDiv.append(groupEl);
    groupEl.append(groupTitle);
    groupEl.append(groupWords);
    return groupEl;
}

function createWord(word) {
    let wordEl = createNode('div', 'word');
    wordEl.innerHTML = `${word.text}`;
    wordEl.setAttribute('data-id', `${word.id}`);
    return wordEl;
}

function goToTest() {
    document.querySelectorAll('.btn-test').forEach(item => {
        item.addEventListener('click', function () {
            localStorage.setItem('testGroup', this.dataset.group);
            window.location.replace('/');
        });
    });
}