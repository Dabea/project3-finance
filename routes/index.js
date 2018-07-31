const path = require ('path');
const router = require ('express').Router();
const apiRoutes = require('./api/transactions');

//======================================
//======================================
// API Routes 
router.use('/api', apiRoutes);


// Catch all for anything that isn't an API route

// router.use('/api/*', function(req,res){
//     //this will reject any /api/nonexistant routes
//     res.send(500).end();
// })

// Send the React app
// router.use('/', function(req,res){
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

module.exports = router 

