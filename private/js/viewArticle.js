window.onload = async () =>{

    const url = window.location.search;
   
    const id = parseInt(url.split('=')[1]);

    
    const res = await fetch(`/article/viewArticle?articleId=${id}`)

    const result = await res.json();

        
    console.log(result);

    console.log(result.article[0]);

    let photo = result.article[0].content.split('</noscript>')[0].split('<noscript>')[1];

    
    if (!photo){
        photo = "";
    }

    document.querySelector('.title').innerHTML = result.article[0].title;
    document.querySelector('.photo').innerHTML = photo;
    document.querySelector('.content').innerHTML = result.article[0].content;

}