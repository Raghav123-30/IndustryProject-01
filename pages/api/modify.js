import { app, db } from "../../firebase";
import { doc,  updateDoc } from "firebase/firestore";
export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const body = JSON.parse(req.body);
      console.log(body)
      const docRef = doc(db, "Operator", body.id);
      await updateDoc(docRef, {
        fullName: body.fullName,
        address: body.address,
        adharNumber: body.adharNumber,
        phone: body.phone,
        location: body.location,
      }).then(() => {
        res.status(200).json({
          message: "SUCCESS",
        });
      });
    } catch (error) {
      res.status(500).json({
        message: "FAILED",
      });
    }
  }
}
