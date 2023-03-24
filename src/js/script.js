/* eslint-disable indent */
/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';
  
    const select = {
      templateOf: {
        book: '#template-book',        
        }
    };

    const booksListCon = document.querySelector('.books-list');
    
    const templates = {
        book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),        
    };
    
    class BooksList {
        constructor() {
            const thisBooksList = this;                  

            thisBooksList.initData();
            thisBooksList.render();
            thisBooksList.getElements();            
            thisBooksList.initActions();
            thisBooksList.determineRatingBgc();

            console.log('Books List', thisBooksList);
        } 
        
        initData(){
            const thisBooksList = this; 
            thisBooksList.data = dataSource.books;            

            thisBooksList.favoriteBooks = [];
            thisBooksList.filters = [];                       
        }

        render(){
            const thisBooksList = this;

            for(const book of thisBooksList.data) { 
                const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
                const ratingWidth = book.rating * 10; // to percentage rate
                book.ratingBgc = ratingBgc;
                book.ratingWidth = ratingWidth;                 
                const generatedHTML = templates.book(book);
                const generatedDOM = utils.createDOMFromHTML(generatedHTML);                
                booksListCon.appendChild(generatedDOM);             
            }
        }

        getElements(){
            const thisBooksList = this;

            thisBooksList.booksListCon = document.querySelector('.books-list');
            thisBooksList.bookForm = document.querySelector('.filters');
        }        
        
        initActions(){
            const thisBooksList = this;

            //const booksImages = booksListCon.querySelectorAll('.book__image'); 
            //const bookForm = document.querySelector('.filters');            
            //for(let image of booksImages) {     // e. ('image' click) => event.target.offsetParent
                
            thisBooksList.booksListCon.addEventListener('dblclick', function(event){ 
                event.preventDefault(); 
                if(event.target.offsetParent.classList.contains('book__image')){
                    const bookId = event.target.offsetParent.getAttribute('data-id');

                    if(thisBooksList.favoriteBooks.indexOf(bookId) == -1){
                        event.target.offsetParent.classList.add('favorite');                
                        thisBooksList.favoriteBooks.push(bookId);
                    } else {
                        event.target.offsetParent.classList.remove('favorite');
                        const bookElem = thisBooksList.favoriteBooks.indexOf(bookId);
                        thisBooksList.favoriteBooks.splice(bookElem, 1);                    
                    }
                }
                console.log('Favorite Books', thisBooksList.favoriteBooks);                
            });            
            //}
            thisBooksList.bookForm.addEventListener('click', function(event){
                //if event.target was the clicked element, which...
                if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
                    console.log('checkbox-value', event.target.value);
                    if(event.target.checked == true){
                        thisBooksList.filters.push(event.target.value);
                    } else {
                        const filterValue = thisBooksList.filters.indexOf(event.target.value);
                        thisBooksList.filters.splice(filterValue, 1);
                    }                
                }
                console.log('Filter value', thisBooksList.filters);
                thisBooksList.filterBooks(); 
            });
        }

        filterBooks(){
            const thisBooksList = this;

            for (let book of thisBooksList.data){
                let shouldBeHidden = false;
                for (const filter of thisBooksList.filters){
                     if(!book.details[filter]) {
                         shouldBeHidden = true;
                         break;
                        }
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

        determineRatingBgc(rating){
            //const thisBooksList = this;
            
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
    }        
    
    const app = new BooksList();    
} 
