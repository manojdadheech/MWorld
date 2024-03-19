import express from  'express';

const route=express.Router();

route.get( '/',  (req,res)=>{
    res.render('index',{ req: req });
});
route.get( '/games',  (req,res)=>{
    res.render('games',{ req: req });
});

route.get( '/ui',  (req,res)=>{
    res.cookie('user','')
    res.render('ui',{ req: req });
});

route.get( '/ball',  (req,res)=>{
    res.render('ball',{ req: req });
});
route.get( '/snack',  (req,res)=>{
    res.render('snack',{ req: req });
});
export default route;