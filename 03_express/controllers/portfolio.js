const portfolios = require('../models/portfolio')
const path = require("path");
const fs = require("fs");

exports.get = function(request, response) {
    portfolios.find({}, function(err, all) {
        if (err != null) {
            console.error(err)
            return;
        }

        response.json(all)
    })
}

exports.post = async function (request, response) {
    let portfolioObj = {
        name: request.body.name
    }

    let filedata = request.file;
    console.log(filedata);

    if (filedata) {
        let ex = ''
        if (filedata.mimetype === "image/png")
            ex = '.png'
        else if (filedata.mimetype === "image/jpg"|| filedata.mimetype === "image/jpeg")
            ex = '.jpg'
        else {
            response.sendStatus(422)
            return
        }

        const fs = require('fs');
        const path = require('path');

        let dest = path.join(__dirname, '../public/storage/portfolios/') + filedata.filename + '-' + Date.now() + ex

        await fs.copyFile(filedata.path, dest, function (err) {
            if (err) {
                console.error(err)
                response.send(err)
                return
            }

            portfolioObj.image = dest

            console.log("new portfolio object", portfolioObj)

            const newPortfolio = new portfolios (portfolioObj)
            newPortfolio.save(function (err) {
                if(err != null) {
                    console.error(err)
                    return err
                }

                response.sendStatus(201)
            })
        } )
    }
    else {
        console.log("new portfolio object", portfolioObj)

        const newPortfolio = new portfolios (portfolioObj)
        newPortfolio.save(function (err) {
            if(err != null) {
                console.error(err)
                return err
            }

            response.sendStatus(201)
        })
    }
}