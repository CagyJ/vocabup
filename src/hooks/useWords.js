import { get, getDatabase, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useWords = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetchWords(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchWords = async (id) => {
    const db = getDatabase();
    const wordRef = ref(db, "set/" + id + "/words");
    const wordQuery = query(wordRef);

    const answersRef = ref(db, "answers/" + id + "/answers");
    const answersQuery = query(answersRef);

    try {
      setError(false);
      setLoading(true);

      const snapshotWords = await get(wordQuery);
      const snapshotAnswers = await get(answersQuery);

      setLoading(false);

      if (snapshotWords.exists() && snapshotAnswers.exists()) {
        const questions = [];
        const words = [...Object.values(snapshotWords.val())];
        const answers = [...Object.values(snapshotAnswers.val())];
        for (var i = 0; i < words.length; i++) {
          questions.push({
            title: words[i],
            options: getRandomOptions(answers, i),
          });
        }
        console.log(questions);
        setWords((prevWords) => {
          return [...prevWords, ...questions];
        });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  };

  const getRandomOptions = (all, curIdx) => {
    const options = [{ title: all[curIdx] }];
    var last = curIdx;
    for (var i = 0; i < 3; i++) {
      var rdm = Math.floor(Math.random() * all.length);
      while (rdm === last) {
        rdm = Math.floor(Math.random() * all.length);
      }
      last = rdm;
      options.push({ title: all[rdm] });
    }
    return shuffle(options);
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return {
    loading,
    error,
    words,
  };
};

export default useWords;
