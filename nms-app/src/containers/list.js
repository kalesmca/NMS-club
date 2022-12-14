import React,{ useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";


const ListComponent = () =>{
    const usersCollectionRef = collection(db, "marathon");

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(usersCollectionRef);
          let dataList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

          console.log('data::', data, dataList);
        };
    
        getUsers();
      }, []);
    return(
        <div>ListComponent</div>
    )
}

export default ListComponent;