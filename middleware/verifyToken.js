const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['xAccessToken'] || req.body.token || req.query.token

    if(!token) {
        res.json({ 
            status: false, 
            message:'No token provided.'
        })
    }else{ 
        jwt.verify(token, req.app.get('apiSecretKey'), (err, decoded) => {
            if(err){
                res.json({
                    status: false,
                    message: 'Failed to verify token'
                })
            }else{ 
                req.decode = decoded;
                console.log(decoded);
                next();
            }
        })
    }

};