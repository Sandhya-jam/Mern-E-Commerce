import path from "path";
import express from "express";
import multer from "multer";

const router=express.Router()

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },

    filename:(req,file,cb)=>{
        const extname=path.extname(file.originalname)
        cb(null, `${file.filename}-${Date.now()}${extname}`);
    },
});

const fileFilter=(req,file,cb)=>{
    const filetypes=/jpe?g|png|webp/
    const mimetypes=/image\/jpe?g|image\/png|image\/webp/;

    const extname=path.extname(file.originalname).toLowerCase()
    const mimetype=file.mimetype

    if(filetypes.test(extname) && mimetypes.test(mimetype)){
        cb(null,true)
    }else{
        cb(new Error("Images Only"),false);
    }
};

const upload=multer({storage,fileFilter})
const uploadSingleImage=upload.single('image')

router.post('/',(req,res)=>{
    uploadSingleImage(req,res,(err)=>{
        if(err){
            console.error("Multer Error:", err);
            res.status(400).send({message:err.message})
        }else if(req.file){
            res.status(200).send({
                message:"Image Uploaded successfully",
                image:`/${req.file.path}`
            })
        }else{
            console.error("No file received");
            res.status(400).send({message:"No image file Provided"})
        }
    })
})

export default router;