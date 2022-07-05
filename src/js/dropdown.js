
var live_search = new liveSearch;
live_search.action();
var isLoadNoti = false;

function clickEventDropDown(this_dropdown, icon_default = "Null") {
    var _name = this_dropdown.getAttribute("bind");
    var _dropdown_menu = document.getElementById(_name);
    if (!_dropdown_menu.style.display || _dropdown_menu.style.display === "none") {
        this_dropdown.innerHTML = `<span class="material-icons-round">highlight_off</span>`;
        if (icon_default !== "expand_more") {
            this_dropdown.style.backgroundColor = "#ab3e3e";
        }
        _dropdown_menu.style.display = "flex";
        setTimeout(function() {
            _dropdown_menu.style.transform = "scale(1)";
        }, 50)
    } else {
        _dropdown_menu.style = null;
        this_dropdown.style = null;
        this_dropdown.innerHTML = `<span class="material-icons-round">${icon_default}</span>`;
    }
}
