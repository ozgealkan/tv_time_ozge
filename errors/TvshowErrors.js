function TvShowNotFound() {
  this.name = 'TvShowNotFound';
  this.message = 'TvShow Not Found';
  this.status = 404;
  this.code = 10001017;
}
module.exports.TvShowNotFound = TvShowNotFound;

function TvShowCreateException() {
  this.name = 'TvShowCreateException';
  this.message = 'TvShow Create Exception';
  this.status = 500;
  this.code = 10001018;
}
module.exports.TvShowCreateException = TvShowCreateException;

function TvShowDeleteException() {
  this.name = 'TvShowDeleteException';
  this.message = 'TvShow Delete Exception';
  this.status = 500;
  this.code = 10001019;
}
module.exports.TvShowDeleteException = TvShowDeleteException;

function TvShowUpdateException() {
  this.name = 'TvShowUpdateException';
  this.message = 'TvShow Update Exception';
  this.status = 500;
  this.code = 10001020;
}
module.exports.TvShowUpdateException = TvShowUpdateException;
