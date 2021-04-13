$(function () {
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    $image.cropper(options)


    $('#btnimage').on('click', function () {
        $('#file').click();
    });


    // 用文件上传的change事件获取用户上传的图片
    $('#file').on('change', function (e) {

        var file = e.target.files[0];

        if (!file) {
            return layui.layer.msg('请上传图片');
        }

        const imgurl = URL.createObjectURL(file);

        //    插件里面的方法
        $image
            .cropper('destroy')
            .attr('src', imgurl)
            .cropper(options)
    })



    // 把裁剪的图片上传到服务器上面
     $('#btnupload').on('click', function(){
        //  canvas画布 获取用户剪裁好的图片
        var dataURL = $image
        .cropper('getCroppedCanvas', {
          // 创建一个 Canvas 画布
          width: 100,
          height: 100
        })

        .toDataURL('image/png')

        $.ajax({
            method:'POST',
            url:'/my/update/avatar',
            data:{
                avatar:dataURL
            },
            success: function(res) {
                if(res.status !== 0) {
                    return layui.layer.msg('更换头像失败')
                }
                layui.layer.msg('更换头像成功');
                window.parent.giruserinfo();
            }
        })
     })

})