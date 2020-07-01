module.exports = {
  title: "JB",
  description: "",
  dest: `${__dirname}/../../dist/`,
  extend: '@vuepress/theme-default',
  themeConfig: {
    search: false,
    nav: [
      { text: "Jörn", link: "/" },
      { text: "Projekte", link: "/projects/" },
      { text: "CV", link: "/cv/" },
    ],
  },
};
