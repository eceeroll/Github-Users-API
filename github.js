class Github {

    constructor(){
        this.url = `https://api.github.com/users/`;
    }

    async getDataFromGithubAPI(username){
        const responseUser = await fetch(this.url + username);
        const responseRepos = await fetch(this.url + username + '/repos');

        if(responseUser.status === 200 && responseRepos.status === 200){

            const userData = await responseUser.json();
            const reposData = await responseRepos.json();

            // returning datas as an object
            return {
                user: userData,
                repos: reposData
            }

        }

        throw new Error("ERROR: ", responseUser.status, responseRepos.status);

    }

}

