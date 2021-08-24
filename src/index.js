function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  let leftBr = 0;
  let rightBr = 0;
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === '(') leftBr++;
    if (expr[i] === ')') rightBr++;
  }
  if (leftBr !== rightBr) throw 'ExpressionError: Brackets must be paired';
  let numbers = [];
  let brs = [];
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === ' ') {
      continue;
    }
    if (expr[i] >= '0' && expr[i] <= '9') {
      let add = '';
      while (i < expr.length && expr[i] >= '0' && expr[i] <= '9') {
        add += expr[i];
        i++;
      }
      numbers.push(Number(add));
      i--;
    } else if (expr[i] === '(') {
      brs.push(expr[i]);
    } else if (expr[i] === ')') {
      while (brs[brs.length - 1] !== '(') {
        numbers.push(useBr(brs.pop(), numbers.pop(), numbers.pop()));
      }
      brs.pop();
    } else if (expr[i] === '+' || expr[i] === '-' || expr[i] === '*' || expr[i] === '/') {
      while (brs.length && dominate(expr[i], brs[brs.length - 1])) {
        numbers.push(useBr(brs.pop(), numbers.pop(), numbers.pop()));
      }
      brs.push(expr[i]);
    }
  }
  while (brs.length) {
    numbers.push(useBr(brs.pop(), numbers.pop(), numbers.pop()));
  }
  return numbers.pop();
};

function useBr(br, b, a) {
  if (br == '+') return a + b;
  if (br == '-') return a - b;
  if (br == '*') return a * b;
  if (br == '/') {
    if (b === 0) {
      throw 'TypeError: Division by zero.';
    }
    return (a / b);
  }
}

function dominate(br1, br2) {
  if (br2 === '(' || br2 === ')') {
    return false;
  }
  if ((br2 === '+' || br2 === '-') && (br1 === '*' || br1 === '/')) {
    return false;
  }
  return true;
};

module.exports = {
  expressionCalculator
}