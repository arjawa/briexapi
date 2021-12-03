function getDateInt() {
  let now = (new Date().toISOString().split("T")[0]).split("-").join("");
  return parseInt(now);
}

module.exports = {
  getDateInt
};