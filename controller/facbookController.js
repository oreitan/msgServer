const Msgs = require('../datebase/schema');
const mongoose = require('mongoose');

class faceMsgControler {

    static async creat(req, res) {
        try {

            if (!req.body.Email || !req.body.username) throw {
                status: 404,
                msg: "missig data"
            };

            let test;
            test = Msgs({
                Email: req.body.Email,
                username: req.body.username,
                msg: req.body.msg ? req.body.msg : '',
                likes: req.body.likes
            });

            await test.save();
            res.status(200).json(test);
        }
        catch (err) {
            if(!err.status) err.status = 500;
            if(!err.msg) err.msg = 'internal error';
            res.status(err.status).send(err.msg)
        };
    }

    static async deleteAllUser(req, res) {
        try {
            let faceMsg = await Msgs.deleteMany({ Email: req.params.email })
            if (faceMsg.deletedCount == 0) throw {
                status: 204,
                msg: "no msgs to delete"
            }
            res.status(200).json(faceMsg);
        } catch (err) {
            if(!err.status) err.status = 500;
            if(!err.msg) err.msg = 'internal error';
            res.status(err.status).send(err.msg)
        }
    }

    static async readAllUser(req, res) {
        try {//incorrect readallusers
            console.log(req.params.email)
            let faceMsg = await Msgs.find({ Email: req.params.email }, (err)=>{
                if (err) throw err;
            })
            console.log(faceMsg)
            if (!faceMsg || (Object.keys(faceMsg))==0) throw {
                status: 204,
                msg: "no msg found"
            }
            res.status(200).send(faceMsg);
        } catch (err) {
            if(!err.status) err.status = 500;
            if(!err.msg) err.msg = 'internal error';
            res.status(err.status).send(err.msg)

        }
    }

    static async delete(req, res) {
        try {
            this.verId(req.params.id);
            let faceMsg = await Msgs.deleteOne({ _id: req.params.id }, (err)=>{
                if (err) throw err;
            })
            if (faceMsg.deletedCount == 0) throw {
                status: 204,
                msg: "no msg to delete"
            }
            res.status(200).send(faceMsg);
        } catch (err) {
            if(!err.status) err.status = 500;
            if(!err.msg) err.msg = 'internal error';
            res.status(err.status).send(err.msg)
        }
    }

    static async read(req, res) {
        try {
            this.verId(req.params.id);
            let faceMsg = await Msgs.findOne({ _id: req.params.id }, (err)=>{
                if (err) throw err;
            })
            if (!faceMsg) throw {
                status: 204,
                msg: "no msg found"
            }
            res.status(200).send(faceMsg);
        }
        catch (err) {
            console.log(err);
            if(!err.status) err.status = 500;
            if(!err.msg) err.msg = 'internal error';
            res.status(err.status).send(err.msg)
        }

    }

    static async update(req, res) {
        console.log(req.body)
        try {
           // this.verId(req.params.id);
            let obj = await Msgs.find({_id:req.params.id},(err)=>{
                if (err) throw err;
            })
            
            if (!obj || obj.length < 0) throw {
                status: 204,
                msg: "no msg in DB"
            }

            obj = obj[0];
            if(req.body.like && req.body.like >=0)
            {
                obj.like = req.body.like;
                
            }
            if(req.body.msg && req.body.msg.length > 0)
            {
                obj.msg = req.body.msg;
            }
            
            let faceMsg = await Msgs.updateOne({ _id: req.params.id }, obj, (err)=>{
                if (err) throw err;
            })
            if (faceMsg.nModified == 0) throw {
                status: 204,
                msg: "noting to update"
            };
            res.status(200).json(faceMsg);
        }
        catch (err) {
            if(!err.status) err.status = 500;
            if(!err.msg) err.msg = 'something went wrong';
            res.status(err.status).send(err.msg)
        }
    }

    static verId(id) {
        console.log(id)
        if (!mongoose.Types.ObjectId.isValid(id)) throw {
            status: 204,
            msg: "invalid object id"

        }
    }

}


module.exports = faceMsgControler;