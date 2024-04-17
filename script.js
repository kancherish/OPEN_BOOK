//variable,object decalrations for global use
let Library_Books_lst=[];

let no_of_books=0;

class Book(name,author,pages,status,id){
    constructor(){
         this.name=name;
         this.author=author;
         this.pages=pages;
         this.status=status;
         this.id=id;
    }
}


const book_lst=document.querySelector(".book_list");

const addBtnModal = document.querySelector(".addBtn");

const readTg= document.querySelector(".readTg");


/*---------------------------------------------------------------------------------------------------------- */
//function declaration and event listeners section

function createCard(name,auth,pages,status,id){
    
    //creating card element
    let card = document.createElement("div")
    card.classList.add("card");
    card.classList.add("effect8");
    card.id=id;

    const bookInfoDiv = document.createElement("div");
    bookInfoDiv.classList.add("book_info");

    const bookTitleDiv = document.createElement("div");
    bookTitleDiv.classList.add("book_title");
    bookTitleDiv.textContent = "Book Title: "+name;

    const authorDiv = document.createElement("div");
    authorDiv.classList.add("auth");
    authorDiv.textContent = "Written by "+auth;

    const pagesDiv = document.createElement("div");
    pagesDiv.classList.add("no_of_pages");
    pagesDiv.textContent = "Pages: "+pages;

    const statusDiv = document.createElement("div");
    statusDiv.classList.add("status");
    statusDiv.textContent = "Status: "+ (status?"read":"unread");

    const bookActionsDiv = document.createElement("div");
    bookActionsDiv.classList.add("book_actions");

    bookInfoDiv.appendChild(bookTitleDiv);
    bookInfoDiv.appendChild(authorDiv);
    bookInfoDiv.appendChild(pagesDiv);
    bookInfoDiv.appendChild(statusDiv);

    // Create buttons for book actions
    const markAsReadButton = document.createElement("button");
    markAsReadButton.classList.add("readTg");
    markAsReadButton.textContent = "Mark as "+(!status?"read":"unread");

    markAsReadButton.addEventListener("click",(e)=>{
        status=!status;
        Library_Books_lst[parseInt(e.target.parentElement.parentElement.id)].status=status
        markAsReadButton.textContent = "Mark as "+(!status?"read":"unread");
        statusDiv.textContent = "Status: "+ (status?"read":"unread");


    })

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("book_dlt");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click",(e)=>{

        e.target.parentElement.parentElement.remove();
    })

    bookActionsDiv.appendChild(markAsReadButton);
    bookActionsDiv.appendChild(deleteButton);


    card.appendChild(bookInfoDiv);
    card.appendChild(bookActionsDiv);

    return card;
}

//function to handle click on card + icon
function addBook(book){
    document.querySelector("dialog").showModal()
}

// addding event listner to add btn on modal to add books
addBtnModal.addEventListener("click",(e)=>{
    let form=document.querySelector("form");
    let book_title=form.querySelector(".tlt").value;
    let book_auth=form.querySelector(".auth").value;
    let book_page=form.querySelector(".page").value;
    let book_status=form.querySelector(".status").checked;
    
    
    
    if(book_title==="" ||book_auth==="" ||book_page===""){
        window.alert("please enter all fields");
        return
    }
    

    let book = new Book(book_title,book_auth,book_page,book_status,no_of_books);
    Library_Books_lst.push(book)
 
    book_lst.appendChild(createCard(book_title,book_auth,book_page,book_status,no_of_books))
    no_of_books++;
    document.querySelector("dialog").close()
    form.reset()
})

readTg.addEventListener("change",function(e){
    book_lst.innerHTML="";

    //for all
    if(e.target.selectedIndex===0){
        for (let i = 0; i < Library_Books_lst.length; i++) {
                let card = createCard(Library_Books_lst[i].name,Library_Books_lst[i].author,Library_Books_lst[i].pages,Library_Books_lst[i].status,Library_Books_lst[i].id)
                book_lst.appendChild(card);
            }
    }else if(e.target.selectedIndex===1){//for only read
        for (let i = 0; i < Library_Books_lst.length; i++) {
            if(Library_Books_lst[i].status){
                let card = createCard(Library_Books_lst[i].name,Library_Books_lst[i].author,Library_Books_lst[i].pages,Library_Books_lst[i].status,Library_Books_lst[i].id)
                book_lst.appendChild(card);
            }
        }
    }else{//for only unread
        for (let i = 0; i < Library_Books_lst.length; i++) {
            if(!Library_Books_lst[i].status){
                let card = createCard(Library_Books_lst[i].name,Library_Books_lst[i].author,Library_Books_lst[i].pages,Library_Books_lst[i].status,Library_Books_lst[i].id)
                book_lst.appendChild(card);
            }
        }
    }
})
