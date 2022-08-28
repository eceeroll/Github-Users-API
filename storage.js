class Storage {


    static getSearchedUsers(){
        let users;

        if(localStorage.getItem("searched") === null)
        users = [];

        else 
        users = JSON.parse(localStorage.getItem("searched"));

        return users;
    }

    static addSearchedUsers(username){
        // getting users array 
        let users = this.getSearchedUsers();

        // check for if username already added to local storage with index of  
        if(users.indexOf(username) === -1){
            users.push(username);
        }

        localStorage.setItem("searched",JSON.stringify(users));

    }

    static deleteAllSearchedUsers(){

        // clear items which has searched key
        localStorage.removeItem("searched");
    }

}