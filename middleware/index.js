let { getUserByIdService, checkEmailService } = require("../services/userService");
let { checkIdOwnerService } = require('../services/modifiesOwnerService')
var { Verify } = require('../utils/JWT');
var { caseErrorUser, caseErrorServer } = require('../utils/returnValue');

//register
let isEmailMiddleware = async (req, res, next) => {
  //Check Email có tồn tại không.
  try {
    let email = await checkEmailService(req.body.email);
    if (!email) {
      next();
    } else {
      caseErrorUser(res, "Tài khoản đã tồn tại");
    }
  } catch (error) {
    caseErrorServer(res, "Lỗi server isEmail Middleware");
  }
}
//login
let checkLoginMiddleware = async (req, res, next) => {
  try {
    let user = await checkEmailService(req.body.email);
    if (!user) {
      caseErrorUser(res, "Tài khoản không tồn tại ");
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    caseErrorServer(res, "Lỗi server checkLogin Middleware");
  }
}

let isIdOwnerMiddleware = async (req, res, next) => {
  //Check Email có tồn tại không.
  try {
    console.log(req.body.idOwner);
    let idOwner = await checkIdOwnerService(req.body.idOwner);
    if (!idOwner) {
      //Nếu idOwner không tồn tại
      next();
    } else {
      //Nếu email tồn tại 

      caseErrorUser(res, "Bạn đã gửi thông tin lên cho admin");
    }
  } catch (error) {
    caseErrorServer(res, "Lỗi server isEmail Middleware");
  }
}

let checkAuthFavorite = async (req, res, next) => {
  try {

    var token = req.cookies.token || req.body.token;
    // || req.headers.authorization;
    if (token) {
      let data = Verify(token, process.env.JWT_SECRET);
      let user = await getUserByIdService(data._id);
      if (user) {
        req.userLocal = user;
        next();
      } else {
        caseErrorUser(res, "Tài khoản không tồn tại");
      }
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    res.redirect('/login');
  }
}


//Check xem da dang nhap chua
let checkAuth = async (req, res, next) => {
  try {
    var token = req.cookies.token || req.body.token;
    // || req.headers.authorization;

    if (token) {
      let data = Verify(token, process.env.JWT_SECRET);
      let user = await getUserByIdService(data._id);
      if (user) {
        req.userLocal = user;
        next();
      } else {
        caseErrorUser(res, "Tài khoản không tồn tại");
      }
    } else {
      next();
      res.redirect('/');
    }
  } catch (error) {
    res.redirect('/login');
  }
}

let checkAdmin = async (req, res, next) => {
  if (req.userLocal.role == 'admin') {
    next();
  } else {
    caseErrorUser(res, "Bạn không có quyền");
  }
}

let checkOwner_Admin = async (req, res, next) => {
  if (req.userLocal.role == 'owner' || req.userLocal.role == 'admin') {
    next();
  } else {
    caseErrorUser(res, "Bạn không có quyền");
  }
}
let checkOwner = async (req, res, next) => {
  if (req.userLocal.role == 'owner') {
    next();
  } else {
    caseErrorUser(res, "Bạn không có quyền");
  }
}
module.exports = {
  isEmailMiddleware,
  checkLoginMiddleware,
  checkAdmin,
  checkAuth,
  checkOwner_Admin,
  isIdOwnerMiddleware,
  checkOwner,
  checkAuthFavorite
}

