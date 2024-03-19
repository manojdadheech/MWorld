import {UserModel}  from "../model/notesmodel.js";
import bcrypt from  'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY='mykey';

class  userController {

    static async createUser(req,res){   
        try{  
                const salt = await bcrypt.genSalt(10);
                req.body.password=await      bcrypt.hash(req.body.password ,10) ;
               let newuser = UserModel(req.body);
                     await newuser.save();
                     const token = jwt.sign({ _id: newuser._id ,name:newuser.name}, SECRET_KEY, { expiresIn: '24h' });

                     // Setting the token as a cookie in the response
                     res.cookie('token', token, { expiresIn: '24h', httpOnly: true }); 
                     res.cookie('name', newuser.name, { expiresIn: '24h', httpOnly: true }); 
                     return redirect(req.cookies.returnto || '/');

                      
            }catch (err) {
              console.log("Error in signup", err);
             return  res.redirect(303,"/login?email=This email is already registered");
           }
         };
        
         static async loginUser(req,res){
            let user = await UserModel.findOne({email : req.body.email});
            if(!user) return res.redirect('login?email=Invalid Email Id / Password')
          else{
            var passwordIsValid = await bcrypt.compare(req.body.password, user.password);
            if (!passwordIsValid) return res.redirect('login?email=Invalid Email Id / Password');
            // Create Token
            let token = jwt.sign({_id: user._id,name:user.name}, SECRET_KEY, {expiresIn: '1d'})
            // Set it to the cookies
            res.cookie('token', token, { expiresIn: '24h', httpOnly: true });
            res.cookie('name', user.name, { expiresIn: '24h', httpOnly: true });
            console.log(req.cookies.returnto); 
            return res.status(200).redirect(req.cookies.returnto || '/');

          
         
         }
         }

         static logoutUser(req,res) {    
          res.clearCookie('token')
          res.clearCookie('name')
          return res.status(200).redirect('back');
         }

         static authenticateUser=(req,res,next)=>{
            res.cookie('returnto',req.originalUrl);
            console.log(req.cookies.returnto);
            
            if(req.cookies.token===undefined || req.cookies.token===' ')    
            {return res.redirect('login')}
            else{
                 next();
            }
         }  
         static logpage (req,res,next){
            
            if(req.cookies.token===undefined || req.cookies.token===' ')    
            {return res.render('login')}
            else{
                return res.redirect('back');
            }
         }  

         
  
  
}

export default  userController;
 