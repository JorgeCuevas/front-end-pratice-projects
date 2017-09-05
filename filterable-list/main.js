let filterInput = document.getElementById('filterInput');
filterInput.addEventListener('keyup', filterByName);

function filterByName(e) {
    console.log('value right there' + e.target.value);
}

let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let contactList = document.querySelector('ul.collection');
let header = document.getElementById('header');
let item = document.getElementById('item');



function getAvatar(name){
    return (name.trim().length % 2 > 0) ? "img/avatar.png" : "img/avatar2.png" ;
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((users) => {

        for (let x = 0; alphabet.length > x; x++) {

            let headerClone = header.cloneNode(true);
            headerClone.textContent = alphabet[x];
            contactList.appendChild(headerClone);

            users.forEach(function (user) {
                if (user.name.startsWith(alphabet[x])) {
                    itemClone = item.cloneNode(true);
                    itemClone.innerHTML = `<img src="${getAvatar(user.name)}" alt="" class="circle" />
                                            <a href="">${user.name}</a>
                                            <p>${user.username}</p>
                                            <p>${user.email}</p>`;
                    contactList.appendChild(itemClone);
                }
            });

        }
        contactList.removeChild(header);
        contactList.removeChild(item);
    })
    .catch((err) => console.log(err));