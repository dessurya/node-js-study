$( document ).ready(function() {
    loadingScreen(false)
});

loadingScreen = (show) => {
    if (show == true) { $('#loading-page').fadeIn() }
    else { $('#loading-page').fadeOut() }
}

toogleClass = (param, target) => {
    $(target).toggleClass(param)
}