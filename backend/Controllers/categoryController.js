import Category from '../models/categoryModel.js'
import asyncHandler from '../Middlewares/asyncHandler.js'

const createCategory=asyncHandler(async (req,res)=>{
    try {
        const {name}=req.body;
        
        if(!name){
            return res.json({error:"Name is Required"})
        }

        const existingCat=await Category.findOne({name})
        if(existingCat){
            return res.json({error:"Already exists"});
        }

        const category=await new Category({name}).save()
        res.json(category)

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})

const updateCategory=asyncHandler(async(req,res)=>{
   try {
     const {name}=req.body;
     const {categoryId}=req.params;

     const category=await Category.findOne({_id:categoryId})

     if(!category){
        return res.status(404).json({error:"Category not found"})
     }

     category.name=name;
     const updatedCategory=await category.save();
     res.json(updatedCategory);
   } catch (error) {
     console.log(error);
     res.status(500).json({error:"Internal server error"})
   }
})

const deleteCategory=asyncHandler(async (req,res)=>{
   try {
     const deleted=await Category.findByIdAndDelete(req.params.categoryId)
     res.json(deleted);
   } catch (error) {
     console.log(error)
     res.status(500).json({error:"Internal server Occured"})
   }
})

const listCategory=asyncHandler(async (req,res)=>{
   try {
      const all=await Category.find({});
      res.json(all);
   } catch (error) {
     console.log(error);
     return res.status(400).json(error.message);
   }
});

const readCategory=asyncHandler(async(req,res)=>{
  try {
     
    const category=await Category.findOne({_id:req.params.id});
    res.json(category);
    
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
})

export {createCategory,updateCategory,deleteCategory,
  listCategory,readCategory};