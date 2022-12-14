import React, { useState, useEffect } from "react";
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

const ListComponent = () => {
  const usersCollectionRef = collection(db, "marathon");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      let dataList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUserList(dataList);
      console.log("data::", data, dataList);
    };

    getUsers();
  }, []);
  const switchMode = async (index) => {
    let tempUserList = [...userList];
    tempUserList[index].isEditMode = !tempUserList[index].isEditMode;
    setUserList(tempUserList)
  };
  
  useEffect(()=>{
    console.log('usss:',userList)
  })
  const onChangeList = (e, index) =>{
    console.log(e)
    let tempUserList = [...userList];
    let obj = tempUserList[index]
    obj[e.target.name] = e.target.value;
    tempUserList[index] = obj;
    setUserList(tempUserList);

  }
  const updateUser = async(index) =>{
    console.log(userList[index])
    const userDoc = doc(db, "marathon", userList[index].id);
    const newFields = { name: userList[index].name,mobile: userList[index].mobile };
    await updateDoc(userDoc, newFields);
    switchMode(index)

  }

  const deleteUser = async (index) => {
    const userDoc = doc(db, "marathon", userList[index].id);
    let tempUserList = [...userList]
    tempUserList.splice(index,1)
    setUserList(tempUserList)
    await deleteDoc(userDoc);
  }
  return (
    <div>
      <span>User List</span>
      <table>
        <tr>
          <th>SNO</th>
          <th>Name</th>
          <th>Mobile Number</th>
          <th>Actions</th>
        </tr>

        {userList && userList.length
          ? userList.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.isEditMode ? <input name="name" value={user.name} onChange={(e)=> onChangeList(e, index)}/> : user.name}</td>
                  <td>{user.isEditMode ? <input name="mobile" value={user.mobile} onChange={(e)=> onChangeList(e, index)} /> : user.mobile}</td>
                  <td>
                    {
                     user.isEditMode ?  <button onClick={() => updateUser(index)}>Update</button>  :<button onClick={() => switchMode(index)}>Edit</button>
                    }
                    <button onClick={() => deleteUser(index)}>Delete</button>
                  </td>
                </tr>
              );
            })
          : ""}
      </table>
    </div>
  );
};

export default ListComponent;
