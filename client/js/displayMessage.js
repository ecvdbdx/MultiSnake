'use strict';

import $ from 'jquery';

export default function displayMessage(title, message) {
    $("#message").html("<h2>"+title+"</h2><p>"+message+"</p>").addClass("active");
    $('body').addClass("blur");
}
