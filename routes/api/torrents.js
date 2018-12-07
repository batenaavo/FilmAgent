var express = require('express');
const mongoose = require('mongoose');
const TorrentSearchApi = require('torrent-search-api');
var router = express.Router();
var WebTorrent = require('webtorrent');
var client = new WebTorrent();


TorrentSearchApi.enableProvider('1337x');
TorrentSearchApi.enableProvider('Rarbg');
TorrentSearchApi.enableProvider('ExtraTorrent');


router.get('/',function(req,res,next){
	const activeProviders = TorrentSearchApi.getActiveProviders();
	res.json(activeProviders);
});

function isEmptyObject(obj) {
	return !Object.keys(obj).length;
}

router.get('/:title', async function(req,res,next){
	var torrents = await TorrentSearchApi.search(['Rarbg'],req.params.title, '', 40);
	if(isEmptyObject(torrents)) 
		torrents = await TorrentSearchApi.search(['ExtraTorrent'],req.params.title, '', 40);
	res.json(torrents);
});


router.post('/:title', async function(req,res,next){
	torrent = req.body;
	const torrentHtmlDetail = await TorrentSearchApi.getTorrentDetails(torrent);
	res.send(torrentHtmlDetail);
});

router.post('/:title/download', async function(req,res,next){
	torrent = req.body;
	const magnet = await TorrentSearchApi.getMagnet(torrent);

	client.add(magnet, function (torrent) {
 
  	console.log('Client is downloading:', torrent.infoHash)

  	torrent.files.forEach(function (file) {
        var fs = require('fs');
        fs.writeFile('/home/quim/Downloads/teste/' + file.name, file, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
	});
});

router.get('/:title/progress',function(req,res,next){
	var progress = client.progress;
	res.send(progress);
});


module.exports = router;