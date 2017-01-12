'use strict';

import $ from 'jquery';

export default function displayDisconnectMessage() {
    $("#message").html("<h2>Warning !</h2><p>You have been deconnected, please check your internet connection and try again</p>").addClass("active");
    $('body').addClass("blur");
}