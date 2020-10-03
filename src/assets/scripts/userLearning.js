const learningDiv = document.querySelector('#user-learning');

document.addEventListener('DOMContentLoaded', function () {
    if (!!learningDiv) {
        apiGetUserGroups();
    }
});

function resultGetUserGroups(data) {
    if (!!data.data) {
        let groups = [];
        data.data.forEach(item => {
            groups.push(item.id);
        });
        localData.set('userGroups', groups);
    } else {
        localData.remove('userGroups');
    }
}

function renderGetUserGroups(data) {
    createUserGroups(data.data);
}

function createUserGroups(groups) {
    if (!!groups) {
        learningDiv.innerHTML = '';
        let groupsEl = createNode('div', 'word-group');
        let groupsTitle = createNode('h2', 'user-groups-title');
        groupsTitle.innerHTML = 'Я изучаю:'
        groupsEl.append(groupsTitle);
        groups.forEach(group => {
            let groupEl = createGroup(group);
            groupsEl.append(groupEl);
        });
        learningDiv.append(groupsEl);
    }

    groupButtonsEvents();
}

function groupButtonsEvents() {
    const addUserGroupBtns = document.querySelectorAll('.btn-add-user-group');
    const removeUserGroupBtns = document.querySelectorAll('.btn-remove-user-group');

    if (!!addUserGroupBtns) {
        addUserGroupBtns.forEach(item => {
            item.addEventListener('click', apiAddUserGroup);
        });
    }

    if (!!removeUserGroupBtns) {
        removeUserGroupBtns.forEach(item => {
            item.addEventListener('click', apiRemoveUserGroup);
        });
    }
}
