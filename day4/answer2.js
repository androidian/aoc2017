const orderLetters = (word) => {
  const letters = word.split('');
  const orderedLetters = letters.sort();
  return orderedLetters.join('');
};

const isWordRepeated = (word, passphrase) => {
  const words = passphrase.split(' ');
  const count = words.reduce((count, currentWord) => {
    if(word === currentWord) {
      return count+1
    }

    return count;
  }, 0)

  return count > 1;
}

const isPassphraseValid = (passphrase) => {
  const words = passphrase.split(' ').map((value) => {
    return orderLetters(value);
  });

  return words.reduce((isValid, word) => {
    if(!isValid)
      return false;

    return !isWordRepeated(word, words.join(' '));
  }, true)


};

const answer2 = (input) => {
  const passphrases = input.split('\n')
  return passphrases.reduce((valid, passphrase) => {
    if(isPassphraseValid(passphrase)) {
      return valid+1;
    }
    return valid;
  }, 0)
}

module.exports = answer2;
