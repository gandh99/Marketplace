export function showErrors(errors) {
    const inputErrorsArea = document.getElementsByClassName('input-errors-area')[0];
    for (let error of errors) {
        let inputError = document.createElement('div');
        inputError.className = 'input-error';
        inputError.textContent = error;
        inputErrorsArea.appendChild(inputError);
    }
}

export function removeErrors() {
    const inputErrorsArea = document.getElementsByClassName('input-errors-area')[0];
    while (inputErrorsArea.firstChild) {
        inputErrorsArea.removeChild(inputErrorsArea.firstChild);
    };
}