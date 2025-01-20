import React from "react";
import { useFirestoreAddData } from "../../hooks/useFirestore/index";
import FormCoach from "./FormCoach";

const NewCoach = () => {
  const addData = useFirestoreAddData();
  const initialValue = {
    name: "",
    phone: "",
    gender: "",
    height: "",
    weight: "",
    zoneCode: "",
    mainAddress: "",
    extraAddress: "",
    memo: "",
    pic: "https://firebasestorage.googleapis.com/v0/b/gymcore-1.firebasestorage.app/o/asset%2Fdefault_avatar.jpg?alt=media&token=90543b81-c9e3-4983-a3ef-fd8014487f08",
  };

  const onAdd = async (value) => {
    try {
      await addData.addData("coaches", value);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="p-6 bg-white rounded-lg shadow-lg w-full"
      style={{ maxWidth: "800px" }}
    >
      <h2 className="text-xl font-semibold mb-6 text-center">코치 등록</h2>
      <FormCoach initialValue={initialValue} onSubmit={onAdd} />
    </div>
  );
};

export default NewCoach;
