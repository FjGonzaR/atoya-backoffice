import express, { response } from 'express';
const router = express.Router();

router.get('',(request, response)=> {
    response.send({ message : 'Welcome to Atoyy.'});
})

export default router;
