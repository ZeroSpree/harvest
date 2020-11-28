function download() {
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(vm.res));
  var dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "data.json");
};

module.exports = download;
