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
            <!-- <button>show/hide</button> -->
            <button v-on:click="patientFilterKey = 'all'"
                    :class="{ active: patientFilterKey == 'all' }">All patients</button>
                    <button v-on:click="patientFilterKey = 'age'"
                    :class="{ active: patientFilterKey == 'age' }">Patients over 30</button>
                    <button v-on:click="patientFilterKey = 'ageStr'"
                    :class="{ active: patientFilterKey == 'ageStr' }">Patients over 63 and Meds with str over 8</button>
           
          </div>      
        </tr>

        <tr v-for="(patient, index) in patientFilter " v-bind:key="patient " v-bind:patient="patient" class="patients-row">
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
    </table> 
</template>

<script>
export default {
  name: 'MedicalList', 
  data() {
    return {  
      patientFilterKey: "all",   
      patientsWithMeds: []
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
                  let patientsWithMeds = []
                  
                  this.patientsWithMeds = patientsWithMeds  
                  
    patientList.forEach((patient) => {
        let patientMeds = [];
        drugList.forEach((drug) => {
          if (drug.patientIds.includes(patient.id)) {
            patientMeds.push(drug);
          }
        })
        patientsWithMeds.push({ ...patient, medicine: patientMeds }); 
        patientMeds = [];   
    });
                })
                .catch((err) => {
                    console.log(err);
                });
      },
        computed: {
    patientFilter() {
      return this[this.patientFilterKey]
    },
    all() {
      return this.patientsWithMeds
    },
    age() {
      return this.patientsWithMeds.filter((patient) => patient.age > 30)
    },
    ageStr() {
      const ageFiltered = this.patientsWithMeds.filter((patient) => patient.age > 63)
      return ageFiltered
        .map((patient) => {
            patient.medicine = patient.medicine.filter((drug) => drug.strength > 8);
            return patient;
        })  
    }
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

  td {
  vertical-align: top;
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
