module.exports = function(app) {
  app.get('/', function(req, res) {
  res.render('index');
});

  app.get('/main', function(req, res) {
    res.send('index');
  });

  app.post('/sessions', function(req, res, next) {
    if (!req.body.email || !req.body.password) {
      return res.end('fail');
    }
    else {
      req.models.User.findOne({
        email: req.body.email}, function(error, user) {
          if(error) {
            console.log('got here');
            return res.end('fail');
          }
          else if(user){
              user.comparePassword(req.body.password, function(error, isMatch) {
              if(error) return next(error);

              else if(!isMatch) {
                console.log('shit');
                return res.end('wrong password');
              }
              else {
                console.log('yayyy')
                req.session.user = user;
                return res.end('correct');
              }
            });
          }
          else
            res.end('no user');
        });
    }
  });
}