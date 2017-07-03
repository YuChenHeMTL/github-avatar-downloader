var request = require("request")
var https = require ("https")
var GITHUB_USER = "YuChenHeMTL"
var GITHUB_TOKEN = "e40279bff4a8eca59c5db4cc5830841175a924ac"

console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb){

  var options = {
    url:'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {"User-Agent": 'asdf'}
  };

  request.get(options, function (err, response, body){
    if (err){
      throw err
    }
    body = JSON.parse(body)
    for (var i=0; i < body.length; i++){
      console.log(body[i]["avatar_url"])
    }
  })
}

function printFunction (something){
  console.log(something)
}

getRepoContributors("jquery", "jquery", printFunction);