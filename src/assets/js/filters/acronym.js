function acronym (value) {
  if (!value) return '';
  var newVal = '';
  value = value.replace('_', ' ').split(' ');

  if( value.length > 1 ) {
    for(var i = 0; i < value.length; i++) {
      newVal += value[i].substring(0, 1).toUpperCase();
    }
  }
  else {
    newVal = value[0].substring(0, 3).toUpperCase();
  }

  return newVal;
}

module.exports = acronym;
