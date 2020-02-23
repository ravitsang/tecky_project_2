window.onload=()=>{

    async function userArticleList(){
        const res = await fetch('/article/getUserArticles')
        const result = await res.json()
        console.log(result.article)

        // const articleList = document.querySelector('#showYourOwnArticles')
        // articleList.innerHTML = "";
        // console.log(userArticles.title)
    }
    userArticleList()
}