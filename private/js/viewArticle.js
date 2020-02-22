window.onload = async () =>{

    const url = window.location.search;
   
    const id = parseInt(url.split('=')[1]);

    
    const res = await fetch(`/article/viewArticle?articleId=${id}`)

    const result = await res.json();

    // if (result){



    // }
    
    // console.log(result);






}