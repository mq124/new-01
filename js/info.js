$(function(){
    const {form} = layui;
    const layer = layui.layer
    form.verify({
        nickname:function(value) {
            if(value.length > 6) {
                return '昵称不能超过6位'
            }
        }
    })

    inituserinfo()
    function inituserinfo() {
        $.ajax({
            method:'GET', 
            url:'/my/userinfo', 
            success: function(res) {
               if(res.status !== 0) {
                   return layer.msg('获取用户信息失败!')
               }
            //    console.log(res);
               form.val('formUserInfo', res.data)
            }
        })
    };

    // 重置表单数据
    $('#reset').on('click',function(e){
        // 阻止表单默认行为
        e.preventDefault();
        inituserinfo();
    });


    // 表单提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault();

        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success: function(res) {
                console.log(res);
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg('更新成功');
                window.parent.giruserinfo();
            }
        })
    })
})