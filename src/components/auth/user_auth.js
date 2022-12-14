const userAuth = {
  isAuthenticated: false,
  authenticate(user, cb) {
    this.isAuthenticated = true;
    this.domain = user.domain;
    this.id = user.id;
    setTimeout(cb, 100);
    console.log(this);
  },
  signout(user, cb) {
    this.isAuthenticated = false;
    this.domain = "";
    this.id = "";
    setTimeout(cb, 100);
  }
};

export default userAuth;
