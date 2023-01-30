import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid, Link } from "@mui/material";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { likeMovie } from "../Handlers/LikeHandler/LikeHandler";
import { RatingCircle } from "./ratingCircle/ratingCircle";
import { Movie } from "utils/types";

const BASE_URL = "https://image.tmdb.org/t/p/original";


export default function RecipeReviewCard({ result }: { result: Movie }) {
  const movie = result
  const value = movie.vote_average * 10;
  const [like, setLike] = useState(false);
  const { user } = useAuth();

  React.useEffect(() => {
    const GetMovieLikes = async () => {
      const ref = collection(db, "users", user.uid, "likedMovies");
      const q = query(ref, where("id", "==", movie.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(() => {
        setLike(true);
      });
    };
    GetMovieLikes();
  }, [user, movie.id]);

  const LikeMovieHandler = likeMovie(user, like, movie, setLike);

  return ( 
    <Card
      sx={{
        maxWidth: 220,
        borderRadius: "10px",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.9)",
        transition: "0.3s",
        margin: "1em",
        "&:hover": {
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
        },
      }}
      key={movie.id}
    >
      <Link href={`/dashboard/${movie.id}`}>
        <CardMedia
          component="img"
          height="194"
          src={`${BASE_URL}${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          marginTop: "0.5em",
          marginRight: "0.5em",
        }}
      >
        {RatingCircle(value)}
        <IconButton
          sx={{
            color: "white",
            marginLeft: "5.1em",
            backgroundColor: "rgba(0,0,0,0.5)",

            "&:hover": {
              color: "#01b4e4",
            },
          }}
          onClick={() => {
            LikeMovieHandler();
          }}
        >
          {like ? <FavoriteIcon color="primary" /> : <FavoriteIcon />}
        </IconButton>
      </Grid>
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: "0.8rem",
            color: "black",
            fontWeight: "bold",
          }}
        >
          {movie.title || movie.original_title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: "0.7rem",
            color: "grey",
            fontWeight: "bold",
          }}
        >
          {movie.release_date}
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}


