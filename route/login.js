import express from  'express';
import userController from '../controller/usercontroller.js';

const route=express.Router();


route.get( '/login',  (req,res)=>{
    if(req.cookies.token) return res.redirect('/');
    else return res.render('login',{ req: req });
});
route.post( '/login', userController.loginUser );
route.post( '/signup', userController.createUser );
route.get( '/logout', userController.logoutUser );
// route for getting the current logged in user's info
// route.get("/me", userController.authCheck ,async (req,res)=> {
//    const user = await userController.findById(req.userId);
//    // console.log("USER IS ", user);
//    res.json({success : true , data : user}) ;
// });

export  default route;

