window.onload = async () => {


    const res = await fetch('/article/showTopic', {
        method: 'get'
    })
    const result = await res.json()


    console.log(result);
    // const articles = result.article[0]
    // console.log(articles);



    for (const article of articles) {

        const tagName = article.tag_name.toUpperCase();
        let articleCreateDate = article.created_at.split('T')[0];
        const month = new Date(articleCreateDate).toLocaleString("en-us", { month: "short" });
        articleCreateDate = month + ' ' + articleCreateDate.split('-')[2] + ', ' + articleCreateDate.split('-')[0]


        const html = /*html*/
            `<div class="col-9 center-left-item">
            <div class="center-left-type">BASED ON YOUR FAVOURITE TOPIC ${tagName}</div>
            <a class="center-left-title title" id=${article.article_id}>${article.title}</a>
            <div class="center-left-desc">The best code is no code at all.</div>
            <div class="center-left-user-blog">${article.author_name}</div>
            <div class="center-left-item-btn d-flex justify-content-between">
                <div class="center-left-date">${articleCreateDate}</div>
                <div class="d-flex">
                    <div class="center-left-bookmark"><i class="far fa-bookmark"></i></div>
                    <div class="center-left-ellipsis"><i class="fas fa-ellipsis-h"></i></div>
                </div>
            </div>
        </div>
        <div class="col-3 cemter-left-image">
            <img src="https://miro.medium.com/max/12000/0*Nm6YR258nleQ3_PN"">
        </div>`

        document.querySelector('#topic-article').innerHTML += html
    }

    const titles = document.querySelectorAll('.title');

    for (const title of titles) {
        title.addEventListener('click', async event => {
            console.log(event.target);
            const id = event.target.id;
            // await fetch(`/article/viewArticle?articleId=${id}`);
            window.location = `/m/viewArticle.html?articleId=${id}`
            // const result = await res.json();
            // console.log(result);
            // if (result){
            //     window.location = `/article/viewArticle?articleId=${id}`
            // }else {
            //     window.location = '/m'
            // }

        })

    }
}