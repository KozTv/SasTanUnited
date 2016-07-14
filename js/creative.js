/*!
 * Creative v1.0.4 (http://startbootstrap.com/template-overviews/creative)
 * Copyright 2013-2016 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap/blob/gh-pages/LICENSE)
 */

(function ($) {
    "use strict"; // Start of use strict

    

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function () {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    

    function getFormData() {
        var elements = document.getElementById("gform").elements; // all form elements
        var fields = Object.keys(elements).map(function (k) {
            if (elements[k].name !== undefined) {
                return elements[k].name;
            }
        }).filter(function (item, pos, self) {
            return self.indexOf(item) == pos && item;
        });
        var data = {};
        fields.forEach(function (k) {
            data[k] = elements[k].value;
        });
        console.log(data);
        return data;
    }

    function handleFormSubmit(event) {  // handles form submit withtout any jquery
        event.preventDefault();           // we are submitting via xhr below
        var data = getFormData();         // get the values submitted in the form
        if (!(data.name)) {
            document.getElementById('name-invalid').style.display = 'block';
            return false;
        }
        $("#regWaiter").show();
        var url = event.target.action;  //
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        // xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            //console.log(xhr.status, xhr.statusText)
            //console.log(xhr.responseText);
            //var respData = JSON.parse(xhr.responseText);
            $(".removeAfterFormSubmit").hide();
            $('#thankyou_message').show();
            //$('#pieOfTheDay').text(respData.data);
            var aTag = $("#register");
            $('html,body').animate({ scrollTop: aTag.offset().top }, 'slow');
            return;
        };
        // url encode form data for sending as post data
        var encoded = Object.keys(data).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }).join('&')
        xhr.send(encoded);
    }

    var hash = location.hash;
    if (hash != "") {
        hash = hash.substring(1);
    }

    $.getJSON("https://script.google.com/macros/s/AKfycbybK_hr7vcZhXLvoPZNw67VgIdKNBMSMWsHs1RGQd0MewiTvtyN/exec?l=" + hash + "&callback=?", function (result) {
        if (result.result == "fail") {
            $("#loadingWaiter").hide();
            $("#accessDeniedInfo").show();
        }
        else {
            $("#mainContent").load(result.result, function () {
                $("#nameFormField").val(result.name);
                $("#lnameFormField").val(hash);
                if (result.phoneNeeded == 0)
                {
                    $("#phoneFormField").hide();
                }
                var form = document.getElementById('gform');
                form.addEventListener("submit", handleFormSubmit, false);

                // Initialize and Configure Scroll Reveal Animation
                window.sr = ScrollReveal();
                sr.reveal('.sr-icons', {
                    duration: 600,
                    scale: 0.3,
                    distance: '0px'
                }, 200);
                sr.reveal('.sr-button', {
                    duration: 1000,
                    delay: 200
                });
                sr.reveal('.sr-contact', {
                    duration: 600,
                    scale: 0.3,
                    distance: '0px'
                }, 300);

                // jQuery for page scrolling feature - requires jQuery Easing plugin
                $('a.page-scroll').bind('click', function (event) {
                    var $anchor = $(this);
                    $('html, body').stop().animate({
                        scrollTop: ($($anchor.attr('href')).offset().top - 50)
                    }, 1250, 'easeInOutExpo');
                    event.preventDefault();
                });
            });
        }
    });


})(jQuery); // End of use strict
