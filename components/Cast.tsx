import { Key } from "react";
import {
  Typography,
  Grid,
  Card,
  CardActions,
  CardMedia,
} from "@mui/material";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

const CreditsThumb: React.FunctionComponent<any> = ({ credits }) => {
  const cast = credits?.cast;
  return (
        <Swiper
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
                            borderRadius: "10px",
                            boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
                            transition: "0.3s",
                            "&:hover": {
                              boxShadow: "0 0 10px 0 #fff",
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="190"
                            width="140"
                            src={`https://image.tmdb.org/t/p/w500${Cast.profile_path}`}
                            alt={cast.name}
                          />
                          <CardActions disableSpacing></CardActions>
                          <Typography
                            sx={{
                              color: "black",
                              fontWeight: "bold",
                              fontSize: "0.8rem",
                            }}
                          >
                            {Cast.name.substring(0, 16)}
                            
                          </Typography>
                          <Typography
                            sx={{
                              color: "black",
                              fontWeight: "bold",
                              fontSize: "0.7rem",
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
  );
};

export default CreditsThumb;
