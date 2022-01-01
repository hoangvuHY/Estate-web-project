/* Gọi API login */
$("#btn-login").on("click", (e) => {
  e.preventDefault();
  $.ajax({
    url: "auth/login",
    method: "post",
    data: {
      email: $("#email").val(),
      password: $("#password").val(),
    },
  }).then((data) => {
    if (!data.error && data.status === 200) {
      window.location.href = "/";
      alert(data.message);
    } else {
      alert(data.message);
    }
  });
});

/* Gọi API register */
$("#btn-register").on("click", (e) => {
  e.preventDefault();
  var check = true;

  //validation Password
  var password = $("#passwordRegister").val();
  if (password == "") {
    alert("Phải nhập trường password");
    $("#passwordRegister").focus();
    check = false;
  } else {
    //Have at least 8 characters including 1 uppercase, 1 lowercase letter and 1 number:
    var patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!patternPassword.test(password)) {
      alert(
        "Nhập đúng định dạng. Gồm ít nhất 8 ký tự bao gồm 1 chữ hoa, 1 chữ thường và 1 số"
      );
      $("#passwordRegister").focus();
      check = false;
    } else {
      $("#errorPassword").css("display", "none");
      $("#passwordRegister").css("background", "#E8F0FE");
    }
  }
  //validation Confirm Password
  var confirmPassword = $("#confirmPassword").val();
  if (confirmPassword == "") {
    alert("Phải nhập trường nhập lại mật khẩu");
    $("#confirmPassword").focus();
    check = false;
  } else {
    //Have at least 8 characters including 1 uppercase, 1 lowercase letter and 1 number: HotBoy9x
    var patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!patternPassword.test(confirmPassword)) {
      alert(
        "Nhập đúng định dạng. Gồm ít nhất 8 ký tự bao gồm 1 chữ hoa, 1 chữ thường và 1 số"
      );
      $("#confirmPassword").focus();
      check = false;
    } else {
      if (password !== confirmPassword) {
        alert("Mật khẩu không giống nhau");
        $("#confirmPassword").focus();
        check = false;
      }
      $("#errorConfirmPassword").css("display", "none");
      $("#confirmPassword").css("background", "#E8F0FE");
    }
  }
  //validation Email
  var email = $("#emailRegister").val();
  if (email == "") {
    alert("Nhập trường email");
    $("#email").focus();
    check = false;
  } else {
    var patternEmail = /^\w+@[a-zA-Z_]+?(\.[a-zA-Z]{2,3}){1,2}$/;
    if (!patternEmail.test(email)) {
      alert("Nhập đúng định dạng. Ví dụ: abc@gmail.com");
      $("#emailRegister").focus();
      check = false;
    } else {
      $("#errorEmail").css("display", "none");
    }
  }

  //validation username :
  var username = $("#username").val();
  if (username == "") {
    alert("Nhập trường username");
    $("#username").focus();
    check = false;
  } else {
    $("#errorUsername").css("display", "none");
    $("#username").css("background", "#E8F0FE");
  }
  //validation identification :
  var identification = $("#identification").val();
  if (identification == "") {
    alert("Nhập trường identification");
    $("#identification").focus();
    check = false;
  } else {
    var patternIdentification = /^\d{12}$/;
    if (!patternIdentification.test(identification)) {
      alert("Nhập đủ 12 số");
      $("#identification").focus();
      check = false;
    } else {
      $("#errorIdentification").css("display", "none");
      $("#identification").css("background", "#E8F0FE");
    }
  }

  //validation address
  var address = $("#address").val();
  if (address == "") {
    alert("Nhập trường address");
    $("#address").focus();
    check = false;
  } else {
    var patternAddress = /^.+$/;
    if (!patternAddress.test(address)) {
      alert("Nhập đúng định dạng");
      $("#address").focus();
      check = false;
    } else {
      $("#errorAddress").css("display", "none");
    }
  }
  //validation Phone number
  var phone = $("#phone").val();
  if (phone == "") {
    $("#phone").focus();
    alert("Nhập trường phone");
    check = false;
  } else {
    var patternPhone = /^0\d{9}$/;
    if (!patternPhone.test(phone)) {
      alert("Nhập đúng định dạng. Ví dụ: 0989878767");
      $("#phone").focus();
      check = false;
    } else {
      $("#errorPhone").css("display", "none");
    }
  }
  //validation name :
  var name = $("#name").val();
  if (name == "") {
    alert("Nhập trường name");
    $("#name").focus();
    check = false;
  } else {
    var patternName = /^\D+$/g;
    if (!patternName.test(name)) {
      alert("Nhập đúng định dạng. Ví dụ: Hoàng Tuấn Vũ");
      check = false;
    } else {
      $("#errorName").css("display", "none");
    }
  }
  //pass: isBoy123
  //email: hoangvu@gmail.com
  //phone: 0369875216
  //identification: 1326597856985
  //name: Hoàng Tuấn Vũ
  if (check) {
    $.ajax({
      url: "auth/sign-up",
      method: "post",
      data: {
        email: $("#emailRegister").val(),
        name: $("#name").val(),
        birthday: $("#birthday").val(),
        phone: $("#phone").val(),
        address: $("#address").val(),
        identification: $("#identification").val(),
        username: $("#username").val(),
        role: $("#role").val(),
        password: $("#passwordRegister").val(),
      },
    }).then((data) => {
      if (!data.error && data.status === 200) {
        window.location.href = "/login";
        alert(data.message);
      } else {
        alert(data.message);
      }
    });
  }
});
