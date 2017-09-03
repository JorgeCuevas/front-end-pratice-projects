document.querySelector("#textBtn").addEventListener("click", getText);
document.querySelector("#jsonBtn").addEventListener("click", getJson);
document.querySelector("#restBtn").addEventListener("click", getRest);

var display = document.getElementById('output');
let postForm = document.querySelector('#postForm');


postForm.addEventListener('submit', sendPost);

let divJson = document.getElementById('outJson');

function getText() {
        fetch('./resources/text-file.txt')
        .then((res) => res.text())
        .then((data) => {
            display.textContent = data;
        })
        .catch((err) => console.log(err));

}


function getJson(){
    fetch('./resources/data.json')
    .then((res) => res.json())
    .then((json) => {
       display.innerHTML = `
                    <ul class="list-group mb-3">
                    <li class="list-group-item" ><b>Name:</b> ${json.name}</li>
                    <li class="list-group-item" ><b>Last Name:</b> ${json.lastName}</li>
                    </ul>
       `;

    }).catch((err) => console.log(err));

}

function getRest(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((posts) =>{
        display.innerHTML = '';
        posts.forEach((post) => {
            display.innerHTML +=`
                   <div class="card card-body mb-3"> 
                    
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                    
                   </div> 
            `;

        });

    })
    .catch((err) => console.log(err));

}

function sendPost(e) {
    e.preventDefault();
    let title = postForm.querySelector('#title').value;
    let body = postForm.querySelector('#body').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify({
            title:title,
            body:body 
        })
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
    

}