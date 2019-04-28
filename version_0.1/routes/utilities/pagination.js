const pagination = (pagesCount, items) => {
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
};

function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
