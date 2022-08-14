import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";

const useVocabSets = (page) => {
  console.log("useVocabSets starts");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [vocabSets, setVocabSets] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    console.log("useEffect starts");
    fetchSets(page);
  }, [page]);

  const fetchSets = async (page) => {
    console.log("fetchSets starts");
    const db = getDatabase();
    const setsRef = ref(db, "sets");

    console.log("Page: " + page);

    const setsQuery = query(
      setsRef,
      orderByKey(),
      startAt(String(page)),
      limitToFirst(12)
    );

    try {
      setError(false);
      setLoading(true);

      const snapshot = await get(setsQuery);
      console.log(snapshot);
      setLoading(false);

      if (snapshot.exists()) {
        console.log(snapshot.val());
        setVocabSets((prevSets) => {
          if (prevSets.length === 0) {
            return [...Object.values(snapshot.val())];
          }
          return isEqual(prevSets, [...Object.values(snapshot.val())])
            ? [...prevSets]
            : [...prevSets, ...Object.values(snapshot.val())];
        });
      } else {
        setHasMore(false);
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
    hasMore,
  };
};

const isEqual = (one, another) => {
  const len1 = one.length;
  const len2 = another.length;
  for (var i = 0; i < len1; i++) {
    const o1 = one[i];
    const o2 = another[i];
    const isSame = o1.id === o2.id && o1.title === o2.title;
    if (!isSame) {
      return false;
    }
  }
  return true && len1 === len2;
};

export default useVocabSets;
