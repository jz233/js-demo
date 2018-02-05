// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

let db;

window.onload = function() {

  // 打开或新建一个数据库的[异步请求]，名字notes，版本号1
  let request = window.indexedDB.open('notes', 1);

  request.onerror = function(){
    console.log('Db failed to open')
  }
  request.onsuccess = function(){
    console.log('Db opened successfully')

    db = request.result
    displayData()
  }

  // 当数据库第一次创建，或者版本号大于之前时调用
  request.onupgradeneeded = function(e) {
    //we need to do this separately here because the onupgradeneeded handler (if needed) will run before the onsuccess handler,
    // meaning that the db value wouldn't be available if we didn't do this
    let db = e.target.result;

    // 类似数据表定义
    let objectStore = db.createObjectStore('notes', {
      keyPath: 'id',
      autoIncrement: true
    });
    objectStore.createIndex('title', 'title', {unique: false});
    objectStore.createIndex('body', 'body', {unique: false});

    console.log('Db setup complete');
  }

  // 表单提交时执行addData()
  form.onsubmit = addData;

  function addData(e) {
    // stop the form actually submitting in the conventional manner (this would cause a page refresh and spoil the experience).
    e.preventDefault();
    //获取输入框的值
    let newItem = {
      title: titleInput.value,
      body: bodyInput.value
    };
    //开启一个事务
    let transaction = db.transaction(['notes'], 'readwrite');
    // 获取已创建的表
    let objectStore = transaction.objectStore('notes');
    // insert
    var request = objectStore.add(newItem);
    request.onsuccess = function() {
      titleInput.value = '';
      bodyInput.value = '';
    }

    transaction.oncomplete = function() {
      console.log('Transaction completed: database modification finished.');
      displayData();
    }

    transaction.onerror = function() {
      console.log('Transaction not opened due to error');
    }

  }

  function displayData(){
    while(list.firstChild){
      list.removeChild(list.firstChild);
    }
    let objectStore = db.transaction('notes').objectStore('notes');

    objectStore.openCursor().onsuccess = function(e) {
      let cursor = e.target.result;
      if(cursor){
        let listItem = document.createElement('li');
        let h3 = document.createElement('h3');
        let para = document.createElement('p');
        //ul中添加li
        listItem.appendChild(h3);
        listItem.appendChild(para);
        list.appendChild(listItem);
        //设置数据
        h3.textContent = cursor.value.title;
        para.textContent = cursor.value.body;

        listItem.setAttribute('data-note-id', cursor.value.id);
        // 添加delete按钮
        let deleteBtn = document.createElement('button');
        listItem.appendChild(deleteBtn);
        deleteBtn.textContent = 'Delete';

        deleteBtn.onclick = function(e) {
          deleteItem(e);
        }

        // 游标后移
        cursor.continue();

      }else{
        // 数据库中查不到数据
        if(!list.firstChild){
          let listItem = document.createElement('li');
          listItem.textContent = 'No notes stored';
          list.appendChild(listItem);
        }
      }

      console.log('Notes all displayed');
    }
  }

  function deleteItem(e) {
    // e.target.parentNode ==> <li>
    let noteId = Number(e.target.parentNode.getAttribute('data-note-id'));
    let transaction = db.transaction(['notes'], 'readwrite');
    let objectStore = transaction.objectStore('notes');
    let request = objectStore.delete(noteId);

    transaction.oncomplete = function() {
      // ul下删除li
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      console.log('Note ' + noteId + ' deleted.');

      if(!list.firstChild){
        let listItem = document.createElement('li');
        listItem.textContent = 'No notes stored.';
        list.appendChild(listItem);
      }
    }
  }



}
