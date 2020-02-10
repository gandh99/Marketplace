let accountMenuIsOpen = false;

// If the account menu is account-menu-user, then load the username
let dropdownUsername = document.getElementById('dropdown-username');
if (dropdownUsername) {
    dropdownUsername.innerHTML = sessionStorage.getItem('username');
}

function openCloseAccountMenu(x) {
    if (accountMenuIsOpen) {
        closeAccountMenu();
    } else {
        openAccountMenu();
    }
}

function openAccountMenu() {
    accountMenuIsOpen = true;
    document.getElementsByClassName("dropdown-content")[0].style.display = "block";
}

function closeAccountMenu() {
    accountMenuIsOpen = false;
    document.getElementsByClassName("dropdown-content")[0].style.display = "none";
}

let accountPicture = document.getElementById("account-picture");
accountPicture.addEventListener("click", () => {
    openCloseAccountMenu(accountPicture);
});

// When the nav drawer is open and the user clicks outside the drawer, the drawer will close
document.addEventListener('click', function (event) {
    var accountPicture = document.getElementById("account-picture");
    var dropdownContent = document.getElementsByClassName("dropdown-content")[0];
    var isClickInaccountPicture = accountPicture.contains(event.target);
    var isClickIndropdownContent = dropdownContent.contains(event.target);

    if (accountMenuIsOpen && !isClickInaccountPicture && !isClickIndropdownContent) {
        openCloseAccountMenu(dropdownContent);
    }
});