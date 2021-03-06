$(".carousel").carousel({
  interval: 3000,
});

// Khi click vao bai viet se đưa đến trang detail
$(document).on("click", ".mom-article .col-md-4 img", function () {
  location.assign(`/detail/${$(this).attr("idpost")}`);
  Cookies.set("idPost", $(this).attr("idpost"));
});

$(document).on("click", ".mom-article .col-md-4 .title-article", function () {
  location.assign(`/detail/${$(this).attr("idpost")}`);
  Cookies.set("idPost", $(this).attr("idpost"));
});

/* End */
Cookies.remove("search");

/* Tìm kiếm */
let xoaTinh = true;
$.getJSON("public/local.json", function (result) {
  $("#tinh").on("click", function () {
    if (xoaTinh == true) {
      result.forEach((tinh, index) => {
        let option = `<option>${tinh.name}</option>`;
        $("#tinh").append(option);
      });
    } else {
      $("#tinh").html("<option>Tất cả</option>");
      xoaTinh = true;
    }
  });

  $("#tinh").change(function () {
    let ten_tinh = $(this).find(":selected").val();
    let tinh_arr = [];
    if (ten_tinh != "Tất cả") {
      tinh_arr = result.filter((tinh, index) => {
        return tinh.name == ten_tinh;
      });
      let huyen_arr = tinh_arr[0].districts;
      $("#huyen").html("<option>Tất cả</option>");
      $("#xa").html("<option>Tất cả</option>");
      $("#duong").html("<option>Tất cả</option>");
      huyen_arr.forEach((huyen, index) => {
        let option = `<option>${huyen.name}</option>`;
        $("#huyen").append(option);
      });
    } else {
      xoaTinh = false;
      $("#huyen").html("<option>Tất cả</option>");
      $("#xa").html("<option>Tất cả</option>");
      $("#duong").html("<option>Tất cả</option>");
    }
  });

  $("#huyen").change(function () {
    let ten_tinh = $("#tinh").find(":selected").val();
    let ten_huyen = $("#huyen").find(":selected").val();
    $("#xa").html("<option>Tất cả</option>");
    $("#duong").html("<option>Tất cả</option>");
    if (ten_tinh != "Tất cả" && ten_huyen != "Tất cả") {
      let tinh_arr = [];
      console.log(result, ten_tinh, ten_huyen);
      tinh_arr = result.filter((tinh, index) => {
        return tinh.name == ten_tinh;
      });
      let arr_huyen = tinh_arr[0].districts;
      let huyen = arr_huyen.filter((huyen, index) => {
        return huyen.name == ten_huyen;
      });
      let xa_arr = huyen[0].wards;
      let duong_arr = huyen[0].streets;
      xa_arr.forEach((xa, index) => {
        let option = `<option>${xa.name}</option>`;
        $("#xa").append(option);
      });
      duong_arr.forEach((duong, index) => {
        let option = `<option>${duong.name}</option>`;
        $("#duong").append(option);
      });
    }
  });
});

/* Tim kiem end */

// Lấy thông tin tất cả bài đăng
let n = 0;
let length = 0;
let distance = 0;

$.ajax({
  method: "post",
  url: "/all-post",
  data: {
    n: n,
  },
})
  .then(function (result) {
    let html_parent = "";
    length = result.data[1];
    distance = result.data[2];
    $("#amount-article > span").text(length);
    if (length <= distance) $("#limit2").text(length);
    else $("#limit2").text(distance);
    result.data[0].forEach((article, index) => {
      if (article.status === "active") {
        let html = `
      <div class="col-md-4 wow bounceInUp">
        <div class="amount-image">
          <i class="far fa-image"></i>
          <span id="amount-image">${article.images_room.length}</span>
        </div>
        <img class="img-fluid" src=${article.images_room[0].trim()} idpost=${article._id
          }>
        <div class="card card-body">
          <h5 class="card-title title-article" idpost=${article._id}>${article.kind_room
          }</h5>
          <div class="row info-article">
            <div class="col-6 text-left">
              <i class="fas fa-money-bill"></i><span>${article.price / 1000000
          } triệu/tháng</span>
            </div>
            <div class="col-6 text-right">
              <i class="fas fa-home"></i><span>${article.area
          } m<sup>2</sup></span>
            </div>
            <div class="col-12 text-left">
              <i class="fas fa-map-marker-alt"></i><span>${article.address_room
          }</span>
            </div>
            <div class="col-6 text-left">
              <i class="far fa-clock"></i><span>${new Date(
            article.createdAt
          ).getDate()}/${new Date(article.createdAt).getMonth() + 1
          }/${new Date(article.createdAt).getFullYear()}</span>
            </div>
            <div class="col-3 text-right">
              <i class="far fa-eye text-info" id="seen"></i><span>${article.seen
          }</span>
            </div>
            <div class="col-3 text-right">
              <i class="far fa-heart" id="like" idpost=${article._id
          }></i><span id="total-like">${article.like}</span>
            </div>
          </div>
        </div>
      </div>
`;
        $(".mom-article").append(html);
      }
    });
  })
  .catch(function (err) { });

$("#next").on("click", function () {
  n += distance;
  if (n >= length) {
    n = n - distance;
    $("#limit1").text(n + 1);
    $("#limit2").text(length);
  } else {
    $("#limit1").text(n + 1);
    if (n + distance >= length) $("#limit2").text(length);
    else {
      $("#limit2").text(n + distance);
    }
    $(".mom-article").html("");
    $.ajax({
      method: "post",
      url: "/all-post",
      data: {
        n: n,
      },
    })
      .then(function (result) {
        let html_parent = "";
        result.data[0].forEach((article, index) => {
          if (article.status === 'active') {

            let html = `
            <div class="col-md-4 wow bounceInLeft" id=${article._id}>
              <div class="amount-image">
                <i class="far fa-image"></i>
                <span id="amount-image">${article.images_room.length
              }</span>
              </div>
              <img class="img-fluid" idpost=${article._id} src=${article.images_room[0]
              }>
              <div class="card card-body">
                <h5 class="card-title title-article" idpost=${article._id
              }>${article.kind_room}</h5>
                <div class="row info-article">
                  <div class="col-6 text-left">
                    <i class="fas fa-money-bill"></i><span>${article.price / 1000000
              } triệu/tháng</span>
                  </div>
                  <div class="col-6 text-right">
                    <i class="fas fa-home"></i><span>${article.area
              } m<sup>2</sup></span>
                  </div>
                  <div class="col-12 text-left">
                    <i class="fas fa-map-marker-alt"></i><span>${article.address_room
              }</span>
                  </div>
                  <div class="col-6 text-left">
                    <i class="far fa-clock"></i><span>${new Date(
                article.createdAt
              ).getDate()}/${new Date(article.createdAt).getMonth() + 1
              }/${new Date(article.createdAt).getFullYear()}</span>
                  </div>
                  <div class="col-3 text-right">
                     <i class="far fa-eye text-info" id="seen"></i><span>${article.seen
              }</span>
                  </div>
                  <div class="col-3 text-right">
                    <i class="far fa-heart" id="like" idpost=${article._id
              }></i><span id="total-like">${article.like}</span>
                  </div>
                </div>
              </div>
            </div>
  `;
            $(".mom-article").append(html);
          }
          /*
        html_parent += html_child;
        if(index % 3 == 2){
          html_parent = `<div class='row ${index == 2 ? 'block' : 'none'}'>` + html_parent + "</div>";
          $(".mom-article").append(html_parent);
          html_parent = "";
        };
        if(index == result.data.length - 1){
          html_parent = `<div class='row ${index == 2 ? 'block' : 'none'}'>` + html_parent + "</div>";
          $(".mom-article").append(html_parent);
        }*/
        });
      })
      .catch(function (err) { });
  }
});

$("#prev").on("click", function () {
  n -= distance;
  if (n < 0) {
    n = 0;
    $("limit1").text(n);
    if (length <= distance) $("#limit2").text(length);
    else $("#limit2").text(distance);
  } else {
    $("#limit1").text(n + 1);
    $("#limit2").text(n + distance);
    $(".mom-article").html("");
    $.ajax({
      method: "post",
      url: "/all-post",
      data: {
        n: n,
      },
    })
      .then(function (result) {
        let html_parent = "";
        result.data[0].forEach((article, index) => {
          if (article.status === "active") {

            let html = `
            <div class="col-md-4 wow bounceInRight" id=${article._id}>
              <div class="amount-image">
                <i class="far fa-image"></i>
                <span id="amount-image">${article.images_room.length
              }</span>
              </div>
              <img class="img-fluid" idpost=${article._id} src=${article.images_room[0]
              }>
              <div class="card card-body">
                <h5 class="card-title title-article" idpost=${article._id
              }>${article.kind_room}</h5>
                <div class="row info-article">
                  <div class="col-6 text-left">
                    <i class="fas fa-money-bill"></i><span>${article.price / 1000000
              } triệu/tháng</span>
                  </div>
                  <div class="col-6 text-right">
                    <i class="fas fa-home"></i><span>${article.area
              } m<sup>2</sup></span>
                  </div>
                  <div class="col-12 text-left">
                    <i class="fas fa-map-marker-alt"></i><span>${article.address_room
              }</span>
                  </div>
                  <div class="col-3 text-right">
                     <i class="far fa-eye text-info" id="seen"></i><span>${article.seen
              }</span>
                  </div>
                  <div class="col-3 text-right">
                     <i class="far fa-heart" id="like" idpost=${article._id
              }></i><span id="total-like">${article.like}</span>
                  </div>
                </div>
              </div>
            </div>
  `;
            $(".mom-article").append(html);
          }
          /*
        html_parent += html_child;
        if(index % 3 == 2){
          html_parent = `<div class='row ${index == 2 ? 'block' : 'none'}'>` + html_parent + "</div>";
          $(".mom-article").append(html_parent);
          html_parent = "";
        };
        if(index == result.data.length - 1){
          html_parent = `<div class='row ${index == 2 ? 'block' : 'none'}'>` + html_parent + "</div>";
          $(".mom-article").append(html_parent);
        }*/
        });
      })
      .catch(function (err) { });
  }
});

/* End */

/* Tìm kiếm backend */
$("#search").on("click", function () {
  let loai_nha_tro = $("#loai-nha-tro").find(":selected").val();
  let tinh = $("#tinh").find(":selected").val();
  let huyen = $("#huyen").find(":selected").val();
  let xa = $("#xa").find(":selected").val();
  let duong = $("#duong").find(":selected").val();
  let an_ninh = $("#an-ninh").find(":selected").val();
  let ban_cong = $("#ban-cong:checked").val() == "on" ? "Yes" : "No";
  let dieu_hoa = $("#dieu-hoa:checked").val() == "on" ? "Yes" : "No";
  let binh_nong_lanh =
    $("#binh-nong-lanh:checked").val() == "on" ? "Yes" : "No";
  let tu_lanh = $("#tu-lanh:checked").val() == "on" ? "Yes" : "No";
  let may_giat = $("#may-giat:checked").val() == "on" ? "Yes" : "No";
  let muc_gia = $("#muc-gia").find(":selected").val().split(" ");
  let dien_tich = $("#dien-tich").find(":selected").val().split(" ");

  let muc_gia_min = 0;
  let muc_gia_max = 0;
  let dien_tich_min = 0;
  let dien_tich_max = 0;

  if (muc_gia.length == 2) {
    muc_gia_min = 0;
    muc_gia_max = 99999999;
  } else if (muc_gia.length == 3 && muc_gia[0] == "<=") {
    muc_gia_min = 0;
    muc_gia_max = Number(muc_gia[1]);
  } else if (muc_gia.length == 3 && muc_gia[0] == ">=") {
    muc_gia_min = muc_gia[1];
    muc_gia_max = 99999999;
  } else {
    muc_gia_min = muc_gia[0];
    muc_gia_max = muc_gia[3];
  }

  if (dien_tich.length == 2) {
    dien_tich_min = 0;
    dien_tich_max = 99999999;
  } else if (dien_tich.length == 3 && dien_tich[0] == "<=") {
    dien_tich_min = 0;
    dien_tich_max = Number(dien_tich[1]);
  } else if (dien_tich.length == 3 && dien_tich[0] == ">=") {
    dien_tich_min = dien_tich[1];
    dien_tich_max = 99999999;
  } else {
    dien_tich_min = dien_tich[0];
    dien_tich_max = dien_tich[3];
  }

  let search = {
    loai_nha_tro,
    tinh,
    huyen,
    xa,
    duong,
    an_ninh,
    dien_tich_min,
    dien_tich_max,
    muc_gia_min,
    muc_gia_max,
    ban_cong,
    dieu_hoa,
    binh_nong_lanh,
    tu_lanh,
    may_giat,
  };
  // xoa cookie
  //document.cookie = "search=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  Cookies.set("search", JSON.stringify(search));
  // console.log(JSON.parse(Cookies.get('search')));

  location.assign(
    `/list/loai_nha_tro/${loai_nha_tro}/tinh/${tinh}/huyen/${huyen}/xa/${xa}/duong/${duong}/an_ninh/${an_ninh}/dien_tich_min/${dien_tich_min}/dien_tich_max/${dien_tich_max}/muc_gia_min/${muc_gia_min}/muc_gia_max/${muc_gia_max}/ban_cong/${ban_cong}/dieu_hoa/${dieu_hoa}/binh_nong_lanh/${binh_nong_lanh}/tu_lanh/${tu_lanh}/may_giat/${may_giat}`
  );

  //console.log(muc_gia, dien_tich);
  //console.log(loai_nha_tro, tinh, huyen, xa, duong, an_ninh, ban_cong, dieu_hoa, binh_nong_lanh, tu_lanh, may_giat);
});

/* Tìm kiếm backend kết thúc */
