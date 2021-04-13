$(function(){
    giruserinfo();
    // 绑定退出点击事件
    $('#quit').on('click', function(){
       layer.confirm('确认退出登录吗？',
       {icon:3,title:'提示'},
       function(index) {
            // console.log(index);
            
            localStorage.removeItem('token');
            // 跳转到登录主页面
            location.href = './login.html';

            layer.close(index);
       })
    })
});

function giruserinfo() {
    $.ajax({
        type: "GET",
        url:'/my/userinfo',
       
        success:function(res){
            console.log(res);
            if(res.status !== 0) {
                return layui.layer.msg('获取用户失败')
            }
            renderAvtar(res.data);
        },
        // complete:function(res) {
        //     console.log(res)
        //     const {responseJSON} = res
        //     const {status} = responseJSON;
        //     const {message} = responseJSON 
        //     if(status === 1 && 
        //         message === '身份认证失败！') 
        //     {
        //        location.href = './login.html'
        //     }
        // }
    });
}

 // 渲染用户头像
function renderAvtar(user) {
    // 获取用户名
   const name = user.nickname || user.username
   
   $('.welcome1').html('欢迎' + name);
   if(user.user_pic) {
         $('.layui-nav-img').attr('src',user.user_pic).show();
         $('.text-avatar').hide()
   } else{
        $('.layui-nav-img').hide();
        const first = name[0].toUpperCase();
        $('.text-avatar').html(first).show
   }

}