const express = require("express");
const router = express.Router();

function encryptToken(token){
    var i;

    function spread(x) {
        for (var e = [], t = 0; t < x.length; t++)
            e = e.concat(x[t]);
        return e
    }

    function one(t){
        for (var e = t.length, n = [13, 17, 19, 23, 29].find((function(t) {
            return e % t
        }
        )), i = [], o = 0; o < e; o++)
            i.push(t[o * n % e]);
        return i
    }

    function two(t) {
        return t.map((function(t) {
            if(t >= "A" && t <= "Z"){
                t = String.fromCharCode("Z".charCodeAt(0) - (t.charCodeAt(0) - "A".charCodeAt(0))).toLowerCase()
            }else{
                if(t >= "a" && t <= "z"){
                    t = String.fromCharCode("z".charCodeAt(0) - (t.charCodeAt(0) - "a".charCodeAt(0))).toUpperCase()
                }else{
                    if(t >= "0" && t <= "9"){
                        t = String.fromCharCode("9".charCodeAt(0) - (t.charCodeAt(0) - "0".charCodeAt(0)))
                    }
                }
            }

            return t;
        }));
    }

    i = spread(token);
    var oneStep = one(i.reverse());
    var twoStep = two(oneStep);
    return twoStep.join("");
}

router.get("/", async (req, res) => {
    try {
        res.status(400).json({
            status: 400,
            message: "No token provided"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

router.get("/:token", async (req, res) => {
    try {
        if(req.params.token){
            var token = req.params.token;
            var encryptedToken = encryptToken(token);
            res.json({
                status: 200,
                token: encryptedToken
            });
        }else{
            res.status(400).json({
                status: 400,
                message: "No token provided"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;