document.addEventListener('DOMContentLoaded', function () {
    apiGetTest();

    if (!!resultsCountSpan) {
        resultsCountSpan.innerHTML = `${resultsCountCorrect}/${resultsCountAll}`;
    }

    document.querySelectorAll('.btn-next').forEach(item => {
        item.addEventListener('click', function () {
            apiGetTest();
        });
    });

    document.querySelectorAll('.results-clear').forEach(item => {
        item.addEventListener('click', function () {
            clearTestProgress();
        });
    });

    if (!!groupNameDiv && !!localData.get('localGroup')) {
        let btn = createNode('span', 'btn-inline group-clear');
        btn.innerHTML = '<i class="far fa-times-circle"></i>';
        groupNameDiv.append(btn);
    }

    document.querySelectorAll('.group-clear').forEach(item => {
        item.addEventListener('click', function () {
            localData.remove('localGroup');
            localData.remove('localLanguage');
            location.reload();
        });
    });
});


function resultGetTest(data) {
    if (!!data.group) {
        localData.set('localGroup', data.group);
    }
}

function renderGetTest(data) {
    if (!!data.group && groupNameDiv !== null) {
        let groupEl = createNode('a', 'group-name');
        groupEl.setAttribute('href', '/group/' + data.group.id);
        groupEl.innerHTML = data.group.name;
        groupNameDiv.querySelector('#group').innerHTML = '';
        groupNameDiv.querySelector('#group').append(groupEl);
    }
    if (answersDiv !== null) {
        createAnswers(data);
        answersDiv.querySelectorAll('.answer').forEach(item => {
            item.addEventListener('click', apiSubmitAnswer);
        });
        answerSubmitBtnDiv.innerHTML = '<div class="btn-next"><span class="btn btn-bg btn-icon btn-icon-right">Следующий вопрос</span></div>';
        answerSubmitBtnDiv.querySelector('.btn-next').addEventListener('click', function () {
            apiGetTest();
        });
    }
}

function createAnswers(data) {
    let question = data.word;
    questionDiv.innerHTML = `${question.text}`;
    questionDiv.setAttribute('data-id', `${question.id}`);
    answersDiv.innerHTML = '';
    let answers = data.answers;
    return answers.map(function (answer) {
        let el = createNode('div', 'answer');
        el.innerHTML = `${answer.text}`;
        el.setAttribute('data-id', `${answer.id}`);
        answersDiv.prepend(el);
    })
}

function renderSubmitAnswer(data) {
    let answersText = [];
    data.word.translations.map(function (answer) {
        answersText.push(answer.text);
    });
    rightAnswerDiv.innerHTML = `${data.word.text} &mdash; ${answersText.join(' | ')}`;
    rightAnswerDiv.className = data.result;
    updateResultsCount(data.result);
    apiGetTest();
}

function updateResultsCount(result) {
    resultsCountAll++;
    if (result) {
        resultsCountCorrect++;
    }
    resultsCountSpan.innerHTML = `${resultsCountCorrect}/${resultsCountAll}`;
    localData.set('resultsCountCorrect', resultsCountCorrect);
    localData.set('resultsCountAll', resultsCountAll);
}

function clearTestProgress() {
    localData.remove('resultsCountCorrect');
    localData.remove('resultsCountAll');
    location.reload();
}

function createNode(element, className) {
    let el = document.createElement(element);
    el.className = className;
    return el;
}