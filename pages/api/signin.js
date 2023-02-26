
import {app, auth} from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    const email = body.email;
    const password = body.password;
    try{
        await signInWithEmailAndPassword(auth, email,password).then(() => {
            

            res.status(200).json({
                message :'SUCCESSFULLY AUTHENTICATED THE USER',
                data : true
            })
        });
    }
    catch(error){
        res.status(500).json({
            message : "INVALID CREDENTIALS",
            data : false
        })
    }
  }
}
