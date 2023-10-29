const logout = async (req, res ) =>{
    try{
        res.clearCookie("Authtoken");
        res.status(200);
        res.json({message:"logout sucessfully"});
    }
    catch(err){
        res.status(500).json(err.message);
    }
};
export default logout;