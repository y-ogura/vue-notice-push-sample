const express = require('express')
const router = express.Router()
const notices = require('./mock/notice')
const accounts = require('./mock/account')

const noticeAccount = []

const Pusher = require('pusher')
const pusher = new Pusher({
  appId: '616772',
  key: '5cb0a26beb27693d86e5',
  secret: '283cf5a8f18aaab7deea',
  cluster: 'ap1',
  encrypted: true
})

router.get('/notices/:id', function(req, res) {
  const id = req.params.id
  const len = notices
  for (let i = 0; i < len; i++) {
    for (let l = 0, naLen = noticeAccount; l < naLen; l++) {
      if (noticeAccount[l].accountId === id && notices[i].id === noticeAccount[l].noticeId) {
        notices[i].read = true
      }
    }
  }
  res.json(notices)
})

router.post('/notices', function(req, res) {
  const notice = {
    id: notices.length + 1,
    title: req.body.title,
    content: req.body.content
  }
  notices.push(notice)
  accounts.forEach((val) => {
    pusher.trigger('posts_'+val.id, 'post_added', {notice: notice})
  })
  res.status(200).send()
})

router.get('/notices/new/:id', function(req, res) {
  const id = req.params.id
  let flagCount = 0
  const len = notices
  for (let i = 0; i < len; i++) {
    for (let l = 0, naLen = noticeAccount; l < naLen; l++) {
      if (noticeAccount[l].accountId === id && notices[i].id === noticeAccount[l].noticeId) {
        flagCount++
      }
    }
  }
  let flag = false
  if (len != flagCount) {
    flag = true
  }
  res.json({read: flag})
})

router.post('/notices/read', function(req, res) {
  const na = req.body
  noticeAccount.push(na)
})

module.exports = router