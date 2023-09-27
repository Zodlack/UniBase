
let postData = []; // задаем пустой массив, куда закинем json-объект

//запрашиваем  у сервера информацию , которую поместим в отрисованную таблицу
function getPosts(){
    const url = 'https://jsonplaceholder.typicode.com/posts';
    fetch(url)
    .then(response => response.json()) // response.json() один из методов чтения ответа
    .then(json => {
        postData = json;
        displayPostsInTable();
    })
    .catch(error => console.log(error.message));
    
}
getPosts(); 


// создвем тело таблицы и помещем в body
function displayPostsInTable(){
    const table = document.getElementById('postsTable');


    /**
     * По клику на заголвки таблицы производим вызывов функции sortTable
     * Помещаем информацию , полученную от сервера, в tbody таблицы
    */ 
    table.innerHTML = `
        <thead>
            <tr>
                <th onclick ="sortTable('userId')">User ID </th>
                <th onclick ="sortTable('id')">ID</th>
                <th onclick ="sortTable('title')">Title</th>
                <th onclick ="sortTable('body')">Body</th>
            </tr>
        </thead>
        <tbody>
        ${postData.map(item => `
            <tr>
                <td>${item.userId}</td>
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td>${item.body}</td>
            </tr>
        `).join('')}
        </tbody>
    `

    document.body.appendChild(table); //сделать table дочернем элементом body(поместить в body

}

// сортируем по возрастанию и убыванию информацию в колонках
function sortTable(columnName){
    postData.sort((a, b) => a[columnName] > b[columnName] ? 1 : -1);
    displayPostsInTable();
}


// условие для ввода слов в input
const searchInput = document.getElementById('searchInput').addEventListener('input', function(){
    if(this.value.length >= 3){
        searchTable();               // если условие саблюдино , то запускаем функцию по проверки наличия ,вводимых нами,слов в таблице
    }
    if(this.value.length === 0){
        getPosts();                  // таблица возвращается к исходному состаянию, после удаления слов в поле ввода input 
    }
})

// поиск ключевых слов в нашей таблице
function searchTable(){
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase(); // сделаем ввод текста в нижнем регистре

    const filteredPost = postData.filter(post => post.title.toLowerCase().includes(searchTerm) || 
    post.body.toLowerCase().includes(searchTerm)); // делаем проверку наличия ,вводимых нами в input, слов в массиве postData.

    postData = filteredPost;

    displayPostsInTable();
}
