window.onload = async () =>{

    const url = window.location.search;
   
    const id = parseInt(url.split('=')[1]);

    
    const res = await fetch(`/article/viewArticle?articleId=${id}`)

    const result = await res.json();

        
    console.log(result);

    console.log(result.article[0]);


    document.querySelector('.title').innerHTML = result.article[0].title;
    document.querySelector('.content').innerHTML = result.article[0].content;

}