<template>
  <div>
    <MedicalList />
  </div>
</template>

<script>
import MedicalList from "./components/MedicalList"

export default {
  name: 'App',
  components: {
    MedicalList, 
  }
}
</script>

<style>
html {
  background-color: #f2f2f2;
  word-break: break-word;
}

#app {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
