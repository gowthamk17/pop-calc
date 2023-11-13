const btnElements = Array.from(document.getElementsByClassName('calc_btn'))
const calcDisplay = document.getElementsByClassName('calc_display')[0]

btnElements.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.textContent === '⌫') {
            calcDisplay.textContent = ''
            return
        } 
        if (btn.textContent === '=') {
            let result = eval(calcDisplay.textContent)
            calcDisplay.textContent = result
            return
        }
        // console.log(btn.textContent)
        calcDisplay.textContent += btn.textContent
    });
});