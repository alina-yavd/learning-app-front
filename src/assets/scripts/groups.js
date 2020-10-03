const wordsDiv = document.querySelector('#words');
const groupDiv = document.querySelector('#word-group');
const groupFilter = document.querySelector('.group-filter-form');
document.addEventListener('DOMContentLoaded', function () {
    apiGetGroups();
    if (groupDiv !== null) {
        apiGetGroup(groupDiv.dataset.id);
    }
    if (!!groupFilter) {
        groupFilter.addEventListener('submit', function (event) {
            event.preventDefault();
            let language = this.querySelector('select[name="original"]').value;
            let translation = this.querySelector('select[name="translation"]').value;
            apiGetGroups(language, translation);
        })
    }
});

function resultGetGroups(data) {
    localData.set('localGroups', data.data.map(function (group) {
        return {id: group.id, name: group.name, language: group.language};
    }));
}

function renderGetGroups(groups) {
    if (wordsDiv === null) {
        return;
    }

    wordsDiv.innerHTML = '';
    groups.map(function (group) {
        let groupEl = createGroup(group);
        wordsDiv.append(groupEl);
    });

    wordsButtonsEvents();
    groupButtonsEvents();
}

function renderGetGroup(group) {
    if (groupDiv === null) {
        return;
    }

    groupDiv.innerHTML = '';
    let groupEl = createGroup(group, false);
    let groupWords = createNode('div', 'group-words');
    groupEl.append(groupWords);
    groupDiv.append(groupEl);
    group.words.map(function (word) {
        let wordEl = createWord(word);
        groupEl.querySelector('.group-words').append(wordEl);
    })
    groupDiv.append(groupEl);

    wordsButtonsEvents();
    groupButtonsEvents();
}

function createGroup(group, link = true) {
    let groupEl = createNode('div', 'group');
    let groupTitle = createNode('div', 'group-title');
    let groupTitleHtml = `<div class="group-actions">`;

    let user = localData.forceget('user');
    let userGroups = localData.forceget('userGroups');
    if (!!user) {
        if (!!userGroups && userGroups.includes(group.id)) {
            groupTitleHtml += `<div class="btn-remove-user-group" data-id="${group.id}"><span class="btn btn-outline btn-remove-icon" title="Удалить группу с профиля"><i class="far fa-minus"></i></span></div>`;
        } else {
            groupTitleHtml += `<div class="btn-add-user-group" data-id="${group.id}"><span class="btn btn-outline btn-add-icon" title="Добавить группу в профиль"><i class="far fa-plus"></i></span></div>`;
        }
    }

    if (link) {
        groupTitleHtml += `<a class="group-name-wrap" href="/group/${group.id}">`;
    } else {
        groupTitleHtml += `<div class="group-name-wrap">`;
    }
    if (!!group.image) {
        groupTitleHtml += `<span class="group-image"><img src="${group.image}"></span>`;
    }
    groupTitleHtml += `<span class="group-name">${group.name}</span>`;
    if (link) {
        groupTitleHtml += `</a>`;
    } else {
        groupTitleHtml += `</div>`;
    }
    groupTitleHtml += `</div>`; // group-actions

    groupTitleHtml += `<div class="btns-wrap">`;

    if (!!group.progress) {
        groupTitleHtml += createProgressLine(Number(group.progress));
    }

    groupTitleHtml += `<div class="lang-flags-wrap">`;
    groupTitleHtml += `<span class="flag"><img src="/src/assets/images/flags/${group.language.code}.svg"></span>`;
    groupTitleHtml += `<span class="flag"><img src="/src/assets/images/flags/${group.translation.code}.svg"></span>`;
    groupTitleHtml += `</div>`;

    groupTitleHtml += `<div class="btn-test" data-group="${group.id}"><span class="btn btn-outline">Начать тест</span></div>`;
    if (!!user) {
        groupTitleHtml += `<div class="btn-delete-group" data-group="${group.id}"><span class="btn btn-outline btn-remove-icon" title="Удалить группу"><i class="far fa-times"></i></span></div>`;
    }
    groupTitleHtml += `</div>`;

    groupTitle.innerHTML = groupTitleHtml;
    groupEl.setAttribute('data-id', `${group.id}`);
    groupEl.append(groupTitle);
    return groupEl;
}

function resultDeleteGroup(data, id) {
    if (data.status === 'success') {
        document.querySelector('.group[data-id="' + id + '"]').remove();
    } else {
        alert(data.message);
    }
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
            let groups = localData.get('localGroups');
            let selectedGroup = groups.find(group => group.id === parseInt(this.dataset.group));
            if (selectedGroup === undefined) {
                selectedGroup = null;
            }
            localData.set('localGroup', selectedGroup);

            window.location.replace('/');
        });
    });
    document.querySelectorAll('.btn-delete-group').forEach(item => {
        item.addEventListener('click', function () {
            if (confirm('Вы точно хотите удалить группу?')) {
                apiDeleteGroup(this.dataset.group);
            }
        });
    });
}

function createProgressLine(progress) {
    let number = progress.toFixed(2);

    let progressEl = createNode('span', 'group-progress');
    let innerEl = createNode('span', 'progress-inner progress-' + getProgressLevel(number));
    let lineEl = createNode('span', 'line');

    lineEl.setAttribute('style', `width: ${number}%`);
    innerEl.innerHTML = `<span class="number">${number}%</span>`;
    innerEl.append(lineEl);
    progressEl.append(innerEl);

    return progressEl.outerHTML;
}

function getProgressLevel(number) {
    if (number < 25) {
        return 'low';
    } else if (number < 50) {
        return 'middle';
    } else if (number < 75) {
        return 'high';
    } else {
        return 'top';
    }
}