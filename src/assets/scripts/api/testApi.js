function apiGetTest() {
    let url = serverUrl + 'test';
    if (!!userCurrentGroup) {
        url += '?groupId=' + userCurrentGroup.id;
    }
    fetch(url, {
        headers: getAuthHeader(),
    })
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            resultGetTest(data);
            renderGetTest(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function apiSubmitAnswer() {
    let word = questionDiv.dataset.id;
    let answer = this.dataset.id;
    if (!(!!word && !!answer)) {
        location.reload();
    }
    let postData = new FormData;
    postData.append('wordId', word);
    postData.append('answerId', answer);
    let fetchData = {
        method: 'POST',
        headers: getAuthHeader(),
        body: postData
    }
    let url = serverUrl + 'test';
    fetch(url, fetchData)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            renderSubmitAnswer(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
