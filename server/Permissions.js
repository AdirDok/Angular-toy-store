const SQL = require("./dbconfig")

onlyUsers = async (req, res, next) => {

    if (req.session.F_name) {
        // console.log("yes yes", req.session.F_name)
        next()
    } else {
        res.send({ err: 'you need to login first  onlyUsers' })
        // console.log("no no", req.session.F_name)

    }
}

onlyAdmin = async (req, res, next) => {
    if (req.session.Admin == true) {
        next()
    } else {
        res.send({ err: 'who the hell are you?!!' })
    }

}



module.exports = { onlyUsers, onlyAdmin }

// =======================================================

// const SQL = require("./dbconfig")

// onlyUsers = async (req, res, next) => {

//     if (req.session.F_name) {   /*  אם יש לי אני רוצה לבדוק שלא מנסים לשבור לי את הקוד */


//         const [user] = await SQL(`
//         SELECT * FROM msima_4.users WHERE F_name = "${req.session.F_name}"
//         `)
//         if (!user) {     /* אם אין לי משתמש ב DB עם שם כמו בסשן  */
//             return res.send({ err: 'Someone is trying to break your code. kill him', user })
//         } else {
//             // console.log(user)
//             next()
//         }


//     } else {     /* אם אין לי בכלל בסשן דבר כזה */
//         res.status(413).send({ err: 'you need to login first  onlyUsers' })
//     }
// }

// onlyAdmin = async (req, res, next) => {
//     if (req.session.Admin == true) {
//         next()
//     } else {
//         res.status(403).send({ err: 'who the hell are you?!!' })
//     }

// }



// module.exports = { onlyUsers, onlyAdmin }