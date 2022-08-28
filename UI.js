class UI {

    constructor(){
        this.profileContainer = document.querySelector(".profile-container");
        this.profile = document.getElementById("profile")
        this.reposContainer = document.querySelector("#repos");
        this.inputBox = document.querySelector("#search-input");
        this.historyListTag = document.querySelector("#history-list");
    }

    clearInput(){
        this.inputBox.value = '';
    }

    addSearchedUser(username){
        let users = Storage.getSearchedUsers();
        if(users.indexOf(username) === -1){
            const liTag = document.createElement("li");
            // adding class for style
            liTag.classList.add("searched-user");
            liTag.textContent = username;

            this.historyListTag.appendChild(liTag);          
        }
    }

    deleteAllSearchedUsersFromUI(){
        // removes first element childs from list until first child equals to null
        while(this.historyListTag.firstElementChild !== null) {
            this.historyListTag.removeChild(this.historyListTag.firstElementChild);
        }
    }


    showUserInfo(user){
        this.profile.innerHTML = `
      
<div class="profile-info">
 <a href="${user.html_url}" target = "_blank">
<img class="img-fluid" src="${user.avatar_url}"> </a> 

</div>

<div class="follow-buttons">
<div id="fullName"><strong>${user.name}</strong></div>

<div id="bio">${user.bio}</div>
<a href="${user.followers_url}"><button class="btn">
Followers  <span class="badge"> ${user.followers}</span> </button></a>
<a href="${user.following_url}"><button class="btn">
Following  <span class="badge">${user.following}</span></button></a>
<a href="${user.repos_url}"><button class="btn">
Repositories  <span class="badge">${user.public_repos}</span></button>
</a>

    
        <div class="list-group">
    <li class="list-group-item">
    <i class="fa-solid fa-building"></i>
    <span id="company">${user.company}</span>
    </li>

    <li class="list-group-item ">
    <i class="fa-solid fa-location-dot"></i>
    <span id = "location">${user.location}
    </li>

    <li class="list-group-item">
    <i class="fa-solid fa-envelope"></i>
    <span id="email">${user.email}</span>
    </li>
    </div>
</div>
                     
        `
    }


    showUserRepos(repos){
        this.reposContainer.innerHTML = "";

        repos.forEach(repo => {
             this.reposContainer.innerHTML +=
            `
            <div class="mb-2 card-body">
                       <div class="row">
                           <div class="col-md-2">
                           <a href="${repo.html_url}" target = "_blank" id = "repoName"><span>${repo.name}</span> </a>
                           
                           </div>
                           <div class="col-md-6">
                               <button class="btn btn-secondary">
                                   Stars  <span class="badge badge-light" id="repoStar">${repo.stargazers_count}
                                   </span>
                               </button>
       
                               <button class="btn btn-info">
                                   Forks  <span class="badge badge-light" id ="repoFork">${repo.forks_count}</span>
                               </button>
                       
                           </div>
                        </div>
       
            </div>
            `
        })
    }
}


