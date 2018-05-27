export var GlobalConfig;
(function (GlobalConfig) {
    GlobalConfig.accessControl = { dev: "http://localhost:12345", prod: "https://www.google.com" };
})(GlobalConfig = GlobalConfig || (GlobalConfig = {}));
