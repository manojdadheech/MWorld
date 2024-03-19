import express from  'express';
import NoteController from '../controller/notecontroller.js';
import userController from '../controller/usercontroller.js';
const route=express.Router();
route.use(userController.authenticateUser);
//get all notes of a particular user
route.get('/notes',NoteController.getNotes)
route.post('/notes',NoteController.createNote)
route.get('/notes/:id/delete',NoteController.deleteNote)
route.get('/notes/:id/edit',NoteController.edit)
route.post('/notes/:id/edit',NoteController.update)
    
export  default route;