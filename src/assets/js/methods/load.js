var Papa = require('papaparse');

function load(e) {
  Papa.parse(e.target.files[0], {
    complete: function (results) {
      vm.res = results.data;
      vm.tdata = {};
      vm.tpeople = {};
      vm.generateTable();
      vm.generateChart();
    }
  });
};

module.exports = load;
