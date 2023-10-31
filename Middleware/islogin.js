const isLoggedIn = (req, res, next) => {
    if (!req.cookies.Authtoken) {
      return res.redirect('/login');
    }
  
    next();
  };
export default isLoggedIn;