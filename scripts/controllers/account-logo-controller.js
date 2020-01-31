let navIsOpen = false;

function openCloseNav(x) {
    if (navIsOpen) {
        closeNav();
    } else {
        openNav();
    }
}

function openNav() {
    navIsOpen = true;
    document.getElementsByClassName("dropdown-content")[0].style.display = "block";
}

function closeNav() {
    navIsOpen = false;
    document.getElementsByClassName("dropdown-content")[0].style.display = "none";
}

let accountPicture = document.getElementById("account-picture");
accountPicture.addEventListener("click", () => {
    openCloseNav(accountPicture);
});

// When the nav drawer is open and the user clicks outside the drawer, the drawer will close
document.addEventListener('click', function (event) {
    var accountPicture = document.getElementById("account-picture");
    var dropdownContent = document.getElementsByClassName("dropdown-content")[0];
    var isClickInaccountPicture = accountPicture.contains(event.target);
    var isClickIndropdownContent = dropdownContent.contains(event.target);

    if (navIsOpen && !isClickInaccountPicture && !isClickIndropdownContent) {
        openCloseNav(dropdownContent);
    }
});