import { sha256 } from "crypto-hash";

export default async function(req,res){
    const hashValue = await sha256('technology');
    if(req.method == 'POST'){
        const body = JSON.parse(req.body);
        const hash = body.hash;
        if(hash == hashValue){
            res.status(200).json({
                auth : true
            })
        }
        else{
            res.status(500).json({
                auth : false
            })
        }
    }
}