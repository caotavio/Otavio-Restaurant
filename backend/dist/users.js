"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    'tav.dev@gmail.com': new User('tav.dev@gmail.com', 'Tav', 'tavpass'),
    'tai@gmail.com': new User('tai@gmail.com', 'Tai', 'taipass'),
    'user@mail.com': new User('user@mail.com', 'User', 'userpass')
};
