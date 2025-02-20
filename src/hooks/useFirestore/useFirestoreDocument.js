import { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";

// 문서 조회 훅
export function useFirestoreGetDocument() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getDocument(collectionName, id, callback = null) {
    try {
      setLoading(true);
      setError(null);
      const docSnapshot = await getDoc(doc(db, collectionName, id));
      if (docSnapshot.exists()) {
        const documentData = { id: docSnapshot.id, ...docSnapshot.data() };
        setData(documentData);
        if (callback) callback(documentData);
      } else {
        setError("Document does not exist");
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, getDocument };
}

// 메인 컬렉션에 데이터 추가하는 훅
export function useFirestoreAddData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function addData(collectionName, newData, callback = null) {
    try {
      setLoading(true);
      setError(null);
      const docRef = await addDoc(collection(db, collectionName), newData);
      const addedData = { ...newData, id: docRef.id };
      setData(addedData);
      if (callback) callback(addedData);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, addData };
}

// 메인 컬렉션에 데이터 업데이트하는 훅
export function useFirestoreUpdateData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function updateData(collectionName, id, newData, callback = null) {
    try {
      setLoading(true);
      setError(null);
      await updateDoc(doc(db, collectionName, id), newData);
      const updatedData = { ...newData };
      setData(updatedData);
      if (callback) callback(updatedData);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, updateData };
}

// 메인 컬렉션에 데이터 삭제하는 훅
export function useFirestoreDeleteData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function deleteData(collectionName, id, callback = null) {
    try {
      setError(null);
      await deleteDoc(doc(db, collectionName, id));
      setData(id);
      if (callback) callback(id);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  return { data, error, deleteData };
}

// 서브컬렉션에 데이터 추가하는 훅 (함수명: addSubData)
export function useFirestoreAddSubData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * @param {string} parentCollectionName - 예: "members"
   * @param {string} parentId - 부모 문서의 ID
   * @param {string} subcollectionName - 예: "contracts" 또는 "payments"
   * @param {object} newData - 추가할 데이터
   * @param {function} callback - 데이터 추가 후 실행할 콜백
   */
  async function addSubData(
    parentCollectionName,
    parentId,
    subcollectionName,
    newData,
    callback = null
  ) {
    try {
      setLoading(true);
      setError(null);
      // 부모 문서의 참조 생성 후, 서브컬렉션 참조 생성
      const subCollectionRef = collection(
        doc(db, parentCollectionName, parentId),
        subcollectionName
      );
      const docRef = await addDoc(subCollectionRef, newData);
      const addedData = { ...newData, id: docRef.id };
      setData(addedData);
      if (callback) callback(addedData);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, addSubData };
}
