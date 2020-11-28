var Vue = require('./lib/vue.min.js');
//var demodata = require('./demodata.json');

// methods
var load = require('./methods/load.js');
var generateTable = require('./methods/generateTable.js');
var generateChart = require('./methods/generateChart.js');
var download = require('./methods/download.js');

// computed properties
var personTotal = require('./computed/personTotal.js');
var personDowntime = require('./computed/personDowntime.js');

// filters
var decimals = require('./filters/decimals.js');
var acronym = require('./filters/acronym.js');


window.vm = new Vue({
  el: '#app',

  data: {
    cap: 40, // hours in a week
    res: {},
    //res: demodata,
    tdata: {},
    tpeople: {}
  },

  filters: {
    decimals,
    acronym
  },

  methods: {
    load,
    download,
    generateTable,
    generateChart,

    // computed properties
    personTotal,
    personDowntime
  },

  mounted: function () {
    this.$nextTick(function () {
      this.generateTable();
      this.generateChart();
    });
  }
});
