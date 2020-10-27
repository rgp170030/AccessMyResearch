<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Home</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Dashbord</b-nav-item>
        <b-nav-item href="#" >blocked User</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
      <b-button  @click="signOut()" pill>Logout</b-button>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>


export default {


}

</script>
