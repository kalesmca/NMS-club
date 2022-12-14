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
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(usersCollectionRef);
          let dataList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setUserList(dataList);
          console.log('data::', data, dataList);
        };
    
        getUsers();
      }, []);
    return(
        <div>
            <span>User List</span>
            {
                userList && userList.length ? userList.map((user, index) =>{
                    return(
                        <div key={index}>
                            <div>
                                User Name : <span>{user.name}</span>
                            </div>
                            <div>
                                Mobile Number : <span>{user.mobile}</span>
                            </div>
                            
                        </div>
                    )
                }) : ""
            }
            
        </div>
    )
}

export default ListComponent;