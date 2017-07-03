var request = require("request");
var GITHUB_USER = "YuChenHeMTL";
var GITHUB_TOKEN = "e40279bff4a8eca59c5db4cc5830841175a924ac";
var fs = require ('fs');

var Owner = process.argv[2];//the second value of the command line
var Name = process.argv[3];//the third value of the command line


function getRepoContributors(repoOwner, repoName, cb){

  console.log("Welcome to the Github Avatar Downloader!");

  if (repoName === undefined||repoOwner===undefined){
    console.log('Inputs invalid');
    return 'Inputs invalid';
    //if one of the values is undefined, return inputs invalid
  }
  var options = {
    url:'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      "User-Agent": 'YuChenHeMTL'//set the user agent as YuChenHeMTL
    }
  };

  request.get(options, function (err, response, body){
    if (err){
      throw err;
    }

    body = JSON.parse(body);//parse the entire information as JSON objects

    for (var i=0; i < body.length; i++){
      cb(body[i]["avatar_url"], body[i]["login"] + '.jpg');
    }//process the avatar url and the login name through the callback function
  })
}

function downloadImageByURL(url, filepath){
  var dir = './avatars';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
//if the folder doesnt exist, create it
//if it does, then skip this step

  request.get(url)
  .on ('error', function (err){
    throw err;
  })
  .pipe(fs.createWriteStream(dir + '/' + filepath));
  //store the avatars in the avatars folder
}


getRepoContributors(Owner, Name, downloadImageByURL);