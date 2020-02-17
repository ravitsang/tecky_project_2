$(document).ready(function () {
    const search_btn = document.querySelector('#navbar-item-search-btn')
        .addEventListener('click', (event) => {
            const search_text = document.querySelector('.navbar-item-search-text');
            if (search_text.className === 'navbar-item-search-text') {
                document.querySelector('#navbar-item-search-btn').classList.add('show');
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



    document.querySelector('#navbar-item-search-text')
        .addEventListener('keyup', (event) => {
            const search_text = document.querySelector('#navbar-item-search-text');
            if (search_text.value !== '') {
                document.querySelector('#navbar-item-search-table').classList.add('show');
                document.querySelector('#navbar-item-search-table-userinput').innerHTML = `Search for '${search_text.value}'`;
            } else {
                document.querySelector('#navbar-item-search-table').classList.remove('show');
            }
        })
});