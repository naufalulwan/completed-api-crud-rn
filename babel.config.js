module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "ENVIROMENT",
          moduleName: "@env",
          path: ".env",
          safe: true,
        },
      ],
    ],
  };
};
