function subscribeuser() {
    var fullName = $('#subsEmail').val();
    var errorMess = '<p>Email Id should not be blank</p>';

    if (fullName) {
        var validateData = validateForm();
        if (validateData != 0) {
            $.ajax({
                url: "phpBackend/saveNewsletterSubs.php",
                method: "POST",
                data: {
                    email: fullName
                },
                dataType: 'json',
                success: function(data) {
                    if (data.status == 1) {
                        webengage.track('User Subscribed Successfully', {
                            "On click": true
                        });
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: data.message,
                            showConfirmButton: 1
                        }).then(function() {
                            $('#subsEmail').val('');
                        });
                    } else {
                        webengage.track('User Subscribed Error Occured', {
                            "On click": true
                        });
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: data.message,
                            showConfirmButton: 1
                        })
                    }

                }
            });

        } else {
            errorMess = '<p style="color:black;">Incorrect Email Id. Please check again';
            document.getElementById('subsError').innerHTML = errorMess;
            document.getElementById('subsError').style.display = 'block';
            document.getElementById('subsError').style.height = '50px';
            document.getElementById('subsError').style.transition - 'all .4s ease-out';
            setTimeout(() => {
                document.getElementById('subsError').style.display = 'none';

            }, 10000);
            // $("#subsError").fadeOut("slow");
            return false;
        }
    } else {
        errorMess = '<p style="color:black;">Email Id is blank. Kindly check';
        document.getElementById('subsError').innerHTML = errorMess;
        document.getElementById('subsError').style.display = 'block';
        document.getElementById('subsError').style.height = '50px';
        document.getElementById('subsError').style.transition - 'all .4s ease-out';
        setTimeout(() => {
            document.getElementById('subsError').style.display = 'none';

        }, 10000);
        // document.getElementById('subsError').style.display = 'block';
        // document.getElementById('subsError').style.height = '50px';
        // document.getElementById('subsError').style.transition - 'all .4s ease-out';
        // $("#subsError").fadeOut("slow");
        return false;
    }


}


function saveTawkData(data) {
    $.ajax({
        url: "phpBackend/saveTawkData.php",
        method: "POST",
        data: {
            data: data
        },
        dataType: 'json',
        success: function(data) {
            if (data.status == 1) {
                console.log('tawk data saved');
            } else {
                console.log('tawk data error');
            }

        }
    });


}

function redirectPage(pageName, eventName) {
    // webengage.track(eventName, {"On click" : true});
    window.location.href = '/' + pageName;
    //    window.location.href = pageName;
}

function redirectOtherPage(pageName, eventName) {
    // webengage.track(eventName, {"On click" : true});
    window.open(pageName, '_blank');
    //    window.location.href = pageName;
}



function validateForm() {
    var email = $('#subsEmail').val();

    if (email) {
        var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var validEmail = regEx.test(email);
        if (validEmail) {
            // document.getElementById('subsEmail').style.borderColor = '#E0E0E0';
            return 1;
        } else {
            // document.getElementById('subsEmail').style.borderColor = 'red';
            return 0;
        }

    } else {
        // document.getElementById('subsEmail').style.borderColor = 'red';
        return 0;
    }

}

function saveContatUs() {
    $('#loader').show();
    var fullName = $('#fullName').val();
    var drpSubject = $('#drpSubject').val();
    var email = $('#email').val();
    var mobileNo = $('#mobileNo').val();
    var message = $('#message').val();
    var errorMess = '<p>Email Id should not be blank</p>';
    var formType = 1;


    var validateData = validateContactForm();

    if (validateData == 0) {
        $.ajax({
            url: "phpBackend/saveContactUs.php",
            method: "POST",
            data: {
                fullName: fullName,
                drpSubject: drpSubject,
                email: email,
                mobileNo: mobileNo,
                message: message,
                formType: formType
            },
            dataType: 'json',
            headers: {
                "tokenKey": phpSessionValue
            },
            success: function(data) {
                $('#loader').hide();
                if (data.status == 1) {
                    webengage.track('Contact Us Form Saved Successfully', {
                        "On click": true
                    });
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: data.message,
                        showConfirmButton: 1
                    }).then(function() {
                        window.location = "contact-us";
                    });
                } else {
                    webengage.track('Contact Us Form Error Occured', {
                        "On click": true
                    });
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: data.message,
                        showConfirmButton: 1
                    })
                }

            }
        });

    } else {
        $('#loader').hide();
        return false;
    }



}

function validateContactForm() {
    var fullName = $('#fullName').val();
    var drpSubject = $('#drpSubject').val();
    var email = $('#email').val();
    var mobileNo = $('#mobileNo').val();
    var message = $('#message').val();

    var errOutput = [];
    var noterrOutput = [];

    if (fullName) {
        document.getElementById('fullName').style.borderColor = '#E0E0E0';
    } else {
        errOutput.push("fullName");
    }
    if (mobileNo) {
        document.getElementById('mobileNo').style.borderColor = '#E0E0E0';
    } else {
        errOutput.push("mobileNo");
    }
    if (email) {
        // var regEx = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
        var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var validEmail = regEx.test(email);
        if (validEmail) {
            document.getElementById('email').style.borderColor = '#E0E0E0';
        } else {
            errOutput.push("email");
        }

    } else {
        errOutput.push("email");
    }
    if (drpSubject) {
        document.getElementById('drpSubject').style.borderColor = '#E0E0E0';
    } else {
        errOutput.push("drpSubject");
    }

    if (message) {
        document.getElementById('message').style.borderColor = '#E0E0E0';
    } else {
        errOutput.push("message");
    }

    if (errOutput.length > 0) {
        for (i = 0; i < errOutput.length; i++) {
            document.getElementById(errOutput[i]).style.borderColor = 'red';
        }
        return 1;
    } else {
        return 0;
    }

}

$('#mobileNo').on('keypress', function(e) {
    var $this = $(this);
    var regex = new RegExp("^[0-9\b]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    // for 10 digit number only
    if ($this.val().length > 9) {
        e.preventDefault();
        return false;
    }
    if (e.charCode < 53 && e.charCode > 47) {
        if ($this.val().length == 0) {
            e.preventDefault();
            return false;
        } else {
            return true;
        }
    }
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
});

$('#abMobileNo').on('keypress', function(e) {
    var $this = $(this);
    var regex = new RegExp("^[0-9\b]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    // for 10 digit number only

    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
});

$('#fullName').keydown(function(e) {
    if (e.ctrlKey || e.altKey) {
        e.preventDefault();
    } else {
        var key = e.keyCode;
        if (!((key == 8) || (key == 9) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
            e.preventDefault();
        }
    }
});

function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
        x.style.marginRight = "-40px";
        //  x.style.marginRight = "50px";
    } else {
        x.style.display = "none";
        x.style.marginRight = "-40px";
    }
}

function scrollToContact() {
    $('html, body').animate({
        scrollTop: $("#Booktrial").offset().top
    }, 2000);
}