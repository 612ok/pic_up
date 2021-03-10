var btn = document.querySelector('#submit');
var file = document.querySelector('#picFile');
var progress = document.querySelector('#progress');
btn.addEventListener('click', function() {
    var pic_file = file.files;
    if (pic_file.length <= 0) return alert('请选择文件');
    var fd = new FormData();
    fd.append('pic_file', pic_file[0]);
    var xhr = new XMLHttpRequest();


    xhr.upload.onprogress = function(e) {
        console.log(1);
        if (e.lengthComputable) {
            var rata = Math.ceil((e.loaded / e.total) * 100) + '%';
            console.log(rata);
            progress.style.width = rata;
            progress.innerHTML = rata;
        }
    }
    xhr.upload.onload = function() {
        progress.className = 'progress-bar progress-bar-success';
    }
    xhr.open('POST', 'http://www.liulongbin.top:3006/api/upload/avatar');
    xhr.send(fd);
    xhr.onreadystatechange = function() {
        console.log(123);
        if (xhr.status == 200 && xhr.readyState == 4) {
            var result = JSON.parse(xhr.responseText);
            var pic = document.querySelector('#picture');
            pic.src = 'http://www.liulongbin.top:3006' + result.url;
        }
    }
});