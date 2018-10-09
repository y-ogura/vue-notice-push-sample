<template>
  <section class="container">
    <div>
      <el-input
        v-model="email"
        type="email"
      />
      <el-input
        v-model="password"
        type="password"
      />
      <el-button @click="login">login</el-button>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      const body = {
        email: this.email,
        password: this.password
      }
      const res = await this.$axios.post('/api/login', JSON.stringify(body), this.$store.state.header)
      if (res.data) {
        await this.$store.commit('setAccount', res.data)
        this.$router.push('/notices')
      }
    }
  }
}
</script>

<style>

.container
{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title
{
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle
{
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links
{
  padding-top: 15px;
}
</style>
