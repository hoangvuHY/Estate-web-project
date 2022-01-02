(() => {
    $.ajax({
        method: 'GET',
        url: '/users/user-detail'
    }).then((result) => {
        if (!result.error && result.status === 200) {

            console.log(result, 'profile');

            const { dataUser } = result;
            Cookies.set("idRenter", dataUser._id);

            const template = `
          <div class="row gutters-sm">
          <div class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
                  <div class="mt-3">
                    <h4>${dataUser.username}</h4>
                    <p class="text-secondary mb-1">Người thuê trọ</p>
                    <a href="/favorite" class="btn btn-outline-primary">Phòng trọ yêu thích</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card mb-3">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Tên</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    ${dataUser.name}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                  ${dataUser.email}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Số điện thoại</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    0${dataUser.phone}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Địa chỉ</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    ${dataUser.address}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Ngày sinh</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                  ${new Date(dataUser.birthday).toLocaleDateString('vi')}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Số CMTND</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                  ${dataUser.identification}
                  </div>
                </div>
                <hr>
              </div>
            </div>
          </div>
        </div>
          `;

            $(".profile-renter-body").append(template);
        }
    }).catch((error) => {
        console.log(error);
    })
})();