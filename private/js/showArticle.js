window.onload = async () => {


    const res = await fetch('/article/showTopic', {
        method: 'get'
    })
    const result = await res.json()


    console.log(result);
    const tagArticles = result.article



    for (const tagArticle of tagArticles) {
        console.log(tagArticle);
        for (const article of tagArticle) {
            console.log(article.content);
            const tagName = article.tag_name.toUpperCase();

            let articleCreateDate = article.created_at.split('T')[0];
            const month = new Date(articleCreateDate).toLocaleString("en-us", { month: "short" });
            articleCreateDate = month + ' ' + articleCreateDate.split('-')[2] + ', ' + articleCreateDate.split('-')[0]

            if (!article.photo) {
                article.photo = "";
            }

            const html = /*html*/
                `<div class="col-9 center-left-item">
                <div class="center-left-type">BASED ON YOUR FAVOURITE TOPIC ${tagName}</div>
                <a href="/m/viewArticle.html?articleId=${article.article_id}" class="center-left-title title" id=${article.article_id}>${article.title}
                <div class="center-left-desc">The best code is no code at all.</div></a>
                <div class="center-left-user-blog">${article.author_name}</div>
                <div class="center-left-item-btn d-flex justify-content-between">
                    <div class="center-left-date">${articleCreateDate}</div>
                    <div class="d-flex">
                        <div class="center-left-bookmark"><i id="${article.article_id}" class="far fa-bookmark"></i></div>
                        <div class="center-left-ellipsis"><i class="fas fa-ellipsis-h"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-3 cemter-left-image">
                ${article.photo}
            </div>`

            document.querySelector('#topic-article').innerHTML += html







        }

    }

    const bookmarks = document.querySelectorAll('.center-left-bookmark');

    for (const bookmark of bookmarks) {
        bookmark.addEventListener('click', async event => {
            console.log(event.target);
            const articleId = event.target.id;
            console.log(articleId);
            const result = await fetch(`/article/${articleId}`);

            if (result.success){
                console.log(event.target);


            }


        })

    }
}