import Error404 from "./components/ErrorNotFound.vue";

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // ...apply enhancements to the app
  // const obj = router.options.routes;
  // router.matcher.addRoutes({ path: "*", component: ErrorNotFound });
	console.log({ router });
	const allRoutes = router.options.routes;
	const routes = router.options.routes.slice(0, -1);
	console.log({ allRoutes, routes });
	return { Vue, options, router, siteData};
  // fs.writeFileSync("./test.txt", JSON.stringify(obj));
};
