import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useVocabSets from "../hooks/useVocabSets";
import VocabSet from "./VocabSet";

const VocabSets = () => {
  const [page, setPage] = useState(() => 1);
  const { loading, error, vocabSets, hasMore } = useVocabSets(page);

  console.log(vocabSets);
  return (
    <div>
      {vocabSets.length > 0 && (
        <InfiniteScroll
          dataLength={vocabSets.length}
          hasMore={hasMore}
          loader="loading..."
          next={() => setPage(page + 12)}
        >
          {vocabSets.map((set) => (
            <Link to={`/quiz/${set.id}`} key={set.id}>
              <VocabSet
                title={set.title}
                id={set.id}
                num={set.num}
                times={set.times}
              />
            </Link>
          ))}
        </InfiniteScroll>
      )}
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {!loading && vocabSets.length === 0 && <div>No data exists.</div>}
    </div>
  );
};

export default VocabSets;
