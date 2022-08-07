import { Link } from "react-router-dom";
import useVocabSets from "../hooks/useVocabSets";
import classes from "../styles/VocabSets.module.css";
import VocabSet from "./VocabSet";

const VocabSets = () => {
  const { loading, error, vocabSets } = useVocabSets();

  console.log(vocabSets);
  return (
    <div className={classes.sets}>
      {vocabSets.length > 0 &&
        vocabSets.map((set) => (
          <Link to="/quiz" key={set.id}>
            <VocabSet
              title={set.title}
              id={set.id}
              num={set.num}
              times={set.times}
            />
          </Link>
        ))}
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {!loading && vocabSets.length === 0 && <div>No data exists.</div>}
    </div>
  );
};

export default VocabSets;
