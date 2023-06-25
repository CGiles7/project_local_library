function findAccountById(accounts=[], id="") {
  //return the account object that has the matching id
  const result = accounts.find((element) => element.id === id) //create a result variable that's equal to searching the accounts array for the one element whose id matches id given
  return result;
}

function sortAccountsByLastName(accounts=[]) {
  //return a sorted array of provided account objects, sorted alphabetically by LAST name
  accounts.sort((elementA, elementB) => { //use sort function within accounts array
     return elementA.name.last.toLowerCase() < elementB.name.last.toLowerCase() ? -1 : 1; //return each accounts last name transformed to lowercase then sorted alphabetically
  })
  return accounts;
}

function getTotalNumberOfBorrows(account={}, books=[]) {
  //returns a number(integer) that represents the number of times the account's id appears in any book's 'borrows' array
  //look in account object and find account number
  //look through books array for each time account number appears in ANY book's 'borrows' array
  //total the times any book is borrowed by that account
  //const {bookObj} = books;
  //const {id} = account;
  //const total = books.reduce((accumulator, bookObj) => {
   // const {borrows} = bookObj;
    //if (borrows.id === id) {
     // accumulator += 1;
     // return accumulator;
    //}
  //}, 0)
  ///return total
//}
 
  const {id} = account;
 let total = 0;
 books.forEach(({borrows}) => {
    borrows.forEach((borrowsObj) => {
      if (borrowsObj.id === id) {
      total ++;
      }
    })
 })
 return total;
}

function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
//returns an ARRAY of book objects PLUS ADDED AUTHOR INFORMATION that represents all books currently checked out by given account
    //isolate book objects
    //within each book object, isolate the borrows array
    //if any object returned status === false, and the id matches the account id given, return to result
    //within new book objects in result, add key:value pair of author:author info from authors array

  const {id} = account; //deconstruct id from account
  const result = []; //create result array to house new book objects
  books.forEach((bookObj) => { //loop through each book object in books array
      const {borrows} = bookObj; //deconstruct borrows from each book object
      borrows.find((borrowsObj) => { //within borrows array search for a singular object that matches criteria
          if (borrowsObj.id === id && borrowsObj.returned === false) { //borrows object must match account id and returned value must equal false, there should only be one with false value
              const {authorId} = bookObj; //deconstruct authorId from each book object within books
              let matchingAuthor = null; //set value of matchingAuthor to null, value may change so use let
              authors.forEach((authorObj) => { //loop through each author object in authors array
                  if (authorObj.id === authorId) { //the id in author object must match the authorId from the book object
                      matchingAuthor = authorObj; //if so matchingAuthor variable now becomes the author object whose id matches
                      bookObj.author = matchingAuthor; //create new key:value within book object
                  }
              })
              result.push(bookObj) //save the new book object to results, repeat
          }
      })
  })
  return result;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
