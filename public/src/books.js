function findAuthorById(authors, id) {
  return authors.find((element) => {
    return element.id === id;
  });
}

function findBookById(books, id) {
  return books.find((element) => {
    return element.id === id;
  });
}

// function partitionBooksByBorrowedStatus(books) {
//   //create arrays for returned and not retuned
//   const inArray = [];
//   const outArray = [];
//   //loop through the books array
//   books.forEach((book) => {
//     if (
//       book.borrows.some((element) => {
//         return element.returned === false;
//       })
//     ) {
//       outArray.push(book);
//     } else {
//       inArray.push(book);
//     }
//   });
//   return [outArray, inArray];
//   //look at books.borrows.find(returned===false)
//   //if this is true push to outArray
//   //if not true push to inArray
// }

function partitionBooksByBorrowedStatus(books) {
  const inLibrary = books.filter(({ borrows }) => {
    return borrows[0].returned === true;
  });
  const notInLibray = books.filter(({ borrows }) => {
    return borrows[0].returned === false;
  });

  return [notInLibray, inLibrary];
}

// function getBorrowersForBook(book, accounts) {
//   const { borrows } = book;
//   const whoBorrowed = [];

//   borrows.forEach((borrowsObj) => {
//     const accountArray = accounts.find((account) => account.id === borrowsObj.id)
//     whoBorrowed
//   });

//   console.log(whoBorrowed);
//   //i need to get the book.borrows.id to match to accounts
//   //i need to get the book.borrows.returned to include in the return array
//   return whoBorrowed;
// }

function getBorrowersForBook(book = {}, accounts = []) {
  const { borrows } = book;
  const whoBorrowed = [];
  let counter = 0;
  //borrows loop to get id for each time book was borrowed
  borrows.forEach((borrowsObj) => {
    const borrowerId = borrowsObj.id;
    accounts.find((account) => {
      //push found account onto whoBorrowed
      if (account.id === borrowerId && counter < 10) {
        whoBorrowed.push({ ...borrowsObj, ...account });
        counter++;
      } else {
        return;
      }
    });
  });
  return whoBorrowed;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
