import {app,db} from "../../firebase";
import {doc, deleteDoc} from "firebase/firestore"
export default async function handler(req,res){
    if(req.method == "POST"){
        const body = JSON.parse(req.body);
        const id = body.id;
        const docRef = doc(db, "Operator", body.id);
        try{
            await deleteDoc(docRef).then(() => {
                res.status(200).json({
                    message :'SUCCESSFULLY DELETED THE OPERATOR'
                })
            })
        }catch{
            res.status(500).json({
                message : "SOMETHING WENT WRONG"
            })
        }
    }
}