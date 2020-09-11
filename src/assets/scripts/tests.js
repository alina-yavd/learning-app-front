"use strict";
let isDev = !window.location.hostname.includes('karumi');
// const serverUrl = isDev ? 'http://127.0.0.2:8000/api/' : 'https://learning-app.karumi.space/api/';
const serverUrl = 'https://127.0.0.1:8000/api/';
// tests
const questionDiv = document.querySelector('#question');
const answersDiv = document.querySelector('#answers');
const rightAnswerDiv = document.querySelector('#correctAnswer');
const resultsCountSpan = document.querySelector('.results-count span');
const groupNameDiv = document.querySelector('.current-source');
let resultsCountCorrect = parseInt(localStorage.getItem('resultsCountCorrect'));
let resultsCountAll = parseInt(localStorage.getItem('resultsCountAll'));
if (!Number.isInteger(resultsCountCorrect) || !Number.isInteger(resultsCountAll)) {
    localStorage.setItem('resultsCountCorrect', '0');
    localStorage.setItem('resultsCountAll', '0');
    resultsCountCorrect = parseInt(localStorage.getItem('resultsCountCorrect'));
    resultsCountAll = parseInt(localStorage.getItem('resultsCountAll'));
}
document.addEventListener('DOMContentLoaded', function () {
    showTest();
    if (!!resultsCountSpan) {
        resultsCountSpan.innerHTML = `${resultsCountCorrect}/${resultsCountAll}`;
    }
    document.querySelectorAll('.btn-next').forEach(item => {
        item.addEventListener('click', function () {
            showTest();
        });
    });
    document.querySelectorAll('.results-clear').forEach(item => {
        item.addEventListener('click', function () {
            clearTestProgress();
        });
    });

    if (!!localStorage.getItem('testGroup')) {
        let btn = createNode('span', 'btn-inline group-clear');
        btn.innerHTML = '<i class="far fa-times-circle"></i>';
        groupNameDiv.append(btn);
    }

    document.querySelectorAll('.group-clear').forEach(item => {
        item.addEventListener('click', function () {
            localStorage.removeItem('testGroup');
            location.reload();
        });
    });
});

function showTest() {
    if (answersDiv === null) {
        return;
    }
    let url = serverUrl + 'test';
    let group = parseInt(localStorage.getItem('testGroup'));
    if (!!group) {
        url += '?groupId=' + group;
    }
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            if (!!data.group) {
                groupNameDiv.querySelector('#group').innerHTML = data.group.name;
            }
            createAnswers(data);
        })
        .then(function () {
            answersDiv.querySelectorAll('.answer').forEach(item => {
                item.addEventListener('click', submitAnswer);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
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

function submitAnswer() {
    let word = questionDiv.dataset.id;
    let answer = this.dataset.id;
    if (!(!!word && !!answer)) {
        location.reload();
    }
    let postData = new FormData;
    postData.append('wordId', word);
    postData.append('answerId', answer);
    let fetchData = {
        headers: new Headers(),
        method: 'POST',
        body: postData
    }
    let url = serverUrl + 'test';
    fetch(url, fetchData)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            let answersText = [];
            data.word.translations.map(function (answer) {
                answersText.push(answer.text);
            });
            rightAnswerDiv.innerHTML = `${data.word.text} &mdash; ${answersText.join(' | ')}`;
            rightAnswerDiv.className = data.result;
            updateResultsCount(data.result);
        })
        .then(function () {
            showTest()
        })
        .catch(function (error) {
            console.log(error);
        });
}

function updateResultsCount(result) {
    resultsCountAll++;
    if (result) {
        resultsCountCorrect++;
    }
    resultsCountSpan.innerHTML = `${resultsCountCorrect}/${resultsCountAll}`;
    localStorage.setItem('resultsCountCorrect', resultsCountCorrect);
    localStorage.setItem('resultsCountAll', resultsCountAll);
}

function clearTestProgress() {
    localStorage.removeItem('testGroup');
    localStorage.removeItem('resultsCountCorrect');
    localStorage.removeItem('resultsCountAll');
    location.reload();
}

function createNode(element, className) {
    let el = document.createElement(element);
    el.className = className;
    return el;
}