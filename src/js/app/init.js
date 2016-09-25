/******************************************
             Initialisation
******************************************/

const $ = require('jquery');

import { watchFormatting, watchWordCount, toggleAbout } from './texteditor';
import googleDriveSetup from './google';
import inputSetup from './input';
import oldBrowserCheck from './old-browsers';
import languageSetup from './languages';
import Player from './player/player'

export default function init(){
    // oT.backup.init();
    watchWordCount();
    watchFormatting();
    languageSetup();
    // oT.timestamp.activate();
    googleDriveSetup();
    if ( localStorageManager.getItem("lastfile") ) {
        toggleAbout();
    }
}

// note: this function may run multiple times
function onLocalized() {
    inputSetup({
        create: function(file) {
		    let player = new Player({
		        driver: Player.drivers.HTML5_AUDIO,
		        source: window.URL.createObjectURL(file)
		    });
            // player.play();
        }
    });
    
    var startText = document.webL10n.get('start-ready');
    $('.start')
        .text(startText)
        .addClass('ready')
        .off()
        .click(toggleAbout);
    
    oldBrowserCheck();
    // oT.input.loadPreviousFileDetails();
}

window.addEventListener('localized', onLocalized, false);

$(window).resize(function() {
    if (document.getElementById('media') ) {
        document.getElementById('media').style.width = oT.media.videoWidth();
    }
});


