const myBtn = () => {
  const inputCode = document.createElement('input');
  inputCode.setAttribute('type', 'text');
  inputCode.setAttribute('class', 'cde');
  inputCode.setAttribute('placeholder', 'code');

  const inputAmount = document.createElement('input');
  inputAmount.setAttribute('type', 'text');
  inputAmount.setAttribute('class', 'cde');
  inputAmount.setAttribute('placeholder', 'amount');

  const container = document.getElementById('test');
  container.appendChild(inputCode);
  container.appendChild(inputAmount);
};