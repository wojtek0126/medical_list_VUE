<template>
  <div>
    <img alt="Vue logo" class="logo" src="./assets/buffalo.webp">
    <MedicalList />
    <!-- <DrugList msg="All your dailies brought to You also by Vół" /> -->
  </div>
</template>

<script>
import MedicalList from "./components/MedicalList"
// import DrugList from "./components/DrugList"


export default {
  name: 'App',
  components: {
    MedicalList, 
    // DrugList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  margin-bottom: 40px;
width: 200px;
height: 150px;
border-radius: 50%;
-webkit-box-shadow: 8px 8px 53px 23px rgba(66, 68, 90, 1);
-moz-box-shadow: 8px 8px 53px 23px rgba(66, 68, 90, 1);
box-shadow: 8px 8px 53px 23px rgba(66, 68, 90, 1);
}
</style>
