function generateTable() {
  var data = vm.res;
  var tdata = vm.tdata;
  var clients = [];
  var people_firstname = [];

  for (i = 1; i < data.length; i++) {
    var row = data[i];
    var clientName = row[1];
    var person_firstname = row[10];
    var person_lastname = row[11];

    // Extract unique clients
    if (clientName && !clients.includes(clientName)) {
      clients.push(clientName);
      tdata[clientName] = {};
    }

    // Extract unique people
    if (person_firstname && !people_firstname.includes(person_firstname)) {
      people_firstname.push(person_firstname);
      vm.tpeople[person_firstname] = {
        name: person_firstname
      }
    }
  }

  // Add each person on each project row
  for (var project in tdata) {
    for (var i = 0; i < people_firstname.length; i++) {
      tdata[project][people_firstname[i]] = {
        firstname: people_firstname[i],
        total: 0,
      }

      vm.tpeople[people_firstname[i]] = {
        billable: 0,
        nonbillable: 0,
        total: 0,
        ooo: 0,
      };
    }
  }

  // Add each persons' hours per project
  for (i = 1; i < data.length; i++) {
    var row = data[i];
    var clientName = row[1];
    var person_firstname = row[10];
    var hours = Number(row[6]);

    if (clientName && tdata[clientName]) {
      // total
      tdata[clientName][person_firstname]['total'] += hours;
      vm.tpeople[person_firstname]['total'] += hours;

      // billable hours
      if (row[7] == 'Yes') {
        tdata[clientName][person_firstname]['billable'] += hours;
        vm.tpeople[person_firstname]['billable'] += hours;
      }
      // nonbillable hours
      else {
        tdata[clientName][person_firstname]['nonbillable'] += hours;
        vm.tpeople[person_firstname]['nonbillable'] += hours;
      }
    }
  }

  vm.$forceUpdate();
};

module.exports = generateTable;
