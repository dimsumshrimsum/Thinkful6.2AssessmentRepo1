function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const counterArray = books.filter(({ borrows }) => {
    return borrows[0].returned === false;
  });
  return counterArray.length;
}

function getMostCommonGenres(books) {
  const bookGenreArray = books.map((book) => book.genre);
  const countObj = {};
  bookGenreArray.forEach((genre) => {
    countObj[genre] = countObj[genre] ? countObj[genre] + 1 : 1;
  });
  const results = [];
  for (let keys in countObj) {
    results.push({ name: keys, count: countObj[keys] });
  }
  results.sort((objA, objB) => {
    return objA.count > objB.count ? -1 : 1;
  });

  return results.slice(0, 5);
}

// function getMostCommonGenres(books) {
//   const countObj = books.reduce((count, { genre }) => {
//     count[genre] = (count[genre] || 0) + 1;
//     return count;
//   }, {});
//   const results = Object.entries(countObj)
//     .map(([name, count]) => ({ name, count }))
//     .sort((a, b) => b.count - a.count)
//     .slice(0, 5);
//   return results;
// }

function getMostPopularBooks(books) {
  //scan through the books array
  //call helper function

  // books.forEach((book) => {
  //   //set value to helper function
  //   result.push({ name: [book], count: getNumberOfBorrows(book) });
  // });

  const result = books.map((book) => {
    return { name: book.title, count: getNumberOfBorrows(book) };
  });
  result.sort((objA, objB) => {
    return objA.count > objB.count ? -1 : 1;
  });

  return result.slice(0, 5);
}

function getNumberOfBorrows({ borrows }) {
  return borrows.length;
}

function getMostPopularAuthors(books, authors) {
  //get author id
  //scan the books array for corresponding authors
  const result = [];
  authors.forEach((author) => {
    const authorBooks = books.filter((book) => {
      return book.authorId === author.id;
    });
    //need to go through the authorBooks Array and cound total number of borrows
    // counter = authorBooks.reduce((count, book) => {
    //   return count + getNumberOfBorrows(book);
    // });
    // console.log(authorBooks);
    // authorBooks.forEach((book) => {
    //   console.log(book.borrows.length);
    //   counter += books[book].borrows.length;
    // });
    let counter = 0;
    authorBooks.forEach((book) => {
      counter += getNumberOfBorrows(book);
    });

    result.push({
      name: `${author.name.first} ${author.name.last}`,
      count: counter,
    });
  });
  result.sort((objA, objB) => {
    return objA.count > objB.count ? -1 : 1;
  });

  console.log(result);
  return result.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
