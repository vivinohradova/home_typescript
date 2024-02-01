// 1
const isPalindrome = num => {
  const numStr = num.toString();
  const reversedStr = numStr.split('').reverse().join('');
  return numStr === reversedStr;
};

const reverseAndAdd = num => {
  const reversedNum = parseInt(num.toString().split('').reverse().join(''));
  return num + reversedNum;
};

const findPalindromeIterative = (initialNum, maxSteps = 1000) => {
  let currentNum = initialNum;

  for (let steps = 0; steps < maxSteps; steps++) {
    if (isPalindrome(currentNum)) {
      return { result: currentNum, steps };
    }

    currentNum = reverseAndAdd(currentNum);
  }

  return { result: null, steps: maxSteps };
};

const result = findPalindromeIterative(196);
console.log(result);

// 2

const generatePermutationsRecursive = (arr) => {
  return arr.length === 1
      ? [arr]
      : arr.reduce((result, element, index) => {
            const rest = [...arr.slice(0, index), ...arr.slice(index + 1)];
            const permutationsWithoutElement = generatePermutationsRecursive(rest);

            permutationsWithoutElement.forEach((perm) => {
                result.push([element, ...perm]);
            });

            return result;
        }, []);
};


const inputArray = [1, 2, 3];
const permutations = generatePermutationsRecursive(inputArray);
console.log(permutations);
