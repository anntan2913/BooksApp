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
                event.preventDefault();
                image.classList.add('favorite');
                const bookId = image.getAttribute('data-id');
                favoriteBooks.push(bookId);
                console.log('Favorite Books', favoriteBooks);
            });            
        }
    }
    render();
    initActions();  
}
















