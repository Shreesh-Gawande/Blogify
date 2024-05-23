const { validateToken } = require("../services/authentication");


function checkForAuthenticationCookie(cookieName){
  return (req,res,next)=>{
    const cookieTokenValue=req.cookies[cookieName];
    if(!cookieTokenValue){
        next();
    }


    try {
        const userPayload= validateToken(cookieTokenValue);
        req.user=userPayload;
    } catch (error) { }
    next();
  };
}

module.exports={
    checkForAuthenticationCookie,
}