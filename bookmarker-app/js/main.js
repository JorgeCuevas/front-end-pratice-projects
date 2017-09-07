

document.getElementById('myForm').addEventListener('submit', bookMark);
let bookmarks = [];

function bookMark(e) {
    e.preventDefault();
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    let bookMark = {
        name: siteName,
        url: siteUrl
    }

    if (localStorage.getItem('bookmarks') == null) {
        bookmarks.push(bookMark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookMark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    document.forms['myForm'].reset();
    fetchBookMarks();
}

function deleteBookMark(url) {
     bookmarks = JSON.parse(localStorage.getItem('bookmarks'));    
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url.trim() == url.trim()) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookMarks();
}

function fetchBookMarks() {
     bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let bookmarksResults = document.querySelector('#bookmarksResults');
    bookmarksResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML +=
            `<div class="card card-outline-primary mb-3 text-center">
                                <div class="card-block">
                                    <blockquote class="card-blockquote">
                                    <h3>${name}</h3>
                                    <a href="${url}"  target=" _blank" class="btn btn-outline-success" >View</a>
                                    <button onclick="deleteBookMark('${url}')"  id="btnDelete" class="btn btn-outline-danger" >Delete</button>
                                    
                                    </blockquote>
                                </div>
                                </div>`;
    }

}

function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl){
        alert('Please , fill in the form');
        return false;
    }

    
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
            alert('Please, use a valid url')
            return false;
    }
        return true;
}

