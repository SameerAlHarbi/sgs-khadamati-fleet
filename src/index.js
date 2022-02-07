import express from 'express';
import chalk from 'chalk';

const app = express();
app.use(express.json());

app.use('/vehicle', (req, res, next) => {
    res.json({id: 0, name: 'Toyota'});
});

app.use((error, req, res, next) => {
    error.httpStatusCode = error.httpStatusCode || 500;
    error.message = error.httpStatusCode !== 404 ? 
        error.message || '' : 'Data NotFound!';
    return res.status(error.httpStatusCode).json({ error : error.message , data: error.errorsData || {} });
});

const port = process.env.PORT || 8000;
app.listen(port, ()=> {

    switch(process.env.API_SERVER_TYPE)
    {
        case 'DEVELOPMENT':
            console.log(chalk.yellowBright
                .inverse(`KHADAMATI FLEET ${process.env.API_SERVER_TYPE} SERVER IS UP AND RUNNING ON PORT ${port}`));
            break;
        case 'QUALITY':
            console.log(chalk.cyan
                .inverse(`KHADAMATI FLEET ${process.env.API_SERVER_TYPE} SERVER IS UP AND RUNNING ON PORT ${port}`));
            break;
        default :
            console.log(chalk.greenBright
                .inverse(`KHADAMATI FLEET ${process.env.API_SERVER_TYPE} SERVER IS UP AND RUNNING ON PORT ${port}`));
    }

});