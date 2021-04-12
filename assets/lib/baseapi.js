$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  
    if(options.url.includes('/my/')) {
      options.headers = {
        Authorization:localStorage.token || '',
      }
      options.complete = function(res) {
        // const {responseJSON} = res
        // const {status} = responseJSON;
        // const {message} = responseJSON 
        if(res.status === 1 && res.responseJSON.message === "身份认证失败！") {
          
            location.href = './login.html'
         
        }
        
      }
    };

    
})