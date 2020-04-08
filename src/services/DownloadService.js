export default class DownloadService {
  forceDownload = (blob, filename) => {
    var a = document.createElement("a");
    a.download = filename;
    a.href = blob;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  downloadResource = (url) => {
    const regex = /fm=(?<content>\w+)&/gm;
    const extension = regex.exec(url)[1];

    const filename =
      url.split("\\").pop().split("/").pop().split("_").pop() + `.${extension}`;
    fetch(url, {
      headers: new Headers({
        Origin: window.location.origin,
      }),
      mode: "cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        let blobUrl = window.URL.createObjectURL(blob);
        this.forceDownload(blobUrl, filename);
        console.log("end");
      })
      .catch((e) => console.error(e));
  };
}
