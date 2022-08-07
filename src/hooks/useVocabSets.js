import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useVocabSets = () => {
  console.log("useVocabSets starts");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [vocabSets, setVocabSets] = useState([]);

  useEffect(() => {
    console.log("useEffect starts");
    fetchSets();
  }, []);

  const fetchSets = async () => {
    console.log("fetchSets starts");
    const db = getDatabase();
    const setsRef = ref(db, "sets");

    const setsQuery = query(setsRef, orderByKey());

    try {
      setError(false);
      setLoading(true);

      const snapshot = await get(setsQuery);
      console.log(snapshot);
      setLoading(false);
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setVocabSets((prevSets) => {
          return [...Object.values(snapshot.val())];
        });
      } else {
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  };
  return {
    loading,
    error,
    vocabSets,
  };
};

export default useVocabSets;
