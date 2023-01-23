import { Container, Grid, IconButton, Rating, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import CreditsThumb from "@components/CreditsThumb";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "context/AuthContext";
import { db } from "config/firebase";
import { like22 } from "components/LikeHandler/LikeHandler";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const gradientBorder = {
  styles: {
    position: "relative",
    background: "transparent",
    color: "#fff",
    backgroundClip: "padding-box",
    border: "solid 4px transparent",
    borderRadius: "0.8rem",
    zIndex: "10",
    "&:before": {
      content: "''",
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      zIndex: "-1",
      opacity: "0.9",
      margin: "-10px",
      borderRadius: "inherit",
      background: "linear-gradient(to left, #01b4e4, #90cea1)",
    },
  },
};

function MovieDetailPage() {
  const router = useRouter();
  const  {movieid}  = router.query;
  const [movie, setMovie]: any = useState([]);
  const [like, setLike] = useState(Boolean);
  const { user } = useAuth();

  useEffect(() => {
    if (movieid) {
      try {
        fetch(
          `https://api.themoviedb.org/3/movie/${movieid}?api_key=${API_KEY}&language=en-US`
        )
          .then((res) => res.json())
          .then((data) => {
            setMovie(data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [movieid]);
  const [credits, setCredits]: any = useState();

  useEffect(() => {
    if (movieid) {
      try {
        fetch(
          `https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=${API_KEY}&language=en-US`
        )
          .then((res) => res.json())
          .then((data) => {
            setCredits(data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [movieid]);

  const hey = Array.isArray(movieid) ? movieid[0] : movieid 
  const id = parseInt(hey ?? "0")

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "users", user.uid, "likedMovies"),
        where("id", "==", id)
      );
      getDocs(q).then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          setLike(true);
        } else {
          setLike(false);
        }
      });
    }
  }, [user, movie]);


  const LikeMovieHandler = like22(user, like, movie, setLike);

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundImage: `url(${
          movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : "/NoneBackdrop.webp"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white",
        height: "100vh",
        width: "100%",
        margin: "0 auto",
        padding: "0",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={2}
          md={1}
          sx={{
            marginLeft: "5%",
          }}
        >

          <IconButton
            sx={{
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": {
                color: "#01b4e4",
              },
            }}
            onClick={LikeMovieHandler}
          >
            {like ? <FavoriteIcon color="primary" /> : <FavoriteIcon />}
          </IconButton>
          <Image
            src={
              movie.poster_path ?`https://image.tmdb.org/t/p/original${movie.poster_path}`
                : "/NonePoster.webp"
            }
            height={500}
            width={333}
            alt={`${movie.title}`}
            priority
            style={{
              borderRadius: "10px",
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
            }}
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            "> *": {
              padding: "0.5em 0",
            },
            marginLeft: "15%",
          }}
          item
          xs={6}
          md={8}
        >
          <Typography sx={{ maxWidth: "900px" }} variant="h4">
            {movie.title}
          </Typography>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            {movie.genres &&
              movie.genres.map((genre: any) => {
                return (
                  <Typography
                    key={genre.id}
                    sx={{
                      margin: "0 0.5em",
                      padding: "0.01rem 0.5em 0.01rem 0.5em",
                      ...gradientBorder.styles,
                    }}
                    variant="body1"
                  >
                    {genre.name}
                  </Typography>
                );
              })}
          </Grid>
          <Typography variant="body2">
            Release Date: {movie.release_date}
          </Typography>
          <Rating name="read-only" value={movie.vote_average / 2} readOnly />
          <Typography variant="body1" sx={{ maxWidth: "600px" }}>
            {movie.overview}
          </Typography>
          <Container
            maxWidth={"xl"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: "2%",
            }}
          >
            <CreditsThumb credits={credits} />
          </Container>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MovieDetailPage;
