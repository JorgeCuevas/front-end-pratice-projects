let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let contactList = document.getElementById('names');
let header = document.getElementById('header');
let item = document.getElementById('item');



function getAvatar(name) {
    return (name.trim().length % 2 > 0) ? "img/avatar.png" : "img/avatar2.png";
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((users) => {

        for (let x = 0; alphabet.length > x; x++) {

            let headerClone = header.cloneNode(true);
            headerClone.textContent = alphabet[x];
            contactList.appendChild(headerClone);

            users.forEach((user) =>{
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


let filterInput = document.getElementById('filterInput');
filterInput.addEventListener('keyup', filterByName);

function filterByName(e) {
    console.log('up up up')
    let filterValue = filterInput.value.toUpperCase();
    //get ul element
    let ul = document.getElementById('names');

    //get lis form ul
    let li = ul.querySelectorAll('li.collection-item');

    for (let x = 0; li.length > x; x++) {
        let a = li[x].getElementsByTagName('a')[0];
        if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            li[x].style.display = '';
        } else {
            li[x].style.display = 'none';
        }
    }

}