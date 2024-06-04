const { error } = require("laravel-mix/src/Log");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const passport=require('passport')
function authController() {
  return {
    login(req, res) {
      res.render("Auth/Login");
    },

    postLogin(req,res,next){

      const {username, password } = req.body;
      console.log(req.body);
      //data validation
      if ( !username || !password) {
        req.flash("error", "All fields are required"); //for the notificatioon
        return res.redirect("/login");
      }
       
      passport.authenticate('local', (err,user,msg)=>{
         
        if(err)
        {
            req.flash('error',msg.message)
            return next(err)
        }
        
        if(!user)
        {
          req.flash('error',msg.message)
          return res.redirect("/login")
        }

        req.logIn(user, (err) => {
          if (err) {
            req.flash('error', msg.message);
            return next(err);
          }
          console.log("Successfully Login");
          return res.redirect('/');
        });

      })(req,res,next);
    },

    register(req, res) {
      res.render("Auth/register");
    },

    async postRegister(req, res) 
    {
      const { name, Username, password } = req.body;
      console.log(req.body);
      //data validation
      if (!name || !Username || !password) {
        req.flash("error", "All fields are required"); //for the notification
        req.flash("name", name);
        req.flash("Username", Username);

        return res.redirect("/register");
      }

      //checking if email already exist in database or not
      if (await User.exists({ Email: Username })) {
        console.log("user exists");
        req.flash("error", "User Already Exists");
        req.flash("name", name);
        req.flash("Username", Username);
        return res.redirect("/register");
      }
      //hashing the passowrd
      const pass = await bcrypt.hash(password, 10);

      //creating new user
      const newUser = new User({
        name: name,
        Email: Username,
        password: pass,
      });

      //if user is created successfully
      newUser
        .save()
        .then((user) => {
          console.log("user saved successfully");
          return res.redirect("/login");
        })
        .catch((error) => {
          req.flash("error", "Please Try again"); //for the notification
          req.flash("name", name);
          req.flash("Username", Username);
          return res.redirect("/register");
        });
    },

    postlogout(req,res)
    {
        // req.logout();
        // return res.redirect("/");
        req.logout((err) => {
          if (err) {
              return next(err);
          }
          return res.redirect("/");
      });
    }
  };
}

module.exports = authController;
