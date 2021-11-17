<template>
     <table>
        <tr class="patients-head">        
          <th>Index</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Address</th>
          <th>Phone number</th>
          <th>Age</th>
          <th>Gender</th>
          <div>
            <button>show/hide</button>
            <button>filter1</button>
            <button>filter2</button>
          </div>      
        </tr>

        <tr v-for="(patient, index) in combined" v-bind:key="patient" v-bind:patient="patient" class="patients-row">
          <td>{{index}}</td>
          <td>{{patient.name}}</td>
          <td>{{patient.lastName}}</td>
          <td>{{patient.adress}}</td>
          <td>{{patient.phoneNumber}}</td>
          <td>{{patient.age}}</td>
          <td>{{patient.gender}}</td>  
          <table>
            <tr class="medicine-head">
              <th>Index</th>
              <th>Medication name</th>
              <th>Unit</th>
              <th>Strenght</th>
              <th>Form</th>
              <th>Expiry date</th>        
            </tr>

            <tr v-for="(drug, index) in patient.medicine" v-bind:key="drug" v-bind:patient="drug">
              <td>{{index}}</td>
              <td>{{drug.medicationName}}</td>
              <td>{{drug.unit}}</td>
              <td>{{drug.strength}}</td>
              <td>{{drug.form}}</td>
              <td>{{drug.expDate}}</td>
            </tr>
        </table>               
      </tr>
       <tr class="medicine-head">        
        <th>Index</th>
        <th>Medication name</th>
        <th>Unit</th>
        <th>Strenght</th>
        <th>Form</th>
        <th>Expiry date</th>
        <th>Used by</th>
      </tr>
    </table> 
</template>

<script>
export default {
  name: 'MedicalList', 
  data() {
    return {     
      combined: []
      }
  },
  async mounted() {
    Promise.all([
                fetch("https://cerber.pixel.com.pl/api/patients").then(value => value.json()),
                fetch("https://cerber.pixel.com.pl/api/medicine").then(value => value.json())
                ])
                .then((value) => {
                  let patientList = value[0]
                  let drugList = value[1] 
                  let combined = []
                  
                  this.combined = combined  
                  
    patientList.forEach((patient) => {
        let patientMeds = [];
        drugList.forEach((drug) => {
          if (drug.patientIds.includes(patient.id)) {
            patientMeds.push(drug);
          }
        })
        combined.push({ ...patient, medicine: patientMeds }); 
        patientMeds = [];   
    });
                })
                .catch((err) => {
                    console.log(err);
                });
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.list-container {
  width: 100%;
  max-width: 100%;
  border: 1px solid black;
  border-spacing: 0
}

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

.medicine-head{
   width: 100%;
  height: 100%;
  background-color: teal; 
  color: white;
}
.medicine-row { 
  width: 100%;
  max-width: 100%;
  height: 100%;
  background-color: beige;
}
</style>
