function tst(msg){
    console.log("from tst.js ",msg);
    msg += " from tst.js file"
    return msg
}

module.exports = {
    tst
}