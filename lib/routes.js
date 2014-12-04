module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.post('/sessions', function(req, res, next) {
    if (!req.body.email || !req.body.password) {
      return res.end('Please enter both a password and an email');
    }
    else {
      req.models.User.findOne({
        email: req.body.email}, function(error, user) {
          if(error) {
            console.log('got here');
            return res.end("error");
          }
          else if(user){
              user.comparePassword(req.body.password, function(error, isMatch) {
              if(error) return next(error);

              else if(!isMatch) {
                console.log('uh oh');
                return res.end('Password is Incorrect');
              }
              else {
                console.log('yayyy')
                req.session.user = user;
                return res.end('correct');
              }
            });
          }
          else
            res.end("User Doesn't Exist");
        });
    }
  });
}