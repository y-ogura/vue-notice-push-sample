<template>
  <div>
    <h3>notice</h3>
    <div>
      <el-input
        v-model="post.title"
        type="text"
      />
      <el-input
        v-model="post.content"
        type="textarea"
      />
      <el-button @click="postNotice">送信</el-button>
    </div>
    <div v-if="hasNew">
      <el-button @click="fetchNotice">新しい投稿を取得</el-button>
    </div>
    <NoticeItemList
      v-for="notice in notices"
      :key="notice.id"
      :notice="notice"
    />
  </div>
</template>

<script>
import Pusher from 'pusher-js'
import NoticeItemList from '~/components/NoticeItemList'
export default {
  components: {
    NoticeItemList
  },
  data () {
    return {
      post: {
        title: "",
        content: ""
      },
      notices: [],
      hasNewNotice: false
    }
  },
  computed: {
    hasNew() {
      console.log(this.hasNewNotice)
      return this.hasNewNotice
    }
  },
  async created () {
    this.fetchNotice()
    this.fetchNewNotice()
  },
  methods: {
    async fetchNotice () {
      const id = JSON.parse(window.localStorage.getItem('account')).id
      const res = await this.$axios.get('/api/notices/'+id, this.$store.state.header)
      this.notices = res.data
      this.hasNewNotice = false
    },
    async postNotice () {
      const body = {
        title: this.post.title,
        content: this.post.content
      }
      await this.$axios.post('/api/notices', JSON.stringify(body), this.$store.state.header)
      this.fetchNotice()
    },
    async fetchNewNotice () {
      const id = JSON.parse(window.localStorage.getItem('account')).id
      console.log(id)
      const pusher = new Pusher('5cb0a26beb27693d86e5', {cluster: 'ap1'})
      pusher.subscribe('posts_'+id)
      await pusher.bind('post_added', async data => {
        const res = await this.$axios.get('/api/notices/new/'+id, this.$store.state.header)
        this.hasNewNotice = res.data.read
      })
    }
  }
}
</script>