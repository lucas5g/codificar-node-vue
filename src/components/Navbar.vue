<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-success fixed-top">
    <div class="container-fluid text-white">
      <a class="navbar-brand text-white" href="/">Codificar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link text-white"
              to="/importacao"
              >Import
            </router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link
              class="nav-link text-white"
              to="/issues"
              >Issues
            </router-link>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>