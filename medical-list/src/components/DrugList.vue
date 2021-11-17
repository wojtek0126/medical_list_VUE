<template>
<div>
    <h1 class="heading-text">{{msg}}</h1>
     <table>
      <tr class="medicine-head">
        
        <th>Index</th>
        <th>Medication name</th>
        <th>Unit</th>
        <th>Strenght</th>
        <th>Form</th>
        <th>Expiry date</th>
        
      </tr>
      <tr v-for="(drug, index) in patientMeds" v-bind:key="drug" v-bind:drug="drug" class="medicine-row">
        <td>{{index}}</td>
        <td>{{drug.medicationName}}</td>
        <td>{{drug.unit}}</td>
        <td>{{drug.strength}}</td>
        <td>{{drug.form}}</td>
        <td>{{drug.expDate}}</td>
      </tr>
    </table> 
</div>
</template>

<script>
export default {
  name: 'DrugList',
  props: {
    msg: String,
    patientMeds: []
  },
  data() {
    return {
      medicine: [],
      patientListDrug: []
      }
  },
  async mounted() {
  fetch("https://cerber.pixel.com.pl/api/medicine")
    .then(async response => {
      const data = await response.json();
      data.map(json => console.log(json.patientIds))
      console.log(data[0].patientIds) // delete this later
      
      this.medicine = data;
      this.patientListDrug = data.patientIds; 
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
.medicine-head{
   width: 100%;
  height: 100%;
  background-color: teal; 
  color: white;
}
.medicine-row { 
  width: 100%;
  height: 100%;
  background-color: beige;
}
</style>
