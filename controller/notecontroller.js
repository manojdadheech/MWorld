import {noteModel} from "../model/notesmodel.js";
import jwt from  'jsonwebtoken';
const SECRET_KEY='mykey';

class  NoteController {
    static async getNotes(req, res) {
        try{
            const token= await jwt.verify(req.cookies.token, SECRET_KEY);
            const notes = await  noteModel.find({'userId': token._id});
            // console.log(notes);
            res.render( 'notes' , {notes:notes, userId : token._id,req:req}) ;  
            
        }catch (err){
            console.log("Error in getting the notes");
            return err;
        }  
        
    };
            
        
  

    static async createNote(req,res){
      
       
        let newNote= req.body;
        if(!newNote.title || !newNote.description ){
            return res.status(400).json({ success:false,error:"Please provide title and content"})
        }
        try {
          const note = await noteModel.create(newNote); 
          res.redirect('/notes');
          
        } catch (error) {
          console.log('Error in Saving Notes', error);
          res.status(400).redirect('/notes?message='+error);

          
        }
       // console.log("New Note", newNote);
        // res.status(201).json({ success:true,data:note});
    }

   

    

    static async deleteNote(req,res){
      const id = req.params.id;
      // if(isNaN(id)){
      //   return res.redirect('/notes');
      // }
      console.log(id);
      try {
        const deleted = await noteModel.findByIdAndDelete(id);
        return  res.redirect("/notes");
        
      } catch (error) {
        return res.redirect("/notes?message=" + error);
      }
       
      }

      static async edit(req,res){
        try {
          const notes = await noteModel.findById(req.params.id);
          res.render('notesedit',{notes:notes,req:req} );
          
        } catch (error) {
          console.log('Error In Editing The Note ', error);
          res.redirect('/notes')
        }
          
        }

        static async  update(req,res){
          let id= req.params.id;
          let title = req.body.title;
          let content = req.body.description;
          if(!title || !content ){
            res.redirect(`/notes/${id}/edit?message=Please Fill All Fields`);
            
          }else{
              try { 
                const updated = await noteModel.findByIdAndUpdate(id,{...req.body}); 
                
                res.redirect('/notes');  
              
              }catch (error) {
                console.log("Error in updating the data ", error);  
                res.redirect(`/notes/${id}/edit?message=${error}`);      
              }          
          }        
        }   
  
         
           

        
       
      

  
   
    }

  export  default  NoteController ;

  