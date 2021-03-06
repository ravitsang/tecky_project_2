$(document).ready(async function () {
    const res = await fetch('/api/v1/userInfo');
    const result = await res.json();
    // console.log(result);
    const name = document.querySelector('#userinfo-table-name').innerHTML = result.name;
    const username = document.querySelector('#userinfo-table-username').innerHTML = `@${result.email.split('@')[0]}`;
    if (result.photo !== null) {
        const photo = document.querySelector('#userinfo-table-photo').src = result.photo;
    }


    // Search Table Display
    const search_btn = document.querySelector('#navbar-item-search-btn')
        .addEventListener('click', (event) => {
            const search_text = document.querySelector('.navbar-item-search-text');
            if (search_text.className === 'navbar-item-search-text') {
                document.querySelector('#navbar-item-search-btn').classList.add('show');
                document.querySelector('#navbar-item-bell-table').classList.remove('show');
                document.querySelector('#navbar-item-userinfo-table').classList.remove('show');
                setTimeout(() => {
                    document.querySelector('.navbar-item-search-text').classList.add('show');
                    document.getElementById('navbar-item-search-text').focus();

                }, 505)
            } else {
                document.querySelector('.navbar-item-search-text').classList.remove('show');
                document.getElementById('navbar-item-search-text').blur();
                document.querySelector('#navbar-item-search-btn').classList.remove('show');
            }
        })

    let timeout;
    // Search Data from Server
    document.querySelector('#navbar-item-search-text')
        .addEventListener('keyup', async (event) => {
            clearTimeout(timeout);
            timeout = setTimeout(function(){
                search();
            },1000);
            async function search(){

                const search_text = document.querySelector('#navbar-item-search-text');
                if (search_text.value !== '') {
                    const res = await fetch(`/api/v1/search?q=${search_text.value}`)
                    const result = await res.json();
                    const search_table = document.querySelector('#navbar-item-search-table-display');
                    search_table.innerHTML = ``;
                    const tags = result[0];
                    const users = result[1];
                    const articles = result[2];
                    // console.log(articles);
                    if (users.user !== null) {
                        search_table.innerHTML += `<div class="navbar-item-search-table-item" id="peoples">
                        <div class="navbar-item-search-table-Title">
                            PEOPLE
                        </div>
                        <ul class="navbar-item-search-table-users">
                            `;
                        for (let i = 0; i < users.user.length; i++) {
                            search_table.innerHTML += `<a >
                                <li class="navbar-item-search-table-user"><img
                                        src="./images/1_dmbNkD5D-u45r44go_cf0g.png"> ${users.user[i].name}</li>
                            </a>`;
                        }
                        search_table.innerHTML += `</ul>
                            </div>`;
                    }
    
                    if (articles.article !== null) {
                        search_table.innerHTML += `<div class="navbar-item-search-table-item" id="publications">
                        <div class="navbar-item-search-table-Title">
                            PUBLICATIONS
                        </div>
                        <ul class="navbar-item-search-table-users">
                            `;
                        for (let i = 0; i < articles.article.length; i++) {
                            let articleTitle = articles.article[i].title;
                            let photo = articles.article[i].photo;
                            if (articleTitle.length > 18) {
                                articleTitle = `${articles.article[i].title.substr(0, 18)} ...`;
                            }
                            if (!photo) {
                                photo = `<img src="./images/article_image.png">`;
                            }
                            search_table.innerHTML += `<a href="/m/viewArticle.html?articleId=${articles.article[i].id}">
                                <li class="navbar-item-search-table-user publication">${photo} ${articleTitle}</li>
                            </a>`;
                        }
                        search_table.innerHTML += `</ul>
                            </div>`;
                    }
                    if (tags.tag !== null) {
                        search_table.innerHTML += `<div class="navbar-item-search-table-item" id="tags">
                        <div class="navbar-item-search-table-Title">
                            TAGS
                        </div>
                        <ul class="navbar-item-search-table-users">
                            `;
                        for (let i = 0; i < tags.tag.length; i++) {
                            search_table.innerHTML += `<a >
                                <li class="navbar-item-search-table-user"><i class="fas fa-tag"></i> ${tags.tag[i].name}</li>
                            </a>`;
                        }
                        search_table.innerHTML += `</ul>
                            </div>`;
                    }
    
                    document.querySelector('#navbar-item-search-table').classList.add('show');
                    document.querySelector('#navbar-item-search-table-userinput').innerHTML = `Search for '${search_text.value}'`;
                } else {
                    document.querySelector('#navbar-item-search-table').classList.remove('show');
                }
            }
        })

    // Notifications Table Display
    document.querySelector('#navbar-item-bell-btn')
        .addEventListener('click', () => {
            const bell_table = document.querySelector('#navbar-item-bell-table');
            if (bell_table.className === 'navbar-item-bell-table fixed-top') {
                document.querySelector('#navbar-item-bell-table').classList.add('show');
                document.querySelector('.navbar-item-search-text').classList.remove('show');
                document.querySelector('#navbar-item-search-btn').classList.remove('show');
                document.querySelector('#navbar-item-search-table').classList.remove('show');
                document.querySelector('#navbar-item-userinfo-table').classList.remove('show');
            } else {
                document.querySelector('#navbar-item-bell-table').classList.remove('show');
            }
        })


    // User Info Table Display
    document.querySelector('#navbar-item-userinfo-btn')
        .addEventListener('click', () => {
            const userinfo_table = document.querySelector('#navbar-item-userinfo-table');
            if (userinfo_table.className === 'navbar-item-userinfo-table fixed-top') {
                document.querySelector('.navbar-item-userinfo-table').classList.add('show');
                document.querySelector('#navbar-item-bell-table').classList.remove('show');
                document.querySelector('.navbar-item-search-text').classList.remove('show');
                document.querySelector('#navbar-item-search-btn').classList.remove('show');
                document.querySelector('#navbar-item-search-table').classList.remove('show');
            } else {
                document.querySelector('#navbar-item-userinfo-table').classList.remove('show');
            }
        })
});