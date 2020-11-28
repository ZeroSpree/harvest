var Chart = require('chart.js');

/**
 * Make the image chart background white
 */
Chart.plugins.register({
  afterRender: function (c) {
    var ctx = c.chart.ctx;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, c.chart.width, c.chart.height);
    ctx.restore();
  }
});

function generateChart() {
  if (window.byClientChart) {
    byClientChart.destroy();
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /**
   * Set the chart data
   */

  var people = Object.keys(vm.tpeople);
  var chartData = [];

  for (var company in vm.tdata) {
    personData = [];
    for (var person in vm.tdata[company]) {
      var value = vm.tdata[company][person].total;
      var roundedValue = Math.round(value * 100) / 100;

      personData.push(roundedValue);
    }

    chartData.push({
      label: company,
      backgroundColor: getRandomColor(),
      data: personData
    });
  }

  // add OOO data
  oooData = [];
  for (var person in vm.tpeople) {
    var value = vm.tpeople[person].ooo;
    var roundedValue = Math.round(value * 100) / 100;

    oooData.push(roundedValue);
  }

  chartData.push({
    label: 'OOO',
    backgroundColor: getRandomColor(),
    data: oooData
  });

  // add downtime data
  downtimeData = [];
  for (var person in vm.tpeople) {
    var downtime = vm.personDowntime(vm.tpeople[person]);
    downtime = downtime < 0 ? 0 : downtime;

    downtimeData.push(downtime);
  }

  chartData.push({
    label: 'Downtime',
    backgroundColor: getRandomColor(),
    data: downtimeData
  });


  /**
   * Load up the chart
   */

  var ctx = document.getElementById('myChart');
  window.byClientChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: people,
      datasets: chartData
    },
    options: {
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 32,
          bottom: 32
        }
      },
      title: {
        display: true,
        fontSize: 18,
        fontFamily: 'Karla',
        fontStyle: 'bold',
        fontColor: '#000',
        padding: 24,
        position: 'top',
        text: 'Hours by Client'
      },
      tooltips: {
        enabled: true
      },
      legend: {
        position: 'bottom',
        align: 'start',
        usePointStyle: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      }
    }
  });
}

module.exports = generateChart;
