const express = require("express");
const router =express.Router();
const Safe = require('../models/Safe');
router.get('/', async (req,res)=>{
    try{
        const safes = await Safe.find();
        res.status(200).json(safes);
    }catch(err){
        res.status(500).json({message:err});
    }
});

router.get('/:safeId', async (req,res)=>{
    try{
        const safe = await Safe.find({_id:req.params.safeId});
        res.status(200).json(safe);
    }catch(err){
        res.status(500).json({message:err});
    }
});
router.get('/get-secrets/:safeId', async (req,res)=>{
    try{
        const safe = await Safe.findOne({_id:req.params.safeId});
        res.status(200).json(safe);
    }catch(err){
        res.status(500).json({message:err});
    }
});

router.post('/',async (req,res)=>{
    const safe = new Safe({
        name:req.body.name,
        owner:req.body.owner,
        type:req.body.type,
        description:req.body.description,
        secrets:[]
    });
    try{
        const savedSafe = await safe.save();
        res.status(200).json(savedSafe);
    }catch (err){
        res.status(500).json({message:err});
    }

});

router.delete('/:safeId', async (req,res)=>{
    try{
        const deleteSafes = await Safe.remove({_id:req.params.safeId});
        res.status(200).json(deleteSafes);
    }catch(err){
        res.status(500).json({message:err});
    }
});

router.patch('/:safeId', async (req,res)=>{
    try{
        const updateSafes = await Safe.updateOne(
            {_id:req.params.safeId},
            {$set:{
                name:req.body.name,
                owner:req.body.owner,
                type:req.body.type,
                description:req.body.description
            }}
        );
        res.status(200).json(updateSafes);
    }catch(err){
        res.status(500).json({message:err});
    }
});

router.patch('/create-secret/:safeId', async (req,res)=>{
    try{
        console.log(req);
        const updateSafes = await Safe.updateOne(
            {_id:req.params.safeId},
            {$push:{
                secrets:req.body.secret
            }}

        );
        res.status(200).json(updateSafes);
    }catch(err){
        res.status(500).json({message:err});
    }
});
router.delete('/delete-secret/:safeId/:value', async (req,res)=>{
    try{
        const pullSafes = await Safe.updateOne(
            {_id:req.params.safeId},
            {$pull : {"secrets" : req.params.value}}
        );
        res.status(200).json(pullSafes);
    }catch(err){
        res.status(500).json({message:err});
    }
});


module.exports = router;