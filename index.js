const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
var cors = require('cors');
const { request } = require('express');

const app = express();

// app.use(cors());
app.use(cors({origin: '*'}));

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
    }).catch(function(err){
        if(err)
        return res.status(404).send("Page not found");
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
    }).catch(function(err){
        if(err)
        return res.status(404).send("Page not found");
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
    }).catch(function(err){
        if(err)
        return res.status(404).send("Page not found");
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
    }).catch(function(err){
        if(err)
        return res.status(404).send("Page not found");
    });
});

// Live mint
// Example url: http://localhost:5000/livemint/author?name=Swaraj-Singh-Dhanjal
app.get('/livemint/author',function(req,res){
    let parameters = req.query;
    const link = "https://www.livemint.com/Search/Link/Author/"+parameters.name;  
    axios.get(link).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        const headings = [];
        $('div.headlineSec').each((i,element)=>{
            let articlelink = $(element).find('a').attr();
            articlelink = "https://livemint.com"+articlelink.href;
            const heads = $(element).find('h2').text();
            const readtime = $(element).find('em > span').text();
            const uploadtime = $(element).find('span > span').text();
            headings.push({
                heads,
                articlelink,
                readtime,
                uploadtime
            });
        });
        res.json(headings);
    }).catch(function(err){
        if(err)
        return res.status(404).send("Page not found");
    });
});

// hydnews.net
// example: http://localhost:3000/hydnews/author?authorname=vishwanath
app.get('/hydnews/author',function(req,res){
    let parameters = req.query;
    const link = "http://www.hydnews.net/author/"+parameters.authorname;
    axios.get(link).then(urlResponse =>{
        connsole.log(urlResponse);
        const $ = cheerio.load(urlResponse.data);
        const links = [];
        $('div.td_module_1').each((i,element)=>{
            const article = $(element).find('h3').text();
            let articlelink = $(element).find('h3 > a').attr();
            articlelink = articlelink.href;
            const uploadedDate = $(element).find('span.td-post-date').text();
            links.push({
                article,
                articlelink,
                uploadedDate
            });
        });
        res.json(links);
    }).catch(function(err){
        if(err)
        return res.status(404).send("Page not found");
    });
});

// tv9 telugu
// example http://localhost:3000/tv9/author?authorname=balaraju-goud
app.get('/tv9/author',function(req,res){
    const parameters = req.query;
    const link = "https://tv9telugu.com/author/"+parameters.authorname;
    axios.get(link).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        const links = [];
        $('article.posts-list__item').each((i,element)=>{
            const article = $(element).find('h3').text();
            let articlelink = $(element).find('h3 > a').attr();
            articlelink = articlelink.href;
            const uploadedDate = $(element).find('span.posted-on').text();
            links.push({
                article,
                articlelink,
                uploadedDate
            }); 
        });
        res.json(links);
    }).catch(function(err){
        if(err)
        return res.status(404).send("Page not found");
    });
});

// tv6
// http://localhost:3000/tv6/author?authorname=nicholas%20lutchmansingh
app.get('/tv6/author',function(req,res){
    const parameters = req.query;
    const link = "https://www.tv6tnt.com/users/profile/"+parameters.authorname;
    axios.get(link).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        const links = [];
        $('div.card-body').each((i,element)=>{
            const heading = $(element).find('h3').text().trim();
            let articlelink = $(element).find('a.tnt-asset-link').attr();
            articlelink = "https://www.tv6tnt.com"+articlelink.href;
            const uploadedDate = $(element).find('div.card-meta > ul > li.card-date').text().trim();
            links.push({
                heading,
                articlelink,
                uploadedDate
            });
        });
        res.json(links);
    }).catch(function(err){
        if(err)
        return res.status(404).send("Page not found");
    });
});


app.listen((process.env.PORT || 3000), function () {
    console.log("The Server Has Started! at port 3000");
  });
