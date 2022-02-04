const express = require('express');
const sequelize= require('./config');
const app = express();
const routes= require('./routes');
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(routes);

sequelize.sync({force:true}).then(()=>{
    app.listen(PORT, ()=>console.log(`Server listening on PORT: ${PORT}`));
});