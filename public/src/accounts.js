function findAccountById(accounts, id) {
  const result = accounts.find((element) => {
    return element.id === id;
  });
  return result;
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    return accountA.name.last
      .toLowerCase()
      .localeCompare(accountB.name.last.toLowerCase());
  });
}

// function getTotalNumberOfBorrows(account = {}, books = []) {
//   const accountId = account.id;
//   let timesBorrowed = 0;
//   for (let book in books) {
//     const borrowedArray = books[book].borrows;
//     const idBorrows = borrowedArray.filter((person) => person.id === accountId);
//     timesBorrowed += idBorrows.length;
//   }
//   return timesBorrowed;
// }

function getTotalNumberOfBorrows(account = {}, books = []) {
  //create counter variable
  const counter = books.reduce((acc, bookObj) => {
    //need the borrows array
    const { borrows } = bookObj;
    //for each to go thorugh each index of the borrows array
    borrows.forEach((borrowObj) => {
      //if bookobj id matches the account id, accumulator adds one
      if (borrowObj.id === account.id) {
        acc++;
      }
    });
    return acc;
  }, 0);
  return counter;
}

function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
  const accountId = account.id;
  const checkedOut = books.filter((bookObj) => {
    const { borrows } = bookObj;
    return borrows[0].id === accountId && !borrows[0].returned;
  });
  const result = [];
  checkedOut.forEach((checkedObj) => {
    authors.forEach((authorObj) => {
      console.log(authorObj.id, checkedObj.authorId);
      if (authorObj.id === checkedObj.authorId) {
        checkedObj.author = authorObj;
        result.push(checkedObj);
      }
    });
  });

  return result;
  //find books checked out for given account accountId
  //push book items into checked out Array
  //match author to each book object in checked out array
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
