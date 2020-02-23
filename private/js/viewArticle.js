window.onload = async () => {

    const url = window.location.search;

    const id = parseInt(url.split('=')[1]);


    const res = await fetch(`/article/viewArticle?articleId=${id}`)

    const result = await res.json();


    console.log(result);

    // console.log(result.article[0]);
    // console.log(result.authorName);

    const article = result.article[0];

    let articleCreateDate = article.created_at.split('T')[0];
    const month = new Date(articleCreateDate).toLocaleString("en-us", { month: "short" });
    articleCreateDate = month + ' ' + articleCreateDate.split('-')[2] + ', ' + articleCreateDate.split('-')[0]


    let photo = article.content.split('</noscript>')[0].split('<noscript>')[1];


    if (!photo) {
        photo = "";
    }
    if (result.authorName.authorPhoto === null) {
        result.authorName.authorPhoto = `<img src="./images/1_dmbNkD5D-u45r44go_cf0g.png">`;
    }


    document.querySelector('.title').innerHTML = article.title;
    document.querySelector('.article-details').innerHTML = `               
    <div class="article-image">${result.authorName.authorPhoto}</div>
    <div class="article-details">
        <div class="article-user">
            <div class="article-authorName">${result.authorName.authorName}</div>
        </div>
        <div class="article-detail d-flex">
            <div class="article-date">${articleCreateDate}</div>
            <div class="article-readtime">${article.reading_time} min read</div>
        </div>
    </div>`;
    document.querySelector('.photo').innerHTML = photo;
    document.querySelector('.content').innerHTML = article.content;

}