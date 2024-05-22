//we will use factory function to make controllers(factory function are functions which return objects{})

function homeController()
{
    return {
        index(req,res){
            res.render('home');
        }
    }
}

module.exports=homeController;