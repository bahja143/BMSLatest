import { makeStyles } from "@mui/styles";

import User from "../assets/images/user.png";

const useStyles = makeStyles({
  container: {
    height: 125,
    width: "100%",
    marginTop: 25,
    display: "flex",
    paddingLeft: 17,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  profileHover: {
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    objectFit: "cover",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textContainer: {
    marginLeft: 20,
  },
  name: {
    color: "black",
    fontSize: 17,
    marginTop: 30,
    fontFamily: "Poppins",
  },
  text: {
    fontSize: 15,
    bottom: 12,
    fontWeight: "400",
    position: "relative",
    fontFamily: "Poppins",
    color: "rgb(99, 115, 129)",
  },
});

export default function Profile({
  name,
  icon,
  photo,
  subText,
  onClick,
  hover = false,
}) {
  const classes = useStyles();

  return (
    <div
      className={`${classes.container} ` + ` ${hover && classes.profileHover}`}
      onClick={onClick}
    >
      <div className={classes.imageContainer}>
        <img src={photo ? photo : User} className={classes.image} alt="Phot" />
      </div>
      <div className={classes.textContainer}>
        <p className={classes.name}> {name}</p>
        <p className={classes.text}>
          {icon && icon} {subText}
        </p>
      </div>
    </div>
  );
}
