import { Button, Grid } from "@mui/material";
import { useAuth } from "context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { Nav } from "react-bootstrap";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  const { user, logout } = useAuth();
  const name = user?.email;
  const router = useRouter();
  return (
    <header className={classes.header}>
      {user ? (
        <Link href="/dashboard" legacyBehavior>
          <a>
            <div className={classes.logo}>Asger Movies</div>
          </a>
        </Link>
      ) : (
        <Link href="/" legacyBehavior>
          <a>
            <div className={classes.logo}>Asger Movies</div>
          </a>
        </Link>
      )}
      {user ? (
          <Grid sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
          >
            {name.split("@")[0]}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1e1e1e",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#1e1e1e",
                color: "#fff",
              },
            }}
          >
            <Nav.Link
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Logout
            </Nav.Link>
          </Button>
          </Grid>
      ) : (
        <div></div>
      )}
    </header>
  );
}

export default MainNavigation;
