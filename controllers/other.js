const notFound = (req,res)=>{
    res.status(404).json({
        success:false,
        message:"Api Not Found"
    });
};

export{
    notFound
}