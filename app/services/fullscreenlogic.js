export default class FullScreenLogic {
    static addFullScreen(element) {
        document.onkeypress = event => {
            debugger;
            if (event.code === "KeyF") {
                if (element.width !== window.innerWidth) {
                    FullScreenLogic._launchIntoFullscreen(element);
                    // element.requestPointerLock();
                } else {
                    FullScreenLogic._exitFullScreen(element);
                }
            }
        }
    }

    static _launchIntoFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        element.width = window.innerWidth;
        element.height = window.innerHeight;
    }

    static _exitFullScreen(element) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        element.width = window.innerWidth / 2;
        element.height = window.innerHeight / 2;
    }
}