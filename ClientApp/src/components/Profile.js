import { makeStyles } from "@mui/styles";

import User from "../assets/images/user.png";

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: 125,
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    marginTop: 25,
    display: "flex",
    alignItems: "center",
    paddingLeft: 17,
  },
  profileHover: {
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
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
    fontWeight: "400",
    color: "rgb(99, 115, 129)",
    position: "relative",
    bottom: 12,
    fontFamily: "Poppins",
  },
});

export default function Profile({
  name,
  icon,
  onClick,
  subText,
  photo,
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
