$(function () {
    $('#showStudentDetails').click(() => {
        $.get('/users/profile')
          .done((data) => {
            if (data.success) {
              let student = data.data;
              let $noticeBoard = $('#noticeBoard');
              console.log(student);
    
              $noticeBoard.css('display', 'block').empty().append(
                `
                  <div class="row no-gutters">
                    <div class="col">
                      <ul class="list-group">
                        <li class="list-group-item">Roll Number</li>
                        <li class="list-group-item">Name</li>
                        <li class="list-group-item">Email</li>
                        <li class="list-group-item">Contact</li>
                        <li class="list-group-item">Address</li>
                        <li class="list-group-item">Pincode</li>
                        <li class="list-group-item">Outside Delhi</li>
                        <li class="list-group-item">PWD</li>
                      </ul>
                    </div>
                    <div class="col">
                      <ul id="listDetails" class="list-group">
                      </ul>
                    </div>
                  </div>
                `)
            
              }
            }
            )
        })
    
})