const router = require('express').Router();
const root = require('../controller/facbookController');



router.post('/post/creat', (req, res) => {
    root.creat(req, res);
});

router.get('/post/read/:id', (req, res) => {
    root.read(req, res);
})

router.delete('/post/delete/:id', (req, res) => {
    root.delete(req, res);
})

router.delete('/posts/delete/:email', (req, res) => {
    root.deleteAllUser(req, res);
})

router.get('/posts/read/:email', (req, res) => {
    root.readAllUser(req, res);
})

router.put('/post/update/:id', (req, res) => {
    root.update(req, res);
})




module.exports = router;