function personTotal(person) {
  return person.billable + person.nonbillable + Number(person.ooo);
};

module.exports = personTotal;
