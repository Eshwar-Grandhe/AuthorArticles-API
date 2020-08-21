const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
var cors = require('cors');

const app = express();

// app.use(cors());
app.use(cors({origin: '*'}));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// Hello world example
app.get('/',(req,res)=>{
    res.send("Hello World!");
});

// for timesnow
// example:  http://localhost:3000/timesnow/requests?author=a-didar-singh&id=368
app.get('/timesnow/requests',(req,res)=>{
    const parameters = req.query;
    let link = "https://www.timesnownews.com/expert/"+parameters.author+"/"+parameters.id;
    axios.get(link).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        const links = [];
        $('a.component_16').each((i, element)=>{
            const anchortag = $(element).attr("href");
            links.push(anchortag);
        });
        res.json(links);
    });
});

// ?article=pandemic-overload-covid-19-fatigue-is-getting-to-us-but-we-have-to-grin-and-bear-it&id=633412
// http://localhost:3000/timesnow/article?article=pandemic-overload-covid-19-fatigue-is-getting-to-us-but-we-have-to-grin-and-bear-it&id=633412
// http://localhost:3000/timesnow/article?articleName=videos/mirror-now/politics/tamil-nadu-cm-edapadis-independence-day-speech-sparks-controversy-will-ops-be-the-next-cm&id=71114
app.get('/timesnow/article',(req,res)=>{
    const obj = [];
    let parameters = req.query;
    const link = "https://www.timesnownews.com/"+parameters.articleName+"/"+parameters.id; 
    axios.get(link).then(urlResponse => {
        const $ = cheerio.load(urlResponse.data);
        var tags = parameters.articleName.split('/');
        let heading, uploadedDate;
        if(tags[0]=='videos'){
            if(tags[1]=='podcasts') {
                heading = $("div._p_episode_name").text().trim();
                uploadedDate = $("div._p_audio_duration").text().trim();
            }else{
                heading = $("div.heading").text().trim();
                uploadedDate = $("div.about-event").text().trim();
            } 
        }else {
            heading = $('h1').text().trim();
            uploadedDate = $('div.sub-heading').text().trim();
        }
        obj.push({
            heading,
            uploadedDate
        });
        console.log(obj);
        res.json(obj);
    });
});

// for the hindu
// example: http://localhost:3000/thehindu/requests?author=Sonia-Gandhi&id=137462
app.get('/thehindu/requests',(req,res)=>{
    const parameters = req.query;
    console.log(parameters);
    let link = "https://www.thehindu.com/profile/author/"+parameters.author+"-"+parameters.id;
    axios.get(link).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        const links = [];
        $('a.story-card-33-img').each((i, element)=>{
            const anchortag = $(element).attr("href");
            links.push(anchortag);
        });
        res.json(links);
    });
});

// here the articleName should contain the parameters after the slash too.
// http://localhost:3000/thehindu/article?articleName=news/resources/Women-as-Agents-of-Change-Sonia-Gandhis-Commonwealth-Lecture&id=article14952355.ece
app.get('/thehindu/article',(req,res)=>{
    const obj = [];
    let parameters = req.query;
    const link = "https://www.thehindu.com/"+parameters.articleName+"/"+parameters.id; 
    axios.get(link).then(urlResponse => {
        const $ = cheerio.load(urlResponse.data);
        var tags = parameters.articleName.split('/');
        let heading, uploadedDate;
        if(tags[0]==="opinion")
        {
            heading = $('h2.special-article-heading').text().trim();
            uploadedDate = $('div.ut-container').text().trim();
            uploadedDate=uploadedDate.replace( /[\r\n]+/gm, "" ); 

        }
        else if( tags[0]==="specials")
        {
            heading = $('h1.special-heading').text().trim();
            uploadedDate = $('div.ut-container').text().trim();
            uploadedDate=uploadedDate.replace( /[\r\n]+/gm, "" ); 
        }
        else{
        heading = $('h1.title').text().trim();
        uploadedDate = $('div.ut-container').text().trim();
        uploadedDate=uploadedDate.replace( /[\r\n]+/gm, "" ); 
        }
        obj.push({
            heading,
            uploadedDate
        });
        console.log(obj);
        res.json(obj);
    });
});


app.listen((process.env.PORT || 5000), function () {
    console.log("The Server Has Started! at port 5000");
  });
