import FlipMove from "react-flip-move";
import styles from '../styles/Home.module.css'
import RecipeReviewCard from "./card";

const List = (result:any) => {
    
    const results = result.results.results
    return (
        <FlipMove className={styles.poster}>
            {results.map((result:any) => (
                <RecipeReviewCard key={result.id} result={result} />
            ))}
        </FlipMove>
    );
};

export default List;