import styles from '../styles/Home.module.css'
import RecipeReviewCard from "./card";
import { Movie} from "../utils/types";
import { Grid } from "@mui/material";

const List = ({ Movies }: { Movies: Array<Movie> }) => {
    return (
        <Grid className={styles.poster}>
        {Movies.map((Movie:Movie) => (
            <RecipeReviewCard key={Movie.id} result={Movie} />
        ))}
    </Grid>
    )
}

export default List;