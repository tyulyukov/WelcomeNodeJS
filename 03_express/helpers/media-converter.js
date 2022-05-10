const webp = require("webp-converter")
const requestImageSize = require('request-image-size');
const path = require("path");
const fs = require("fs");

exports.postAvatar = function (request, response) {
    let filedata = request.file;
    console.log(filedata);

    if (filedata) {
        if (filedata.mimetype !== "image/png" && filedata.mimetype !== "image/jpg" && filedata.mimetype !== "image/jpeg") {
            response.sendStatus(422)
            return
        }

        getWebpBase64(filedata)

        response.sendStatus(200)
    }
    else {
        response.sendStatus(422)
    }
}

exports.postThumbnail = function (request, response) {

}

exports.postImages = function (request, response) {

}

function getWebpBase64(file) {
    let fromFilePath = path.join(__dirname, '../public/uploads', file.filename)
    let toFilePath = path.join(__dirname, '../public/storage/uploads', Date.now() + '-upload.webp')

    const result = webp.cwebp(fromFilePath, toFilePath,"-q 80","-v");
    result.then((response) => {
        console.log("Result: ", response);
    });
}