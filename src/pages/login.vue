<template>
  <q-page padding>
    <!-- content -->
    This is the login page
    <router-link to="/admin/dashboard">Go To Admin</router-link>
    <q-btn label="Go To Admin" color="pink" to="/admin/dashboard" ></q-btn>
    <q-btn label="Go To Reports" color="grey" @click="$router.push('/admin/reports/' + reportNo)" ></q-btn>
    <!-- Redirect using $router -->
    <!-- <q-btn label="Go To Admin" color="pink" @click="$router.push('/admin/dashboard')" ></q-btn> -->

    <!-- link in native web application -->
    <!-- <a href="file.html">To file</a> -->
    
  </q-page>
</template>

<script>
export default {
  name: 'PageName',
  data () {
    return {
      reportNo: "REPORT-0001"
    }
  }
}
</script>
