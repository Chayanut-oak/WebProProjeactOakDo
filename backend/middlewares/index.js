
const pool = require("../config");
async function isLoggedIn(req, res, next) {
    let authorization = req.headers.authorization

    if (!authorization) {
        return res.status(401).send('You are not logged in')
    }

    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Bearer' || !part2) {
        return res.status(401).send('You are not logged in')
    }

    // Check token
    const [custokens] = await pool.query('SELECT * FROM customer_token WHERE token = ?', [part2])
    const [adtokens] = await pool.query('SELECT * FROM admin_token WHERE token = ?', [part2])
    if (!custokens[0] && !adtokens[0]) {
        return res.status(401).send('You are not logged in')
    }
    if(custokens[0]){
        const info = await pool.query('SELECT DISTINCT  * FROM customer WHERE customer_id = ?', [custokens][0][0].customer_id )
        info[0][0].type = 'customer'
        req.user = info[0][0]
        

    }
    if(adtokens[0]){
        const info = await pool.query('SELECT DISTINCT  * FROM admin WHERE admin_id = ?', [adtokens][0][0].admin_id )
        info[0][0].type = 'admin'
        req.user = info[0][0]
    }
    // Set user
   
    // else if (adtokens[0].length != 0) {
    //     const [users2] = await pool.query(
    //         'SELECT customer_id, email, fname, lname, email, customer_img, phone_num, start_membership ' +
    //         'FROM users WHERE id = ?', [token.customer_id]
    //     )
    //     req.user = users2[0]
    // }

  
   console.log( req.user)
    next()
}

module.exports = {
    isLoggedIn
}
