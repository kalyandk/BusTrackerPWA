const Auth = {
  isAuthenticated: false,
  checkAuthenticated() {
    if (localStorage.getItem("user")) {
      console.log("setting to authenticated true");
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  },

  authenticate() {
    this.isAuthenticated = true;
  },
  async signout() {
    await localStorage.removeItem("user");
    this.isAuthenticated = false;
  },
  getAuth() {
    this.checkAuthenticated();
    console.log("current status" + this.isAuthenticated);
    return this.isAuthenticated;
  },
};
export default Auth;
