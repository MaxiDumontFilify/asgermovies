import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from '@mui/material';
    const BASE_URL = "https://image.tmdb.org/t/p/original";


export default function RecipeReviewCard(results:any) {
    const movie = results.result
    console.log(movie)
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 300,
        borderRadius: "10px",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        "&:hover": {
            boxShadow: "0 0 10px 0 #fff",
        },
    }}>
        <CardHeader
        title={movie.title.substring(0,16) || movie.original_title}
        subheader={movie.release_date || movie.first_air_date}
        />
      <Link href={`/dashboard/${movie.id}`}>
      <CardMedia
        component="img"
        height="194"
        src={`${BASE_URL}${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
      />
        </Link>
        <CardContent>
        <Typography variant="body2" color="text.secondary" >
            {movie.overview.substring(0, 100)+"..."}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>

    </Card>
  );
}
