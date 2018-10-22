var commonSubmit = document.getElementById('commonSubmit');
// 父级评论焦点
function writeComment() {
  if (isEdit) {
    return
  } else {
    isEdit = true;
    $('#commonSubmit').fadeIn()
  }
}

// 取消父级评论
function cancelComment() {
  $('#commonSubmit').fadeOut()
  isEdit = false;
}

// 获取评论列表
function getlist() {
  var data = {
    path: location.href
  }
  let c = ''
  $.post('http://127.0.0.1:9001/comment', data, function(res) {
    c += '<div class="lay-title">'
    c += '<h3>'+ res.length +'条评论</h3>'
    c += '</div>'
    for (var i = 0; i < res.length; i++) {
      c += '<div class="lay-comment">'
      c += '<div class="lay-personInfo">'
      c += '<a class="lay-person-avator">'
      c += '<img src="ava.jpg" alt="">'
      c += '  </a>'
      c += '  <div class="lay-comment-name">'
      c += '<h3 class="lay-comment-title">'
      c += res[i].name
      c += '</h3>'
      c += '  <p>'+ [i+1] +'楼 · '+ res[i].date +'</p>'
      c += '</div>'
      c += '</div>'
      c += '<div class="lay-comment-content">'
      c += '  <p>'+ res[i].content +'</p>'
      c += '  <div class="lay-ztool">'
      c += '  <a href="javascript:;">'
      c += '    <i class="iconfont icon-dianzan1"></i>'
      c += '    <span>赞</span>'
      c += '  </a>'
      c += '  <a href="javascript:;" onclick="showReply('+ [i] +')">'
      c += '    <i class="iconfont icon-icon_reply"></i>'
      c += '    <span>回复</span>'
      c += '  </a>'
      c += '<div class="lay-zreply" id="reply_'+ [i] +'">'
      c += '  <textarea placeholder="回复'+ res[i].name +'" rows="5" id="replyCon_'+ [i] +'"></textarea>'
      c += '  <div class="lay-submit" id="tool_'+ [i] +'">'
      c += '    <a href="javascript:;" class="lay-commentBtn" onclick="submitReply('+[i]+')" data-name="'+ res[i].name +'" data-id="'+ res[i].id +'" id="return_'+ [i] +'">回复</a>'
      c += '    <a href="javascript:" class="lay-cancel" onclick="replyCancel('+ [i] +')">取消</a>'
      c += '  </div>'
      c += '</div>'
      c += '</div>'
      if (res[i].reply!='') {
        c += '<ul class="lay-zrelist">'
        for (var j = 0; j < res[i].reply.length; j++) {
          c += '<li>'
          c += '<h5>'+ res[i].reply[j].name +'：@'+ res[i].reply[j].replyTo + ' ' + res[i].reply[j].content +'</h5>'
          c += '<p>'
          c += '<span>'+ res[i].reply[j].date +'</span>'
          c += '<a href="javascript:;">'
          c += '<i class="iconfont icon-icon_reply"></i>'
          c += '<span>回复</span>'
          c += '</a></p>'
          c += '</li>'
        }
        c += '  </ul>'
      }
      c += '  </div>'
      c += '</div>'
    }
    $('.lay-content').html(c)
  })
}

// 写评论
function writeInt() {
  var data = {
    name: '',
    content: $('#commonTextarea').val(),
    path: location.href,
    replyName: ''
  }
  $.post('http://127.0.0.1:9001/commentint', data, function(res){
    cancelComment()
    getlist()
  })
}

// 显示回复框
function showReply(el) {
  $('#reply_'+ el).fadeIn()
  $('#tool_'+ el).fadeIn()
}

// 取消回复框
function replyCancel(e) {
  $('#reply_'+ e).fadeOut()
  $('#tool_'+ e).fadeOut()
}

// 回复
function submitReply(e, id) {
  if ($('#replyCon_'+ e).val() == '') {
    return
  }
  var data = {
    id: $('#return_'+e).attr('data-id'),
    name: '锦鲤',
    content: $('#replyCon_'+ e).val(),
    replyName: $('#return_'+e).attr('data-name'),
    path: location.href
  }
  $.post('http://127.0.0.1:9001/commentreply', data, function(res){
    replyCancel()
    getlist()
  })
}

getlist()
