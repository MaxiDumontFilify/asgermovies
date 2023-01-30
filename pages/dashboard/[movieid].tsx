import { Container, Grid, IconButton, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Cast from "@components/Cast";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "context/AuthContext";
import { db } from "config/firebase";
import { likeMovie } from "Handlers/LikeHandler/LikeHandler";
import { RatingCircle } from "@components/ratingCircle/ratingCircle";
import NewComment from "@components/Comments/CreateComment";
import { Movie, MovieCredits, Genre } from "utils/types";
import AllComments from "@components/Comments/AllComments";

function MovieDetailPage() {
  const router = useRouter();
  const {movieid} = router.query;
  const hey = Array.isArray(movieid) ? movieid[0] : movieid;
  const id = parseInt(hey ?? "0");
  const {user} = useAuth();

  // Get movie details
  const [movie, setMovie] = useState<Movie>([] as any);
  useEffect(() => {
    const getMovie = async () => {
      const request: Movie = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      ).then((res) => res.json());
      return request;
    };
    getMovie().then((data) => setMovie(data));
  }, [id]);

  // Get movie credits
  const [credits, setCredits] = useState<MovieCredits>([] as any);
  useEffect(() => {
    const getCredits = async () => {
      const request: MovieCredits = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      ).then((res) => res.json());
      return request;
    };
    getCredits().then((data) => setCredits(data));
  }, [id]);
  const value = movie.vote_average * 10;

  // Get movie likes & set like state
  const [like, setLike] = useState(Boolean);
  useEffect(() => {
    const GetMovieLikes = async () => {
      const ref = collection(db, "users", user.uid, "likedMovies");
      const q = query(ref, where("id", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(() => {
        setLike(true);
      });
    };
    GetMovieLikes();
  }, [user, id]);
  const LikeMovieHandler = likeMovie(user, like, movie, setLike);

  // Get movie comments
  const [comments, setComments] = useState<Array<DocumentData>>([]);
  useEffect(() => {
    const GetMovieComments = async () => {
      const ref = collection(db, "Movies", id.toString(), "Comments");
      const q = query(ref);
      const querySnapshot = getDocs(q);
      querySnapshot.then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setComments(data);
      });
    };
    GetMovieComments();
  }, [id]);

  return (
    <>
      {/* PC */}
      <Grid
        sx={{
          display: { xs: "none", md: "flex" },
          backgroundImage: `url(${`https://image.tmdb.org/t/p/original${movie.backdrop_path}`})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0,0,0,0.7)",
          color: "white",
          height: "100vh",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            marginTop: "3em",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Movie Image */}
          <Grid
            item
            xs={2.7}
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              height={450}
              width={300}
              alt={`${movie.title}`}
              priority
              style={{
                borderRadius: "10px",
                boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
                marginLeft: "4em",
              }}
            />
          </Grid>
          {/* Movie Details */}
          <Grid
            item
            xs={5.5}
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "left",
                width: "100%",
                "> *": {
                  padding: "0.7em 0",
                },
                marginLeft: "2.5em",
              }}
            >
              <Typography
                sx={{
                  maxWidth: "900px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "white",
                  textShadow: "0 0 10px rgba(0,0,0,0.5)",
                  marginBottom: "0.5em",
                }}
                variant="h4"
              >
                {movie.title + " (" + movie.release_date?.slice(0, 4) + ")"}
                <Grid sx={{ display: "flex", justifyContent: "left" }}>
                  {movie.genres &&
                    movie.genres.map((genre: Genre) => {
                      return (
                        <Typography key={genre.id} sx={{}} variant="body1">
                          {genre.name} .
                        </Typography>
                      );
                    })}
                </Grid>
              </Typography>

              <Grid sx={{ display: "flex", justifyContent: "left" }}>
                {RatingCircle(value)}
                <IconButton
                  sx={{
                    color: "white",
                    marginLeft: "1em",
                    backgroundColor: "rgba(0,0,0,0.5)",

                    "&:hover": {
                      color: "#01b4e4",
                    },
                  }}
                  onClick={LikeMovieHandler}
                >
                  {like ? <FavoriteIcon color="primary" /> : <FavoriteIcon />}
                </IconButton>
              </Grid>

              <Typography variant="body1" sx={{ maxWidth: "600px" }}>
                {movie.overview}
              </Typography>
              <Grid>
                Company:
                {movie.production_companies &&
                  movie.production_companies.map((company: Genre) => {
                    return (
                      <Typography
                        key={company.id}
                        sx={{ fontWeight: "bold" }}
                        variant="body1"
                      >
                        {company.name}
                      </Typography>
                    );
                  })}
              </Grid>
              <Container
                sx={{
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.4em",
                    fontWeight: "bold",
                    color: "white",
                    textShadow: "0 0 10px rgba(0,0,0,0.5)",
                    marginBottom: "0.5em",
                  }}
                  variant="h4"
                >
                  Top Billed Cast
                </Typography>
                <Cast credits={credits} />
              </Container>
            </Grid>
          </Grid>
          {/* Comments section */}
          <Grid item xs>
            <Container>
              <Grid component={Paper}>
                <NewComment Moviesid={id} />
              </Grid>

              <Grid
                component={Paper}
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  bgcolor: "background.paper",
                  position: "relative",
                  overflow: "auto",
                  maxHeight: 300,
                  "& ul": { padding: 0 },
                }}
              >
                <AllComments comments={comments} />
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Grid>

      {/* Movile Device*/}
      <Grid sx={{ display: { xs: "flex", md: "none" } }}>
        <Grid
          container
          sx={{
            display: "flex",
            marginTop: "3em",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Movie Image and Data */}
          <Grid
            item
            sx={{
              backgroundImage: `url(${`https://image.tmdb.org/t/p/original${movie.backdrop_path}`})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundBlendMode: "overlay",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              justifyContent: "left",
              alignItems: "center",
              display: "flex",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              height={200}
              width={140}
              alt={`${movie.title}`}
              priority
              style={{
                borderRadius: "10px",
                boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
              }}
            />

            <Grid>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "white",
                  textShadow: "0 0 10px rgba(0,0,0,0.5)",
                  marginBottom: "1em",
                  marginLeft: "0.5em",
                }}
              >
                {movie.title + " (" + movie.release_date?.slice(0, 4) + ")"}
              </Typography>

              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  marginLeft: "0.5em",
                }}
              >
                {RatingCircle(value)}
                <IconButton
                  sx={{
                    color: "white",
                    marginLeft: "1em",
                    backgroundColor: "rgba(0,0,0,0.5)",

                    "&:hover": {
                      color: "#01b4e4",
                    },
                  }}
                  onClick={LikeMovieHandler}
                >
                  {like ? <FavoriteIcon color="primary" /> : <FavoriteIcon />}
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {/* Movioe Overview */}
          <Grid
            item
            sx={{
              width: "100%",
              marginTop: "1em",
              display: "flex",
              justifyContent: "center",
              color: "black",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                width: "100%",
                marginBottom: "1.5em",
              }}
            >
              {movie.overview?.substring(0, 500)}
            </Typography>
          </Grid>
          {/* Cast and company */}
          <Grid
            item
            sx={{
              width: "100%",
              marginTop: "1em",
              marginBottom: "1em",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Container
              sx={{
                flexWrap: "wrap",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
                borderRadius: "10px",
                boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "1em",
                  fontWeight: "bold",
                  color: "black",
                  marginBottom: "0.5em",
                  marginLeft: "0.5em",
                }}
                variant="h4"
              >
                Top Billed Cast
              </Typography>
              <Cast credits={credits} />
            </Container>
            <Grid>
              <Container
                sx={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  borderRadius: "10px",
                  transition: "0.3s",
                  "&:hover": {},
                }}
              >
                Company:
                {movie.production_companies &&
                  movie.production_companies.map((company: Genre) => {
                    return (
                      <Typography
                        key={company.id}
                        sx={{ fontWeight: "bold" }}
                        variant="body1"
                      >
                        {company.name}
                      </Typography>
                    );
                  })}
              </Container>
            </Grid>
          </Grid>
          {/* Comment section */}      
          <Grid item xs>
            <Container>
              <Grid component={Paper}>
                <NewComment Moviesid={id} />
              </Grid>

              <Grid
                component={Paper}
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  bgcolor: "background.paper",
                  position: "relative",
                  marginTop: "1em",
                  overflow: "auto",
                  maxHeight: 300,
                  "& ul": { padding: 0 },
                }}
              >
                <AllComments comments={comments} />
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default MovieDetailPage;
