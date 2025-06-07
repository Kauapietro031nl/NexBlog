import { useState, useEffect } from "react";
import { db } from '../firebase/config'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where
} from "firebase/firestore";

export const useFetchDocuments = (docColletion, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);


  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);

      const collectionRef = collection(db, docColletion);

      try {
        let q;


        if (search) {
          q = query(
            collectionRef,
            where("tagsArray", "array-contains", search),
            orderBy("createDat", "desc")
          );
        } else if (uid) {
          q = query(
            collectionRef,
            where("uid","==",uid),
            orderBy("createDat", "desc")
          );

        } else {
          q = query(collectionRef, orderBy("createDat", "desc"));
        }


        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
          setLoading(false);
        });

        return () => unsubscribe();

      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
        setError(error.message);
        setLoading(false);
      }
    }

    loadData();

  }, [docColletion, search, uid, cancelled]);


  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
