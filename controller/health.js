const health = (req,res) => {
    try{
        res.status(201);
        res.send("Hello Amin, this is backend with nodejs and postgres");
        console.log("Connected")
    } catch(err){
        res.status(404);
        res.send("error");
        console.log("error")
    }
}

export default health;