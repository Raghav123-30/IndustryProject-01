import { app, db } from "../../firebase";
import { getDocs,collection } from "firebase/firestore";
export default async function handler(req, res) {
  if (req.method == "GET") {
    console.log("Hi from API")
    const documents = []
    const operatorCollectionRef = collection(db,'Operator');
    try {
        await getDocs(operatorCollectionRef).then((snapshots) => {
            snapshots.forEach((doc) => {
                const document = {
                    fullName : doc.data().fullName,
                    phone : doc.data().phone,
                    adharNumber : doc.data().adharNumber,
                    address : doc.data().address,
                    location : doc.data().location
                }
                console.log(document)
               documents.push(document);
            })
        }).then(() => {
            res.status(200).json({
                message : 'SUCCESS',
                data : documents
            })
        })
    } catch (error) {
        res.status(500).json({
            message:'FAILED',
            
        })
    }
  }
}
