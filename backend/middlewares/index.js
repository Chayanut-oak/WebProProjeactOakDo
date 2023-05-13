async function logger(req, res, next) {
    const timestamp = new Date().toISOString().substring(0, 19)
    console.log(`${timestamp} | ${req.method}: ${req.originalUrl}`)
    next()
}

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
console.log([part2]+"part2")
    // Check token
    const [custokens] = await pool.query('SELECT * FROM customer_token WHERE token = ?', [part2])
    const [adtokens] = await pool.query('SELECT * FROM admin_token WHERE token = ?', [part2])
    if (!custokens[0] || !adtokens[0]) {
        return res.status(401).send('You are not logged in')
    }

    // Set user
    if (custokens[0].length != 0) {
        const [users1] = await pool.query(
            'SELECT customer_id, email, fname, lname, email, customer_img, phone_num, start_membership ' +
            'FROM users WHERE id = ?', [token.customer_id]
        )
        req.user = users1[0]
    }
    // else if (adtokens[0].length != 0) {
    //     const [users2] = await pool.query(
    //         'SELECT customer_id, email, fname, lname, email, customer_img, phone_num, start_membership ' +
    //         'FROM users WHERE id = ?', [token.customer_id]
    //     )
    //     req.user = users2[0]
    // }


    next()
}

module.exports = {
    logger,
    isLoggedIn
}
