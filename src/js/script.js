/* eslint-disable indent */
/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';
  
    const select = {
      templateOf: {
        book: '#template-book',        
        }
    };

    const booksList = document.querySelector('.books-list');
    
    const templates = {
        book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),        
    };

    function render() {      

        for(const book of dataSource.books) {                  
            const generatedHTML = templates.book(book);
            const generatedDOM = utils.createDOMFromHTML(generatedHTML);
            booksList.appendChild(generatedDOM); 
        }
    }
    
    const favoriteBooks = [];
    
    function initActions() {        
       
        const booksImages = booksList.querySelectorAll('.book__image'); 
        
        for(let image of booksImages) {
            
            image.addEventListener('dblclick', function(event){
                event.preventDefault(); // e. ('image' click) => event.target.offsetParent
                if(event.target.offsetParent.classList.contains('book__image')){
                    const bookId = event.target.offsetParent.getAttribute('data-id');

                    if(favoriteBooks.indexOf(bookId) == -1){
                        event.target.offsetParent.classList.add('favorite');                
                        favoriteBooks.push(bookId);
                    } else {
                        event.target.offsetParent.classList.remove('favorite');
                        const bookElem = favoriteBooks.indexOf(bookId);
                        favoriteBooks.splice(bookElem, 1);                    
                    }
                }
                console.log('Favorite Books', favoriteBooks);                
            });            
        }
    }
    render();
    initActions();  
}
















