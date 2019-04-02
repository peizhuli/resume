<template>
  <div>
  hello
  </div>
</template>

<script>
  import server from '../server/api';
export default {
  name: 'HelloWorld',
  mounted() {
      this.getHomeData();
  },
  data () {
    return {
        homeData: []
    }
  },
  methods: {
      getHomeData() {
          let vm = this;
          server.home().then((res) => {
            console.log(res);
          });
      },
  }
}
</script>
