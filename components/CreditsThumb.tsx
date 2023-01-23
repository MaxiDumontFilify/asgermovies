import Image from "next/image";
import { FunctionComponent, Key } from "react";
import {
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
} from "@mui/material";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
const BASE_URL = "https://image.tmdb.org/t/p/original";

const CreditsThumb: React.FunctionComponent<any> = ({ credits }) => {
  const cast = credits?.cast;
  return (
    <Card
      sx={{
        maxWidth: "90%",
        maxHeight: "300px",
        borderRadius: "10px",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        backgroundColor: "rgba(34, 43, 128, 0.559)",
        "&:hover": {
          boxShadow: "0 0 10px 0 #fff",
        },
      }}
    >
      <CardHeader
        sx={{
          color: "white",
          fontWeight: "bold",
          fontSize: "1.5rem",
          fontFamily: "Roboto",
        }}
        title="Cast Members"
      />
      <CardContent>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          slidesPerGroup={1}
          watchSlidesProgress={true}
          breakpoints={{
            50: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1440: {
              slidesPerView: 4,
            },
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          style={{ padding: "0.2em" }}
          className="mySwiper"
        >
          {cast?.map(
            (Cast: {
              id: Key | null | undefined;
              name: string;
              profile_path: any;
              character: string;
            }) => (
              <SwiperSlide key={Cast.id}>
                {({ isVisible }) => (
                  <Grid>
                    {isVisible && (
                      <Grid>
                        <Card
                          sx={{
                            maxWidth: 150,
                            backgroundColor: "rgba(83, 116, 170, 0.807)",
                            borderRadius: "10px",
                            boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
                            transition: "0.3s",
                            "&:hover": {
                              boxShadow: "0 0 10px 0 #fff",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              color: "white",
                              fontWeight: "bold",
                              fontSize: "1rem",
                            }}
                          >
                            {Cast.name.substring(0, 16)}
                          </Typography>
                          <CardMedia
                            component="img"
                            height="140"
                            src={`https://image.tmdb.org/t/p/w500${Cast.profile_path}`}
                            alt={cast.name}
                          />
                          <CardActions disableSpacing></CardActions>
                          <Typography
                            sx={{
                              color: "white",
                              fontWeight: "bold",
                              fontSize: "1rem",
                            }}
                          >
                            {Cast.character.substring(0, 16)}
                          </Typography>
                        </Card>
                      </Grid>
                    )}
                  </Grid>
                )}
              </SwiperSlide>
            )
          )}
        </Swiper>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
};

export default CreditsThumb;
