const LocalStrategy=require('passport-local').Strategy
const User=require("../models/User")
const bcrypt=require('bcrypt')
function init(passport)
{
    passport.use(new LocalStrategy(
        async function(username, password, done) {

            //console.log(username);
           const user=await User.findOne({Email:username});
           if(!user)
           {
                return done(null,false,{message:"No user found please Register"});
            }

            bcrypt.compare(password,user.password).then(match=>{
                if(match)
                {
                    return done(null,user,{message:"Logged In Successfully"});
                }
                else
                {
                    return done(null,false,{message:"Username or Password is wrong"});
                }
            }).catch((err)=>{
                return done(null,false,{message:"something went wrong"});
            })
        }
      ));
      
      //adding user id to session
      passport.serializeUser((user,done)=>{
           done(null,user._id);
      })
      

      //using id stored in session fetching user from data base to run further queries of the user
      const findUserById = async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    };
    
    passport.deserializeUser(async (id, done) => {
        await findUserById(id, done);
    });
}

module.exports =init