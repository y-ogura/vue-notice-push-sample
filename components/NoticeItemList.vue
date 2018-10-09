<template>
  <el-card>
    <el-row>
      <div v-if="!isRead">
        <span>new</span>
      </div>
      <h3>{{ notice.title }}</h3>
    </el-row>
    <el-row>
      <p>{{ notice.content }}</p>
    </el-row>
    <el-button @click="readNotice(notice.id)">既読</el-button>
  </el-card>
</template>

<script>
export default {
  props: {
    notice: {
      type: Object,
      default: () => {return {}}
    }
  },
  data () {
    return {
      read: false
    }
  },
  computed: {
    isRead() {
      return this.read
    }
  },
  created () {
    this.read = this.notice.read
  },
  methods: {
    async readNotice (value) {
      const body = {
        accountId: JSON.parse(window.localStorage.getItem('account')).id,
        noticeId: value
      }
      this.$axios.post('/api/notices/read', JSON.stringify(body), this.$store.state.header)
      this.notice.read = true
      this.read = true
    }
  }
}
</script>