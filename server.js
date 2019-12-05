const express = require('express');
const path = require('path');

const app = express();

//app.use(express.static(__dirname + '/dist/NOME_DO_SEU_PROJETO'));
app.use(express.static('./public'));

app.get('/*', function(req,res) {   
    //res.sendFile(path.join(__dirname+'/dist/NOME_DO_SEU_PROJETO/index.html'));
    res.sendFile(path.join('./public/index.html'));
});

app.listen(process.env.PORT || 8080);