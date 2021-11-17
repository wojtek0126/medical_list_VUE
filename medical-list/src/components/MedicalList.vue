<template>
<div>
    <h1 class="heading-text">{{msg}}</h1>
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
        <table>
      <tr class="medicine-head">
        
        <th>Index</th>
        <th>Medication name</th>
        <th>Unit</th>
        <th>Strenght</th>
        <th>Form</th>
        <th>Expiry date</th>
        <th>Used by</th>
      </tr>
      <tr v-for="(drug, index) in medicine" v-bind:key="drug" v-bind:drug="drug" class="medicine-row">
        <td>{{index}}</td>
        <td>{{drug.medicationName}}</td>
        <td>{{drug.unit}}</td>
        <td>{{drug.strength}}</td>
        <td>{{drug.form}}</td>
        <td>{{drug.expDate}}</td>
        <td>{{drug.patientIds}}</td>

      </tr>
    </table> 
</div>
</template>

<script>
export default {
  name: 'MedicalList',
  props: {
    msg: String
  },
  data() {
    return {
      patients: [],
      medicine: []
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
              // let fixed = []     

              this.patients = patientList
              this.medicine = drugList
              this.combined = combined  
              
              patientList.map(patient => {
                drugList.map(drug => {
                  if (drug.patientIds.includes(patient.id)) {
                    combined.push({id: patient.id, medicationName: drug.medicationName})
                    }                  
                })
              })

var output = combined.reduce(function(o, cur) {

  // Get the index of the key-value pair.
  var occurs = o.reduce(function(n, item, i) {
    return (item.id === cur.id) ? i : n;
  }, -1);

  // If the name is found,
  if (occurs >= 0) {

    // append the current value to its list of values.
    o[occurs].medicationName = o[occurs].medicationName.concat(cur.medicationName);

    // Otherwise,
  } else {

    // add the current item to o (but make sure the value is an array).
    var obj = {
      id: cur.id,
      medicationName: [cur.medicationName]
    };
    o = o.concat([obj]);
  }

  return o;
}, []);

console.log(output);

        

            })
            .catch((err) => {
                console.log(err);
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
