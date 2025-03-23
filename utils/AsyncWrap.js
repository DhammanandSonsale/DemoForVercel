// Wrap Function For Error Handling
module.exports = (fn) => {
    return (req, res, next) =>{
        fn(req, res, next).catch(next);   
    }
}
