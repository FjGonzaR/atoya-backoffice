import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import path from 'path';
//import cookieParser from 'cookie-parser';
import cors  from 'cors';
import router from './routes';
import { createConnection } from "typeorm";

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'front/build')));
app.use(cors());
//app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

createConnection().then(connection => {
  app.use('/', router);
}).catch(reason => console.log('Database connection failed.'));

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  app.listen(5000);


