requirejs.config({
    baseUrl: "lib",
    paths: {
        activity: "../js",
        jquery: "jQuery",
        bootstrap: "bootstrap"
    }
});

requirejs(["activity/activity"]);
