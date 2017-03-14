let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let generateRandomNumb = function(max) {
  return Math.floor(Math.random() * max);
};

let generateId = function() {

  let id = Date.now();

  for(let i = 0; i < 15; i++) {
    id = id + '' + generateRandomNumb(10) + '' + alphabet[generateRandomNumb(alphabet.length - 1)];
  }

  return id;
};

module.exports = generateId;