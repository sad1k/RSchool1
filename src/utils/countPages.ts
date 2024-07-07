export function countPages(
  currentPage: number,
  maxPages: number,
): Array<number> {
  console.log(currentPage, maxPages);
  const pages = [];
  if (maxPages > 10) {
    if (currentPage > 5) {
      for (let i = currentPage - 4; i <= currentPage + 5; i++) {
        pages.push(i);
        if (i == maxPages) break;
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        pages.push(i);
        if (i == maxPages) break;
      }
    }
  } else {
    for (let i = 1; i <= maxPages; i++) {
      pages.push(i);
    }
  }
  return pages;
}
