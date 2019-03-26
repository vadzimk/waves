const admin  =(req,res,next)=>{
    if(req.user.role === 0 ){
        return res.send("For this operation you must be logged in as administrator.")
    }
    next();
};
module.exports = admin;