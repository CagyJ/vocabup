import { get, getDatabase, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useAnswers = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetchAnswers(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchAnswers = async (id) => {
    const db = getDatabase();
    const answersRef = ref(db, "answers/" + id + "/answers");
    const answersQuery = query(answersRef);

    try {
      setError(false);
      setLoading(true);

      const snapshotAnswers = await get(answersQuery);

      setLoading(false);

      if (snapshotAnswers.exists()) {
        setAnswers((prevAnswers) => {
          return [...Object.values(snapshotAnswers.val())];
        });
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
    answers,
  };
};

export default useAnswers;
