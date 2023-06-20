function findAuthorById(authors=[], id="") {
  //return author object that has the matching id
  const result = authors.find((authorObj) => authorObj.id === id) //create result variable that's equal to the one author whose id matches the id given
  return result;
}

function findBookById(books=[], id="") {
  //return book object that has the matching id
  const result = books.find((bookObj) => bookObj.id === id) //create result variable that's equal to one book whose id matches id given
  return result;
}

function partitionBooksByBorrowedStatus(books=[]) {
  //returns an array with 2 arrays inside it-
  //first array contains book objects that represent books that are currently checked out
  //second array represents books that have been returned
  const isAvailable = books.filter(({borrows}) => borrows.every((borrowsObj) => borrowsObj.returned === true)) //set variable to isAvailable-take original books array and filter is by borrows, in order to return the book obj every returned status must equal true
  const isNotAvailable = books.filter(({borrows}) => borrows.some((borrowsObj) => borrowsObj.returned === false)) //set variable to isNotAvailable-take original books array and filter by borrows, in order to return the book object only one of the returned status' has to equal false
  return [isNotAvailable, isAvailable]; //nest both arrays inside larger array with not available first, available second
}

function getBorrowersForBook(book={}, accounts=[]) {
    //return an array of ten or fewer account objects that represent accounts given by ids in the provided books 'borrows' array.
  //each account object should include the 'returned' entry from the corresponding transaction object in the 'borrows' array
  const {borrows} = book; //deconstruct borrows array from book object
  const result = borrows.map((borrowsObj)=>{ //create new array called 'result' where we take the information from the borrows array and transform it using map
      const {id} = borrowsObj; //deconstruct the 'id' from each borrows object
      const matchingAccount = accounts.find((accountObj)=>{ //create an object called matchingAccount that loops searches within existing accounts array to find the first account object whose id matches the corresponding id in the borrows object
          return accountObj.id === id; //once found return the account object under matchingAccount
      })
      matchingAccount.returned = borrowsObj.returned; //create new key:value under returned:returned status of matching id in borrows obj
      return matchingAccount; //return the matchingAccount object with new key:value pair to result
  })
  return result.slice(0,10); //limit result array to 10 objects
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
