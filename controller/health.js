const health = (req,res) => {
    try{
        res.status(201);
        res.send("Hello");
        console.log("Connected")
    } catch(err){
        res.status(404);
        res.send("error");
        console.log("error")
    }
}

export default health;