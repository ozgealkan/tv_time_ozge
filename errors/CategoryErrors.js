function CategoryNotFound() {
  this.name = 'CategoryNotFound';
  this.message = 'Category Not Found';
  this.status = 404;
  this.code = 10001013;
}
module.exports.CategoryNotFound = CategoryNotFound;

function CategoryCreateException() {
  this.name = 'CategoryCreateException';
  this.message = 'Category Create Exception';
  this.status = 500;
  this.code = 10001014;
}
module.exports.CategoryCreateException = CategoryCreateException;

function CategoryDeleteException() {
  this.name = 'CategoryDeleteException';
  this.message = 'Category Delete Exception';
  this.status = 500;
  this.code = 10001015;
}
module.exports.CategoryDeleteException = CategoryDeleteException;

function CategoryUpdateException() {
  this.name = 'CategoryUpdateException';
  this.message = 'Category Update Exception';
  this.status = 500;
  this.code = 10001016;
}
module.exports.CategoryUpdateException = CategoryUpdateException;
