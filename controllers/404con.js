const notfound = (req,res,next)=>{
    res.render('notfound' , {pageTitle : 'Page not found' , hi : 'PAGE NOT FOUND :/' , path : 'notfound1'});
}

module.exports = {
    notf : notfound
}