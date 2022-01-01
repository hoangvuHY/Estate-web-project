$(".save_new_room").on("click", () => {
  var address_room = $('input[name="address_room"]').val();
  var near_places = $('input[name="near_places"]').val();
  var kind_room = $('select[name="kind_room"]').val();
  var number_room = $('input[name="number_room"]').val();
  var price = $('input[name="price"]').val();
  var area = $('input[name="area"]').val();
  var general_owner = $('select[name="general_owner"]').val();
  var bathroom = $('select[name="bathroom"]').val();
  var hot_cold_bottles = $('select[name="hot_cold_bottles"]').val();
  var kitchen = $('select[name="kitchen"]').val();
  var cooking = $('select[name="cooking"]').val();
  var conditioning = $('select[name="conditioning"]').val();
  var balcony = $('select[name="balcony"]').val();
  var electricity_price = $('input[name="electricity_price"]').val();
  var water_price = $('input[name="water_price"]').val();
  var other_utility = $('input[name="other_utility"]').val();
  var time_post = $('select[name="time_post"]').val();
  var status = "active";

  
  $.ajax({
    url: "/owners/post-room",
    method: "post",
    data: {
      address_room,
      kind_room,
      near_places,
      number_room,
      price,
      area,
      general_owner,
      bathroom,
      hot_cold_bottles,
      kitchen,
      cooking,
      conditioning,
      balcony,
      electricity_price,
      water_price,
      other_utility,
      time_post,
      status,
    },
  })
    .then((result) => {
      if (!result.error && result.status === 200) {
        alert("Tạo bài đăng phòng trọ thành công");
        window.location.href = "/";
      } else {
        alert(result.message);
      }
    })
    .catch((error) => {});
});

getAllPosts();

function getAllPosts() {
  $.ajax({
    url: "/owners/all-posts-rent",
    method: "GET",
  })
    .then((result) => {
      var { dataPost } = result;
      if (!result.error && result.status === 200) {
        var template,
          rentStatus = "";
        $(".content-all-posts").empty();
        dataPost.forEach((post) => {
          if (post.status === "pending") {
            if (post.rent_status === "Hired") {
              template = `
          <tr>
            <th>${post.idOwner.name}</th>
            <th>${post._id}</th>
            <td>${post.idOwner.role}</td>
            <td>${new Date(post.createdAt).toLocaleDateString()}</td>
            <td></td>
            <td>${post.status}</td> 
            <td></td>
            <td></td> 
          </tr> 
          `;
            } else {
              template = `
          <tr>
            <th>${post.idOwner.name}</th>
            <th>${post._id}</th>
            <td>${post.idOwner.role}</td>
            <td>${new Date(post.createdAt).toLocaleDateString()}</td>
            <td></td>
            <td>${post.status}</td> 
            <td></td>
            <td></td>
            <td>
              <span class="edit" style="cursor: pointer; margin-right: 10px;" onClick = handleEditAccept.call(this) data-id='${
                post._id
              }' class="btn btn-primary" data-toggle="modal" data-target="#edit-accept">
                <i class=" fas fa-edit"></i>
              </span>
              <span  class="cancel" style="cursor: pointer;"  onClick = handleCancelPost.call(this) data-id-owner='${
                post.idOwner._id
              }' data-id='${
                post._id
              }'><i class="fas fa-minus-circle"></i></span>
            </td>
          </tr> 
          `;
            }
          } else if (post.status === "active") {
            if (post.idOwner.role === "owner") {
              if (post.rent_status === "Hired") {
                template = `
            <tr>
              <th>${post.idOwner.name}</th>
              <th>${post._id}</th>
              <td>${post.idOwner.role}</td>
              <td>${new Date(post.createdAt).toLocaleDateString()}</td>
              <td></td>
              <td>${post.status}</td> 
              <td>Đã được thuê</td>  
              <td></td> 
              <td></td>  
            </tr> 
            `;
              } else {
                template = `
            <tr>
              <th>${post.idOwner.name}</th>
              <th>${post._id}</th>
              <td>${post.idOwner.role}</td>
              <td>${new Date(post.createdAt).toLocaleDateString()}</td>
              <td>${new Date(post.expire_post).toLocaleDateString()}</td>
              <td>${post.status}</td> 
              <td>Chưa được thuê</td>  
              <td></td> 
              <td></td>  
            </tr> 
            `;
                if (
                  new Date().getTime() >= new Date(post.expire_post).getTime()
                ) {
                  $.ajax({
                    url: "/owners/update-post-room/" + post._id,
                    method: "put",
                    data: { status: "pending" },
                  })
                    .then((result) => {})
                    .catch((error) => {});
                }
              }
            }

            if (post.rent_status === "Hired" && post.idOwner.role === "admin") {
              template = `
            <tr>
              <th>${post.idOwner.name}</th>
              <th>${post._id}</th>
              <td>${post.idOwner.role}</td>
              <td>${new Date(post.createdAt).toLocaleDateString()}</td>
              <td></td>
              <td>${post.status}</td> 
              <td>Đã được thuê</td>  
              <td></td> 
              <td></td>  
            </tr> 
            `;
            }
            if (
              post.rent_status === "Not yet hired" &&
              post.idOwner.role === "admin"
            ) {
              template = `
            <tr>
              <th>${post.idOwner.name}</th>
              <th>${post._id}</th>
              <td>${post.idOwner.role}</td>
              <td>${new Date(post.createdAt).toLocaleDateString()}</td>
              <td></td> 
              <td>${post.status}</td> 
              <td>Chưa được thuê</td>  
              <td></td> 
              <td></td> 
              <td>
                <button onClick=handleHiredAdmin.call(this) style="font-size:13px;padding: 7px; " data-id = ${
                  post._id
                }  type="button" class="btn btn-primary btn-hired">
                   <i style="  margin-right: 5px;" class="fas fa-check"></i>Đã thuê
                </button>
              </td> 
            </tr> 
            `;
            }
          } else {
            template = `
          <tr>
            <th>${post.idOwner.name}</th>
            <th>${post._id}</th>
            <td>${post.idOwner.role}</td>
            <td>${new Date(post.createdAt).toLocaleDateString()}</td>
            <td></td>  
            <td>${post.status}</td>  
            <td></td>  
            <td>
             <span style="  cursor: pointer;" onClick=handleRestorePost.call(this)  data-id='${
               post._id
             }' class="restore ml-4"><i class="fas fa-trash-restore"></i></span> 
            </td> 
          </tr>  
          `;
          }
          $(".content-all-posts").append(template);
          $(".button-hired").append(rentStatus);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function handleEditAccept() {
  var idPost = $(this).attr("data-id");
  $.ajax({
    ///detail-post/:idPost
    method: "GET",
    url: "/owners/detail-post/" + idPost,
  })
    .then((result) => {
      var { dataPost } = result;
      console.log(dataPost.address_room);
      $(".content-edit-accept").empty();
      template = `
<style>
  * {
    margin: 0;
    padding: 0
  }

  .images-detail .image-room {
    width: 20%;

  }

  label.hot-cold-bottles {
    display: block;
    margin-bottom: 12px;
  }

  label.general-owner {
    float: left;
  }


  label.general-owner+input {
    margin-left: 180px;
  }

  input#general-owner+span {
    width: 100px;
    display: inline-block;
  }

  input,
  select {
    width: 75% !important;
    margin: auto;
  }
  label {
    font-weight: bold;
  }
  .form-group.col-6 {
    width: 50%;
    float: left;
}
</style>
 
<div class='row'>
  <div class="form-group  col-6">
    <label for="address_room ">Địa chỉ phòng trọ</label>
    <p>${dataPost.address_room}</p>
  </div>
  <div class="form-group  col-6 ">
    <label for="near_places ">Địa điểm công cộng gần đó</label>
    <p>${dataPost.near_places}</p>

  </div>
  <div class="form-group   col-6 ">
    <label for="kind_room">Loại phòng</label>
    <p>${dataPost.kind_room}</p> 
  </div>
  <div class="form-group  col-6 ">
    <label for="number_room">Số phòng</label>
    <p>${dataPost.number_room}</p> 
  </div>

  <div class="form-group   col-6 ">
    <label for="price">Giá</label>
    <p>${dataPost.price}</p> 
 
  </div>


  <div class="form-group  col-6 ">
    <label for="area">Diện tích</label>
    <p>${dataPost.area}</p>  
  </div>
  <div class="form-group  col-6 ">
    <label for="general_owner">Chung chủ</label>    
    <p>${dataPost.general_owner}</p>   
    </select>
  </div>
  
  <div class="form-group  col-6  ">
    <label for="time_post">Thời gian bài đăng</label>
    <p>${dataPost.time_post} Day</p>        
  </div>
  <div class="form-group  ">
    <div class="row">
      <h2 class="col-sm-12">Cơ sở vật chất</h2>
      <div class="col-sm-6">
        <label for="bathroom">Phòng Tắm</label>
          <p>${dataPost.bathroom}</p>    
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="hot_cold_bottles">Bình nóng lạnh</label>
        <p>${dataPost.hot_cold_bottles == 'Yes' ? 'Có': 'Không'}</p>     
      </div>
      <div class="col-sm-6">
        <label for="kitchen">Nhà bếp</label>
        <p>${dataPost.kitchen}</p>      
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="cooking">Nấu ăn</label>
        <p>${dataPost.cooking == 'Yes' ? 'Có': 'Không'}</p>       
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="conditioning">Điều hòa</label>
        <p>${dataPost.conditioning == 'Yes' ? 'Có': 'Không'}</p>       
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="balcony">Ban công</label>   
        <p>${dataPost.conditioning =='Yes' ? 'Có': 'Không'}</p>       

      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <div class="row">
          <div class="col-sm-6">
            <label for="electricity_price">Giá điện</label>
            <p>${dataPost.electricity_price}</p>        
          </div>
          <div class="col-sm-6">
            <label for="water_price">Giá nước</label>
            <p>${dataPost.water_price}</p>         
          </div>
        </div>
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="other_utility">Tiện ích khác</label>
        <p>${dataPost.other_utility}</p>        
      </div><!-- ennd col-6 -->
    </div>
  </div> 
  <div class="form-group   images-detail">

  </div>
</div> 
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
      <button onClick = handleAcceptedPost.call(this) data-time-post="${dataPost.time_post}" data-id-owner =  '${dataPost.idOwner} ' data-id = '${dataPost._id} ' type="button" class="btn btn-primary ">Chấp nhận</button>
    </div>
`;
      $(".content-edit-accept").append(template);
      $(".images-detail").empty();
      dataPost.images_room.forEach((image) => {
        var _image = `<img src="${image}" style="max-width: 25%!important" alt="Not Image" class="text-center w-100 img-thumbnail col-3">`;
        $(".images-detail").append(_image);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

//var status = 'active';

function handleAcceptedPost() {
  var idPost = $(this).attr("data-id");
  var idOwner = $(this).attr("data-id-owner");
  var content = "của bạn đã được chấp nhận";
  var status = "active";
  var timePost = parseInt($(this).attr("data-time-post"));
  var expire_post = new Date();
  $.ajax({
    url: "owners/update-post-room/" + idPost,
    method: "put",
    data: { status, expire_post: expire_post.addDays(timePost) },
  })
    .then((result) => {
      if (!result.error && result.status === 200) {
        alert(result.message);
        window.location.href = "/";
      } else {
        alert(result.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  $.ajax({
    url: "notify/create-notify",
    method: "post",
    data: { idPost, idOwner, content },
  });
}
function handleCancelPost() {
  var idPost = $(this).attr("data-id");
  var idOwner = $(this).attr("data-id-owner");
  var content = "của bạn đã bị hủy";
  var status = "cancel";
  $.ajax({
    url: "owners/update-post-room/" + idPost,
    method: "put",
    data: { status },
  })
    .then((result) => {
      if (!result.error && result.status === 200) {
        alert(result.message);
        window.location.href = "/";
      } else {
        alert(result.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  $.ajax({
    url: "notify/create-notify",
    method: "post",
    data: { idPost, idOwner, content },
  });
}
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
function handleRestorePost() {
  var idPost = $(this).attr("data-id");
  var status = "pending";
  $.ajax({
    url: "owners/update-post-room/" + idPost,
    method: "put",
    data: { status },
  })
    .then((result) => {
      if (!result.error && result.status === 200) {
        alert(result.message);
        window.location.href = "/";
      } else {
        alert(result.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function handleHiredAdmin() {
  var idPost = $(this).attr("data-id");
  console.log(idPost);
  var rent_status = "Hired";
  $.ajax({
    url: "owners/update-post-room/" + idPost,
    method: "put",
    data: { rent_status },
  })
    .then((result) => {
      if (!result.error && result.status === 200) {
        result.message = "Bạn đã cho thuê thành công";
        alert(result.message);
        $(this).parent().empty();
        window.location.href = "/";
      } else {
        alert(result.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
