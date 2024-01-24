import windowExists from "./windowExists"

const isDev = windowExists() && window.location.host.includes('localhost');

export default isDev;