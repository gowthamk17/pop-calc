const btnElements = Array.from(document.getElementsByClassName('calc_btn'))
const calcDisplay = document.getElementsByClassName('calc_display')[0]
const undoBtn = document.getElementsByClassName('undo_btn')[0]
const calcHistory = []

btnElements.forEach(btn => {
    btn.addEventListener('click', () => {
        if (calcDisplay.textContent === "Malformed expression") {
            calcDisplay.textContent = ''
        }
        let btnText = btn.textContent
        if (btnText === '⌫') {
            calcDisplay.textContent = ''
            return
        } 
        if (btnText === '=') {
            let mathText = calcDisplay.textContent
            mathText = cleanString(mathText)
            try {
                let evaluationStr = eval(mathText)
                evaluationStr = parseFloat(evaluationStr.toFixed(4))
                calcDisplay.textContent = evaluationStr
                calcHistory.push({expression: mathText, result: evaluationStr})
                updateHistoryOnUi()
            } catch (error) {
                calcDisplay.textContent = "Malformed expression"   
            }
            return
        }
        btnText = btnText.replace(/x²/g, '²')
        // console.log(btnText)
        calcDisplay.textContent += btnText
    })
})

undoBtn.addEventListener('click', () => {
    if (calcHistory.length > 0) {
        let lastHistory = calcHistory.pop()
        updateHistoryOnUi()
        calcDisplay.textContent = lastHistory.expression
    }
})

function cleanString(str) {
    str = str.replace(/\n/g, '')
    str = str.trim()
    str = str.replace(/÷/g, '/')
    str = str.replace(/×/g, '*')
    str = str.replace(/%/g, '/100')
    str = str.replace(/mod/g, '%')
    str = str.replace(/π/g, '3.141592654')
    if (str.includes('√')) {
        str = str.replace(/√/g, 'Math.sqrt(') + ')'
    }
    if (str.includes('²')) {
        while(str.includes('²')) {
            let i = str.indexOf('²')
            let index = i
            index--
            let sqrStr = ''
            while(index > -1 && !isNaN(str[index])) {
                sqrStr += str[index]
                index--
            }
            if (sqrStr) {
                str = str.substring(0, i) + "*" + sqrStr + str.substring(i+1)
            }
        }
    }
    return str
}

function updateHistoryOnUi() {
    const historyDiv = document.getElementsByClassName('calc_hist_container')[0]
    historyDiv.innerHTML = ''
    let newHistoryHTML = ''
    calcHistory.forEach(history => {
        newHistoryHTML += `<div class="calc_hist_box">
                                <div>${history.expression}</div>
                                <div>= ${history.result}</div>
                            </div>`
    })
    historyDiv.innerHTML = newHistoryHTML
    scrollToBottom(historyDiv)
}

function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight
}