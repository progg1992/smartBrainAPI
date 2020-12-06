const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                response.json(user[0])
            } else {
                res.status(400).json('error getting user')
            }
        })
}

module.exports = {
    handleProfileGet
}