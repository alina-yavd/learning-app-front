"use strict";

/*
Environment
 */
const localData = localDataStorage('learning')
let isDev = !window.location.hostname.includes('karumi');
const serverUrl = isDev ? 'https://127.0.0.1:8001/api/' : 'https://learning-api.karumi.space/api/';

/*
Variables
 */
const questionDiv = document.querySelector('#question');
const answersDiv = document.querySelector('#answers');
const rightAnswerDiv = document.querySelector('#correctAnswer');
const answerSubmitBtnDiv = document.querySelector('.question-buttons');
const resultsCountSpan = document.querySelector('.results-count span');
const groupNameDiv = document.querySelector('.current-source');
let resultsCountCorrect = localData.get('resultsCountCorrect');
let resultsCountAll = localData.get('resultsCountAll');

if (!Number.isInteger(resultsCountCorrect) || !Number.isInteger(resultsCountAll)) {
    localData.set('resultsCountCorrect', 0);
    localData.set('resultsCountAll', 0);
    resultsCountCorrect = localData.get('resultsCountCorrect');
    resultsCountAll = localData.get('resultsCountAll');
}
let userCurrentGroup = localData.get('localGroup');
