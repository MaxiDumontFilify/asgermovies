import { Grid, Typography } from "@mui/material";
import Head from "next/head";
import sorov from "utils/sorov";
import List from "../../components/List";
import { Movie, request } from "../../utils/types";

export async function getServerSideProps() {
  const request: request = await fetch(
    `https://api.themoviedb.org/3${sorov.fetchTrending.url}`
  ).then((res) => res.json());
  return {
    props: {
      result: request.results,
    },
  };
}

export default function dashboard({ result }: { result: Array<Movie> }) {
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
          All Movies
        </Typography>
        <Typography
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "white",
            textDecoration: "none",
          }}
        >
          All Movies
        </Typography>
      </Grid>
      <List Movies={result} />
    </Grid>
  );
}
