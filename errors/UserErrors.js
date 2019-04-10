

function UserNotFound() {
  this.name = 'UserNotFound';
  this.message = 'User Not Found';
  this.status = 404;
  this.code = 10001010;
}
module.exports.UserNotFound = UserNotFound;

function UserCreateException() {
  this.name = 'UserCreateException';
  this.message = 'User Create Exception';
  this.status = 500;
  this.code = 10001011;
}
module.exports.UserCreateException = UserCreateException;

function InvalidPassword() {
  this.name = 'InvalidPassword';
  this.message = 'Invalid Password';
  this.status = 500;
  this.code = 10001012;
}
module.exports.InvalidPassword = InvalidPassword;

function UserUpdateException() {
  this.name = 'UserUpdateException';
  this.message = 'User Update Exception';
  this.status = 500;
  this.code = 10001030;
}
module.exports.UserUpdateException = UserUpdateException;
