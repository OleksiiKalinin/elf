export default function getUrlSearchParam(url: string, param: string) {
    return new URLSearchParams(new URL(url.startsWith("http") ? url : `https://${url}`).search).get(param);
}