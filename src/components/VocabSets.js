import { Link } from "react-router-dom";
import classes from "../styles/VocabSets.module.css";
import VocabSet from "./VocabSet";

const VocabSets = () => {
  return (
    <div className={classes.sets}>
      <Link to="/quiz">
        <VocabSet />
      </Link>
      <Link to="/quiz">
        <VocabSet />
      </Link>
      <Link to="/quiz">
        <VocabSet />
      </Link>
      <Link to="/quiz">
        <VocabSet />
      </Link>
      <Link to="/quiz">
        <VocabSet />
      </Link>
    </div>
  );
};

export default VocabSets;
