

export default function bse64(files) {
    let fileBase64 = [];
    const file64 = files;

     file64.map(function(item) {
         Object.entries(item).map(function(filter) {
        if (filter[0] === "base64") {
          fileBase64.push(filter[1]);
        }
        return null;
    });
    return null;
});
return fileBase64;
}
