function getTotalBooksCount(books) {
  //return a number(integer) that represents the number of book objects in the array
  return books.length; //length of books array equals total number of books
}


function getTotalAccountsCount(accounts) {
  //return a number(integer) that represents the number of account objects in the array
  return accounts.length; //length of accounts array equals total number of accounts
}


function getBooksBorrowedCount(books=[]) {
  //returns a number(integer) that represents the number of books that are currently checked out of the libray
  const total = books.reduce((accumulator, {borrows}) => { //create total variable that represents total number of books currently checked out, use reduce method to create a counter(accumulator)
    if (borrows[0].returned === false) //isolate the value at the first index of the borrows array, look at returned status to see if false
    accumulator ++; //if false add 1 to accumulator/total
    return accumulator;
  }, 0)
  return total;
}


function getMostCommonGenres(books=[]) {
  //returns an array containing 5 objects or fewer
  //each object should contain a 'name' key with corresponding genre name, as well as a 'count' key with the number of times the genre occurs in the books object given
  //even if there is a tie the array should contain no more than 5 objects
  const result = []; //create blank result array
  const genresLookup = {}; //create blank object for genres
  books.forEach((bookObj) => { //loop through books array
      const {genre} = bookObj; //deconstruct the genre from each book object
      if (genresLookup[genre] === undefined){ //within each book object if the genre is not yet defined or added within the new genresLookup object add it and set count to 1
          genresLookup[genre] = 1;
      } else {
          genresLookup[genre] += 1; //if genre is already defined within new genresLookup object increase count by 1
      }
  })
    for (let genreKey in genresLookup) { //within genresLookup object, loop through each
        let genreObj = {name: genreKey, count: genresLookup[genreKey]} //set each genre object with key: value pairs
        result.push(genreObj); //push object to results
    }
    result.sort((genreA,genreB) => { //sort objects within results array from highest count to lowest count
        return genreB.count - genreA.count;
    })
    return result.slice(0,5); //only retain top 5
}


function getMostPopularBooks(books=[]) {
  //returns an array containing 5 objects or fewer 
  //each object should contain a 'name' key with corresponding book title, as well as a 'count' key with the number of times a book has been borrowed
  //even if there is a tie, the array should contain no more than 5 objects
 
 books.sort((bookA, bookB) => { //sort books array according to the number of borrows
  return bookB.borrows.length - bookA.borrows.length; 
 })
 const top5Books = books.slice(0,5) ; //only retain the top 5 book objects
 
 const result = []; //create new result array
 top5Books.forEach((bookObj) =>  { //loop through top 5 book objects from before
  const {title, borrows} = bookObj; //deconstruct the title and borrows array from each book obj
  const titleObj = {name: title, count: borrows.length}; //create new variable titleObj that contains key value pairs name which is equal to the title of the book and count which is equal to the number of borrows
  result.push(titleObj); //retain new title objects to results and return
 })
 return result;
}


function nameHelper(object={}) {
  return `${object.name.first} ${object.name.last}` //return info from given object transformed into string literals to put first name and last name strings in order within object
}
  

function getMostPopularAuthors(books=[], authors=[]) {
  //returns array containing 5 objects or less
  //each objects has two keys; 'name' key that represents the first and last name of the author, and 'count' key that represents the number of times all of that author's books have been borrowed-a total count
  //even if there is a tie the array shouldn't contain more than 5 objects
 books.sort((bookA, bookB) => { //sort all book objects in books array by borrows.length - most to least
  return bookB.borrows.length - bookA.borrows.length;
 })
 const top5Books =  books.slice(0,5); //retain only the top 5 books with most borrows
 
 const result = []; //create a new array to house results
 top5Books.forEach((bookObj) => { //within top 5 array, loop through each book object
  const {authorId, borrows} = bookObj; //deconstruct author id and number of borrows for each book
  const foundAuthor = authors.find((authorObj) => authorObj.id === authorId)  //create a new variable to match author, loop through authors array to find author id that matches id given in book array
  
  const newObj = {name: nameHelper(foundAuthor), count: borrows.length}; //final object structure set up, use helper function to transform name of author and set as value to name key , count key is equal to the number of borrows for that book or length of array
    result.push(newObj); //push new object to results and return
 })
 return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
