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
            const ratingBgc = determineRatingBgc(book.rating);
            const ratingWidth = (book.rating / 10) * 100; // to percentage rate
        }
    }
    
    const favoriteBooks = [];
    const filters = [];
    
    function initActions() {        
       
        //const booksImages = booksList.querySelectorAll('.book__image'); 
        const bookForm = document.querySelector('.filters');
        
        //for(let image of booksImages) {              // e. ('image' click) => event.target.offsetParent
            
        booksList.addEventListener('dblclick', function(event){ 
            event.preventDefault(); 
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
        //}

        bookForm.addEventListener('click', function(event){
            //if event.target was the clicked element, which...
            if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
                console.log('checkbox-value', event.target.value);
                if(event.target.checked == true){
                    filters.push(event.target.value);
                } else {
                    const filterValue = filters.indexOf(event.target.value);
                    filters.splice(filterValue, 1);
                }                
            }
            console.log('Filter value', filters);
            filterBooks(); 
        });
    }
    
    function filterBooks(){
        
        for (let book of dataSource.books){
           let shouldBeHidden = false;
           for (const filter of filters){
                if(!book.details[filter]) {
                    shouldBeHidden = true;
                    break;
                }                         
                //tipp: .book__image[data-id="id-of-the-book-here"] jak w blogu-check it!
                const bookImg = document.querySelector('.book__image[data-id="' + book.id + '"]');
                console.log('Book Id', book.id);   
                if(shouldBeHidden == true){
                    bookImg.classList.add('hidden');
                } else {                
                    bookImg.classList.remove('hidden');
                } console.log('bookImg', bookImg);
            }                   
        }
    }

    function determineRatingBgc(rating){

        if (rating<6) {
           return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
        } else if (rating>6 && rating<=8) {
            return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
        } else if (rating>8 && rating<=9) {
            return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
        } else if (rating>9) {
            return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
        }   
    }    
    render();
    initActions();  
}
