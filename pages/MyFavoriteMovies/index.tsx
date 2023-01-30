import { Grid, Typography } from "@mui/material";
import { db } from "config/firebase";
import { useAuth } from "context/AuthContext";
import { collection, getDocs, query } from "firebase/firestore";
import Head from "next/head";
import { useEffect, useState } from "react";
import List from "../../components/List";
import { Movie } from "../../utils/types";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function MyFavoriteMovies() {
  const [id, setid] = useState<Array<number>>([]);

  //get all Movies that user liked
  const { user } = useAuth();
  useEffect(() => {
    const q = query(collection(db, "users", user.uid, "likedMovies"));
    const querySnapshot = getDocs(q);
    querySnapshot.then((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      const id: Array<number> = data.map((item) => item.id);
      setid(id);
    });
  }, []);

  //get all movies from id
  const [movieArray, setmovieArray] = useState<Array<Movie>>([]);
  useEffect(() => {
    const getMovie = async () => {
      const requests = id.map(async (id: any) => {
        const request: Movie = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        ).then((res) => res.json());
        return request;
      });
      const movieArray = await Promise.all(requests);
      setmovieArray(movieArray);
    };
    getMovie();
  }, [id]);

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        color: "white",
        padding: "20px",
      }}
    >
      <Head>
        <title>AsgerMovies</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "63%",
          borderRadius: "10px",
          backgroundColor: "#1976d2",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.9)",
          transition: "0.3s",
          margin: "1em",
          "&:hover": {
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
          },
        }}
      >
        <Typography
          variant="h4"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "white",
            textDecoration: "none",
          }}
        >
          My Favorite Movies
        </Typography>
        <Typography
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            fontFamily: "monospace",
            fontWeight: 700,
            color: "white",
            textDecoration: "none",
          }}
        >
          My Favorite Movies
        </Typography>
      </Grid>
      <List Movies={movieArray} />
    </Grid>
  );
}
