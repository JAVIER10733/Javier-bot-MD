function getCommandBody(text, prefix) {
    return text.slice(prefix.length).trim().split(/\s+/);
}

module.exports = {
    getCommandBody
};