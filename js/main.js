new Vue({
  el: '#lay-main',
  data: {
    commentText: '', // 评论
    topcommentBtn: false, // 顶部评论按钮组显隐
    commentlist: '',
    replyText: '',
    comminIndex: 0
  },
  methods: {
    commenttopChange() { // 顶部评论按钮组
      if (this.commentText != '') {
        this.topcommentBtn = true
      } else {
        this.topcommentBtn = false
      }
    },
    cancelCommenttop() { // 取消顶部评论
      this.commentText = ''
      this.topcommentBtn = false
    },
    getList() { // 提交顶部评论
      this.comminIndex = 0
      axios.post('//172.16.165.14:9001/comment', {
          path: location.href
        })
        .then(res => {
          this.commentlist = res.data
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].parentId === '0') {
              this.comminIndex++
            }
          }
        })
    },
    submitCommentTop() {
      let data = {
        name: '',
        path: location.href,
        content: this.commentText,
        replyName: '',
        parentId: 0
      }
      axios.post('//172.16.165.14:9001/commentint', data)
        .then(res => {
          // 评论成功
          this.getList()
          this.cancelCommenttop()
        })
    },
    openReply(task) {
      this.replyText = ''
      for (let i = 0;i < this.commentlist.length; i++) {
        if (this.commentlist[i].id == task.id) {
          this.commentlist[i].replyShow = true
        } else {
          this.commentlist[i].replyShow = false
        }
      }
    },
    closeReply(task) {
      for (let i = 0;i < this.commentlist.length; i++) {
        this.commentlist[i].replyShow = false
      }
      this.replyText = ''
    },
    replyA(task) {
      let data = {
        name: '海底捞2',
        path: location.href,
        content: this.replyText,
        replyName: task.name,
        parentId: task.id
      }
      axios.post('//172.16.165.14:9001/commentint', data)
        .then(res => {
          // 评论成功
          this.getList()
        })
    },
    replyB(task,i) {
      let data = {
        name: '海底捞2',
        path: location.href,
        content: this.replyText,
        replyName: task.name,
        parentId: i.id
      }
      axios.post('//172.16.165.14:9001/commentint', data)
        .then(res => {
          // 评论成功
          this.getList()
        })
    }
  },
  created() {
    this.getList()
  }
});
