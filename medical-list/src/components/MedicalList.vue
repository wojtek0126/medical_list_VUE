<template>
<div>
    <h1 class="heading-text">{{msg}}</h1>
    <!-- <div >{{patient.name}}</div> -->
     <table>
      <tr class="patients-head">
        
        <th>Index</th>
        <th>First name</th>
        <th>Last name</th>
        <th>Address</th>
        <th>Phone number</th>
        <th>Age</th>
        <th>Gender</th>
      </tr>
      <tr v-for="(patient, index) in patients" v-bind:key="patient" v-bind:patient="patient" class="patients-row">
        <td>{{index}}</td>
        <td>{{patient.name}}</td>
        <td>{{patient.lastName}}</td>
        <td>{{patient.adress}}</td>
        <td>{{patient.phoneNumber}}</td>
        <td>{{patient.age}}</td>
        <td>{{patient.gender}}</td>    
      </tr>
    </table> 
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      patients: []
      }
  },
  async mounted() {
  fetch("https://cerber.pixel.com.pl/api/patients")
  // fetch("https://cerber.pixel.com.pl/api/medicine")
    .then(async response => {
      const data = await response.json();
      console.log(data) // delete this later
      this.patients = data;
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      
    })
    .catch(error => {
      this.errorMessage = error;
      console.error("There was an error!", error);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table {
  width: 100%;
  max-width: 100%;
  border: 1px solid black;
  border-spacing: 0
}

th, td {
  padding: 5px;
  border: 1px solid black;
  }
.heading-text { 
 /* text-shadow: 4px 4px 23px rgba(66, 68, 90, 1); */
}
.patients-head{
   width: 100%;
  height: 100%;
  background-color: teal; 
  color: white;
}
.patients-row { 
  width: 100%;
  height: 100%;
  background-color: beige;
}
</style>
