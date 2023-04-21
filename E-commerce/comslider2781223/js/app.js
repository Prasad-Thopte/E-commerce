async function getUsers() {
    let url = 'js/users.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
async function renderUsers() {
    let users = await getUsers();
    let html = '';
    users.forEach(user => {
        let htmlSegment = `<div class="user">
                            <img src="${user.profileURL}" >
                            <h2>${user.firstName} ${user.lastName}</h2>
                            <div class="email"><a href="email:${user.email}">${user.email}</a></div>
                        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
}

renderUsers();


const ul = document.getElementsByClassName('container'),
      url = "js/users.json";

const createNode = (element) => { return document.createElement(element); }
const append = (parent, el) => { return parent.appendChild(el); }

fetch(url)
  .then((response) => { return response.json(); })
  .then( data => {
    let runners = data.results; 
    return runners.map( runner => { 
      let li = createNode('li'), 
          img = createNode('img'),
          span = createNode('span');
      img.src = runner.picture.medium;  
      span.innerHTML = `${runner.name.first} ${runner.name.last}`; 
      append(li, img); 
      append(li, span);
      append(ul, li);
    });
  })
  .catch( error => { console.log(error); })