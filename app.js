// selecting required elements
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const clearButton = document.getElementById("clear-button");
const historyList = document.getElementById("history-list");

// creating required objects
const api = new Github();
const ui = new UI();

// calling eventlisteners function
eventListeners();

// all eventlisteners
function eventListeners(){
    searchForm.addEventListener("submit", getFormData);
    clearButton.addEventListener("click", clearHistory);
    document.addEventListener("DOMContentLoaded", getHistory);
}

// with form submit, gets all form informations
function getFormData(e){
    let username = searchInput.value.trim();

    // checking for if input value is null
    if(username == '' || username === null) return;

    // sending username to github module 
    api.getDataFromGithubAPI(username)
    .then(response =>{
        if (response.user.message === 'Not Found') {
            alert("User Not Found");
        }else {
            ui.addSearchedUser(username);
            Storage.addSearchedUsers(username);
            ui.showUserInfo(response.user);
            ui.showUserRepos(response.repos);
        }
    })
    .catch(error => alert(error));

    ui.clearInput();
    e.preventDefault();
}

// clears recent searches
function clearHistory(){
    if(confirm("You are about to clear history. Are you sure?")) {
        // first clear the local storage
        Storage.deleteAllSearchedUsers();
        // then clears from ui
        ui.deleteAllSearchedUsersFromUI();
    }


}

// when page has loaded, gets all recent searches from storage 
function getHistory(){
    let users = Storage.getSearchedUsers();
    let text = '';

    users.forEach(user => {
        text += `<Li class="searched-user">${user}</Li>`
    })

    historyList.innerHTML = text;
}
