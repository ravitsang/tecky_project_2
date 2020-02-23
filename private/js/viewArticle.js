window.onload = async () =>{

    const url = window.location.search;
   
    const id = parseInt(url.split('=')[1]);

    
    const res = await fetch(`/article/viewArticle?articleId=${id}`)

    const result = await res.json();

        
    console.log(result);

    console.log(result.article[0]);
    console.log(result.authorName);

    const article = result.article[0];

    let articleCreateDate = article.created_at.split('T')[0];
    const month = new Date(articleCreateDate).toLocaleString("en-us", { month: "short" });
    articleCreateDate = month + ' ' + articleCreateDate.split('-')[2] + ', ' + articleCreateDate.split('-')[0]


    let photo = article.content.split('</noscript>')[0].split('<noscript>')[1];

    
    if (!photo){
        photo = "";
    }



    document.querySelector('.title').innerHTML = article.title;
    document.querySelector('.user').innerHTML += result.authorName;
    document.querySelector('.article-details').innerHTML += articleCreateDate;
    document.querySelector('.article-details').innerHTML += ` ${article.reading_time} min read`;
    document.querySelector('.photo').innerHTML = photo;
    document.querySelector('.content').innerHTML = article.content;

}