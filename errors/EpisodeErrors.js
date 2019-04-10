function EpisodeNotFound() {
  this.name = 'EpisodeNotFound';
  this.message = 'Episode Not Found';
  this.status = 404;
  this.code = 10001021;
}
module.exports.EpisodeNotFound = EpisodeNotFound;

function EpisodeCreateException() {
  this.name = 'EpisodeCreateException';
  this.message = 'Episode Create Exception';
  this.status = 500;
  this.code = 10001022;
}
module.exports.EpisodeCreateException = EpisodeCreateException;

function EpisodeDeleteException() {
  this.name = 'EpisodeDeleteException';
  this.message = 'Episode Delete Exception';
  this.status = 500;
  this.code = 10001023;
}
module.exports.EpisodeDeleteException = EpisodeDeleteException;

function EpisodeUpdateException() {
  this.name = 'EpisodeUpdateException';
  this.message = 'Episode Update Exception';
  this.status = 500;
  this.code = 10001024;
}
module.exports.EpisodeUpdateException = EpisodeUpdateException;
