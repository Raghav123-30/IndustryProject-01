import { addDoc,collection } from "firebase/firestore"
import {app,db} from '../../firebase'
export default async function handler(req,res){
    if(req.method == 'POST'){
        const operatorCollection = collection(db,'Operator');
        const body = JSON.parse(req.body);
        try{
            await addDoc(operatorCollection,{
                address : body.address,
                adharNumber : body.adharNumber,
                fullName : body.fullName,
                location : body.location,
                phone : body.phone
            }).then(() => {
                res.status(200).json({
                    message :'SUCCESS'
                })
            })
        }catch(error){
            res.status(500).json({
                message : 'FAILED'
            })
        }
    }
}