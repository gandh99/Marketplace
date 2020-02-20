export default class ConfirmationModal {
    constructor() {
    }

    show(button, title, message, acceptFunction) {
        this.button = button;
        this.title = title;
        this.message = message;
        this.acceptFunction = acceptFunction;
        this.loadModal();
    }

    loadModal() {
        $(".confirmation-modal-area").load("/html/components/confirmation-modal.html",
            () => {
                this.initModalFunctionality();
                this.loadContent(this.title, this.message);
                this.initButtons(this.acceptFunction);
            });
    }

    initModalFunctionality() {
        // Get the modal
        var modal = document.getElementById("confirmation-modal-background");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal
        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = () => {
            this.closeModal();
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = (event) => {
            if (event.target == modal) {
                this.closeModal();
            }
        }
    }

    loadContent(title, message) {
        // Load the title and message
        const modalTitle = document.getElementsByClassName('confirmation-modal-title')[0];
        const modalMessage = document.getElementsByClassName('confirmation-modal-message')[0];
        modalTitle.innerHTML = title;
        modalMessage.innerHTML = message;
    }

    initButtons(acceptFunction) {
        const acceptButton = document.getElementsByClassName('confirmation-modal-accept-button')[0];
        const rejectButton = document.getElementsByClassName('confirmation-modal-reject-button')[0];
        acceptButton.addEventListener('click', acceptFunction);
        rejectButton.addEventListener('click', this.closeModal);
    }

    closeModal() {
        var modal = document.getElementById("confirmation-modal-background");
        modal.style.display = 'none';
    }
}