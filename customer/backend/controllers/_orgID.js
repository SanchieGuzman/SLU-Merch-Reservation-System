//to be implemented by stephen
const seeAllController = async(req, res)=>{
    const orgID = req.params.orgid;
    console.log(orgID);
    
    res.send('see all controller')
}

//to be implemented by leonhard
const viewProductController = async(req, res)=>{
    const orgID = req.params.orgid;
    const productID = req.params.prodid;
    console.log(orgID);
    console.log(productID);
    res.send('view product controller')
}

export  {seeAllController, viewProductController};