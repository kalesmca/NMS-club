import React,{useState} from "react";
import { db } from "../firebase-config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
import { async } from "@firebase/util";

const initObj = {
    name: "",
    mobile: "",
    dob:"",
    isEditMode: false
}
const RegistrationComponent = () =>{
    const [obj, setObj] = useState(initObj)
    const usersCollectionRef = collection(db, "marathon");

    const addUser = async() =>{
        await addDoc(usersCollectionRef, obj);
    }
    return(
        <div>RegistrationComponent
            <div>
                <label>User Name</label>
                <input value={obj.name} onChange={(e)=>setObj({...obj, ...{name:e.target.value}})}/>

            </div>
            <div>
                <label>Mobile Number</label>
                <input value={obj.mobile} onChange={(e)=>setObj({...obj, ...{mobile: parseInt(e.target.value)}})}/>

            </div>
            <div>
                <button onClick={()=>{addUser()}}>Add</button>
            </div>
        </div>
    )
}

export default RegistrationComponent;