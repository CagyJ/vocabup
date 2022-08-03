import classes from "../styles/VocabSets.module.css";
import VocabSet from "./VocabSet";

const VocabSets = () => {
  return (
    <div className={classes.sets}>
      <VocabSet />
      <VocabSet />
      <VocabSet />
      <VocabSet />
      <VocabSet />
      <VocabSet />
      <VocabSet />
    </div>
  );
};

export default VocabSets;
