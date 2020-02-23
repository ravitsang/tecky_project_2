window.onload = async () => {


    const res = await fetch('/article/showTopic', {
        method: 'get'
    })
    const result = await res.json()


    const tagArticles = result.article;
    const allArticle = [];
    for (const tagArticle of tagArticles) {
        // console.log(tagArticle);
        for (const article of tagArticle) {
            if (article.photo === null) {
                article.photo = `<img src="./images/article_image.png">`;
            }
            allArticle.push(article);
        }
    }

    const topSection = document.querySelector('#top-section');
    // let articleCreateDate = tagArticles.created_at.split('T')[0];
    // const month = new Date(articleCreateDate).toLocaleString("en-us", { month: "short" });
    // articleCreateDate = month + ' ' + articleCreateDate.split('-')[2] + ', ' + articleCreateDate.split('-')[0]
    topSection.innerHTML = `<!-- Top left -->
        <div class="col-lg-5 col-md-6 col-12 top-left">
            <a href="/m/viewArticle.html?articleId=${allArticle[0].article_id}">
                <div class="top-left-image">
                  ${allArticle[0].photo}
                </div>
            </a>
            <div class="top-left-content">
                <a href="/m/viewArticle.html?articleId=${allArticle[0].article_id}">
                    <div class="top-left-title">
                        <h1>${allArticle[0].title}</h1>
                    </div>
                    <div class="top-left-desc"></div>
                </a>
                <div class="top-left-user-blog">${allArticle[0].author_name}</div>
                <div class="top-left-date">${new Date(allArticle[0].created_at.split('T')[0]).toLocaleString("en-us", { month: "short" })} ${allArticle[0].created_at.split('T')[0].split('-')[2]}, ${allArticle[0].created_at.split('T')[0].split('-')[0]}</div>
            </div>
        </div>
        <!-- Top center -->
        <div class="col-lg-4 col-6 top-center">
            <div class="row top-center-item">
                <div class="col-4 top-center-image">
                <a href="/m/viewArticle.html?articleId=${allArticle[1].article_id}">${allArticle[1].photo}</a>
                </div>
                <div class="col-8 top-center-content">
                   <div class="top-center-title"><a href="/m/viewArticle.html?articleId=${allArticle[1].article_id}">${allArticle[1].title}</a>
                    </div>
                    <div class="top-center-user-blog">${allArticle[1].author_name}</div>
                    <div class="top-center-date">${new Date(allArticle[1].created_at.split('T')[0]).toLocaleString("en-us", { month: "short" })} ${allArticle[1].created_at.split('T')[0].split('-')[2]}, ${allArticle[1].created_at.split('T')[0].split('-')[0]}</div>
                </div>
            </div>
            <div class=" row top-center-item">
                <div class="col-4 top-center-image">
                   <a href="/m/viewArticle.html?articleId=${allArticle[2].article_id}"> ${allArticle[2].photo}</a>
                </div>
                <div class="col-8 top-center-content">
                    <div class="top-center-title"><a href="/m/viewArticle.html?articleId=${allArticle[2].article_id}">${allArticle[2].title}</a>

                    </div>
                    <div class="top-center-user-blog">${allArticle[2].author_name}</div>
                    <div class="top-center-date">${new Date(allArticle[2].created_at.split('T')[0]).toLocaleString("en-us", { month: "short" })} ${allArticle[2].created_at.split('T')[0].split('-')[2]}, ${allArticle[2].created_at.split('T')[0].split('-')[0]}</div>
                </div>
            </div>
            <div class="row top-center-item">
                <div class="col-4 top-center-image">
                   <a href="/m/viewArticle.html?articleId=${allArticle[3].article_id}"> ${allArticle[3].photo}</a>
                </div>
                <div class="col-8 top-center-content">
                    <div class="top-center-title"><a href="/m/viewArticle.html?articleId=${allArticle[3].article_id}">${allArticle[3].title}</a>
                    </div>
                    <div class="top-center-user-blog">${allArticle[3].author_name}</div>
                    <div class="top-center-date">${new Date(allArticle[3].created_at.split('T')[0]).toLocaleString("en-us", { month: "short" })} ${allArticle[3].created_at.split('T')[0].split('-')[2]}, ${allArticle[3].created_at.split('T')[0].split('-')[0]}</div>
                </div>
            </div>
        </div>
        <!-- Top right -->
        <div class="col-lg-3 top-right ">
            <div class="top-right-image"><a href="/m/viewArticle.html?articleId=${allArticle[4].article_id}">${allArticle[4].photo}</a></div>
            <div class="top-right-content">
                <div class="top-right-title"><a href="/m/viewArticle.html?articleId=${allArticle[4].article_id}">${allArticle[4].title}</a></div>
                <div class="top-right-user-blog">${allArticle[4].author_name}</div>
                <div class="top-right-date">${new Date(allArticle[4].created_at.split('T')[0]).toLocaleString("en-us", { month: "short" })} ${allArticle[4].created_at.split('T')[0].split('-')[2]}, ${allArticle[4].created_at.split('T')[0].split('-')[0]}</div>
            </div>
        </div>
        <!-- Top bottom -->
        <div class="col-12 top-bottom ">
            <div class="top-bottom-btn"><a >SEE EDITOR’S PICKS <i class="fas fa-chevron-right"></i>
                </a></div>
        </div>`;



    for (let i = 5; i < allArticle.length; i++) {
        // console.log(article);
        const tagName = allArticle[i].tag_name.toUpperCase();
        
        const html = /*html*/
            `<div class="col-9 col-lg-9 center-left-item">
                <div class="center-left-type">BASED ON YOUR FAVOURITE TOPIC ${tagName}</div>
                <a href="/m/viewArticle.html?articleId=${allArticle[i].article_id}" class="center-left-title title" id=${allArticle[i].article_id}>${allArticle[i].title}</a>
                <div class="center-left-user-blog">${allArticle[i].author_name}</div>
                <div class="center-left-item-btn d-flex justify-content-between">
                    <div class="center-left-date">${new Date(allArticle[i].created_at.split('T')[0]).toLocaleString("en-us", { month: "short" })} ${allArticle[i].created_at.split('T')[0].split('-')[2]}, ${allArticle[i].created_at.split('T')[0].split('-')[0]}</div>
                    <div class="d-flex">
                        <div class="center-left-bookmark"><i id="${allArticle[i].article_id}" class="far fa-bookmark"></i></div>
                        <div class="center-left-ellipsis"><i class="fas fa-ellipsis-h"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-3 col-lg-3 center-left-image">
            <a href="/m/viewArticle.html?articleId=${allArticle[i].article_id}" class="center-left-title title">${allArticle[i].photo}</a>
            </div>`

        document.querySelector('#topic-article').innerHTML += html

    }


    const bookmarks = document.querySelectorAll('.center-left-bookmark');

    for (const bookmark of bookmarks) {
        bookmark.addEventListener('click', async event => {
            console.log(event.target);
            const articleId = event.target.id;
            console.log(articleId);
            // console.log(bookmark.firstChild);
            // console.log(bookmark.firstChild.class);
    
     
            const bookmarked = document.querySelector('.fa-bookmark').classList.contains('fas');
            console.log(bookmarked);
            if(bookmarked){
                document.querySelector('.fa-bookmark').classList.add('far');
                document.querySelector('.fa-bookmark').classList.remove('fas')
                bookmark.innerHTML = `<i id="${articleId}" class="far fa-bookmark"></i>`
            }else{
                document.querySelector('.fa-bookmark').classList.add('fas');
                document.querySelector('.fa-bookmark').classList.remove('far')
                bookmark.innerHTML = `<i id="${articleId}" class="fas fa-bookmark"></i>`
            }

           
            const res = await fetch(`/article/${articleId}/${bookmarked}`);

            
            console.log(await res.json());
            // if (result.success){
            //     console.log(event.target);


            // }


        })

    }
}