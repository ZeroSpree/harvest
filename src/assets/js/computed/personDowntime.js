function personDowntime(person) {
  return this.cap - Number(person.ooo) - (person.billable + person.nonbillable);
};

module.exports = personDowntime;
