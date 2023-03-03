import { addDoc,collection } from "firebase/firestore"
import {app,db} from '../../firebase'
export default async function handler(req,res){
    if(req.method == 'POST'){
        const operatorCollection = collection(db,'Location');
        const body = JSON.parse(req.body);
        try{
            await addDoc(operatorCollection,{
                location: body.location,
                owner : body.owner,
                phoneno : body.phoneno,
                adhar: body.adhar
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