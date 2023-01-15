const express=require("express");
const  noteRouter=express.Router()
const {NoteModel}=require("../models/Note.model")
noteRouter.get("/",async(req,res)=>{
const note=await NoteModel.find()
    res.send(note)
})

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const new_note=new NoteModel(payload)
        await new_note.save()
        res.send("Created the note")    
    }
    catch(err){
console.log(err)
res.send({"msg":"somthing went wrong"})
    }
    
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const id = req.params.id;
    const payload = req.body;
    const note=await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try {
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"you are not authorised"})
        }else{
            await NoteModel.findByIdAndUpdate({ "_id": id }, payload)
        res.send(`updated the note whose id is ${id}`)
        }
    }

    catch (err) {
        console.log(err)
        res.send("err: somthing went wrong")
    }
})
noteRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;

    const note=await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try {
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"you are not authorised"})
        }else{
            await NoteModel.findByIdAndDelete({ "_id": id })
        res.send(`deleted the note whose id is ${id} `)

        }
    }

    catch (err) {
        console.log(err)
        res.send("err: somthing went wrong")
    }
})
module.exports={noteRouter}