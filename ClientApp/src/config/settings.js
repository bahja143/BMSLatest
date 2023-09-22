const settings = {
  dev: {
    apiUrl: "https://localhost:7146/api",
  },
  pro: {
    apiUrl: `http://${window.location.host}/api`,
  },
};

const getCurrentSettings = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return settings.dev;
  }

  return settings.pro;
};

export default getCurrentSettings();
