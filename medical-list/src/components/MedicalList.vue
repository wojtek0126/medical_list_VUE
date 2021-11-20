<template>
<div class="main-container">
  <h1>List of patients and their medicine</h1>
  <ul>
    <li>All PATIENTS button shows data of all patients and all of their medicine.</li>
    <li>FILTER 1 button shows all patients older than 30 and all of their medicine.</li>
    <li>FILTER 2 button shows all patients older than 63 and their medicals with strength bigger than 8.</li>    
  </ul>
   <div class="button-container">
            <button v-on:click="patientFilterKey = 'all'"
                    :class="{ active: patientFilterKey == 'all' }" class="button">All patients</button>
                    <button v-on:click="patientFilterKey = 'age'"
                    :class="{ active: patientFilterKey == 'age' }" class="button">Filter 1</button>
                    <button v-on:click="patientFilterKey = 'ageStr'"
                    :class="{ active: patientFilterKey == 'ageStr' }" class="button">Filter 2</button>           
          </div> 
          <div class="table-container">
            <div class="table-patient">      
                <!-- <tr class="patients-head">        
                  <th>Index</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th class="patients-address">Address</th>
                  <th>Phone</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Medicine</th>            
                </tr> -->
                <div v-for="(patient, index) in patientFilter " v-bind:key="patient " v-bind:patient="patient" class="patient-data">
                  <div class="patient-details__head">Patient#{{index}}</div>
                  <div class="patient-details__container">
                    <!-- <div><span></div> -->
                    <div><span>Name </span><p>{{patient.name}} {{patient.lastName}}</p></div>
                    <!-- <div>{{patient.lastName}}</div> -->
                    <div><span>Address </span><p>{{patient.adress}}</p></div>
                    <div><span>Phone </span><p>{{patient.phoneNumber}}</p></div>
                    <div><span>Age </span><p>{{patient.age}}</p></div>
                    <div><span>Gender </span><p>{{patient.gender}}</p></div>  
                  </div>
                  <table>
                    <tr class="medicine-head" ref="setItemRef">
                      <th class="medicine-row">Med name</th>
                      <th class="medicine-row">Unit</th>
                      <th class="medicine-row">Strength</th>
                      <th class="medicine-row">Form</th>
                      <th class="medicine-row">Expiry</th>        
                    </tr>
                    <tr v-for="(drug) in patient.medicine" v-bind:key="drug" v-bind:patient="drug" >
                      <td>{{drug.medicationName}}</td>
                      <td>{{drug.unit}}</td>
                      <td>{{drug.strength}}</td>
                      <td>{{drug.form}}</td>
                      <td>{{drug.expDate}}</td>
                    </tr>
                </table>               
              </div>     
            </div> 
    </div>
</div>    
</template>

<script>
export default {
  name: 'MedicalList', 
  data() {
    return {  
      patientFilterKey: "all",   
      patientsWithMeds: [],
      unMutatedPatientsMeds: [],
      itemRefs: []
      }
  },
  async mounted() {
    Promise.all([
                fetch("https://cerber.pixel.com.pl/api/patients").then(value => value.json()),
                fetch("https://cerber.pixel.com.pl/api/medicine").then(value => value.json())
                ])
                .then((value) => {
                  let patientList = value[0];
                  let drugList = value[1]; 
                  let patientsWithMeds = [];
                  let unMutatedPatientsMeds = [];
                  
                  this.patientsWithMeds = patientsWithMeds;
                  this.unMutatedPatientsMeds = unMutatedPatientsMeds;  
                  
    patientList.forEach((patient) => {
        let patientMeds = [];
        drugList.forEach((drug) => {
          if (drug.patientIds.includes(patient.id)) {
            patientMeds.push(drug);
          }
        })
        patientsWithMeds.push({ ...patient, medicine: patientMeds }); 
        unMutatedPatientsMeds.push({ ...patient, medicine: patientMeds }); 
        patientMeds = [];   
    });
                })
                .catch((err) => {
                    console.log(err);
                });
      },
      methods: {
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el)
      }
    }
  },
  beforeUpdate() {
    this.itemRefs = []
  },
  updated() {
    console.log(this.itemRefs)
  },
    
        computed: {
    patientFilter() {
      return this[this.patientFilterKey];      
    },
    all() {
      return this.unMutatedPatientsMeds;
    },
    age() {
      return this.unMutatedPatientsMeds.filter((patient) => patient.age > 30);
    },
    ageStr() {    
      const ageFiltered = this.patientsWithMeds.filter((patient) => patient.age > 63);      
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

html {
  background-color: #f2f2f2;
}
body {
  width: 750px;
  margin: 0 auto;
}

table {
  width: 100%;
  max-width: 100%;
  /* border: 1px solid black; */
  border-spacing: 0
}

th, td {
  padding: 5px;
  border: 1px solid black;
  }

  td {
  vertical-align: top;
  font-size: 10px;
    }

  h1 {
    margin: 48px;
    text-transform: uppercase;
    font-size: 2.5em;
   }

   ul {
     margin-bottom: 20px;
   }

  li {
     text-align: left;
     list-style-type: square;
     font-weight: 700;
     line-height: 1.3;
   }

   li:nth-child(1) {
     color: #215fae;
   }

    li:nth-child(2) {
     color:  #25b4b1;
   }

    li:nth-child(3) {
     color: #f9b907;
     }    
.main-container {
      background-color: #f2f2f2;
}
.list-container {
  width: 100%;
  max-width: 100%;
  border: 1px solid #000;
  border-spacing: 0
}
.button {
  font-weight: 600;
  font-family: "Roboto", sans-serif;
  background: #1d5eb1;
  text-transform: uppercase;
  display: inline-block;
  padding: 14px 30px 12px 30px;
  cursor: pointer;
  color: #fff;
  margin: 10px;
  border: none;  
  min-width: 161px;
  text-align: center;
}
.button:focus {
    color: #f9b907;
  }
/* .patients-head{
  width: 100%;
  height: 100%;
  background-color: #1d5eb1; 
  color: #fff;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase; 
  font-size: 0.9vw
} */
.patient-details__head {
  background-color: #1d5eb1; 
  color: #fff;
  text-transform: uppercase; 
  font-weight: 700;
  border-bottom: 1px solid #000;
  padding: 5px;

}

.patient-details__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.patient-details__container div{
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid;
}
.patient-details__container span{
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  background-color: #1d5eb1;
  color: #fff;
  padding: 5px;
  width: 80px;
  /* border: 1px solid #000;  */
  margin-right: 5px;
  font-size: 10px;
  font-weight: 700;
}

.patient-details__container p {
  margin: 0;
  font-size: 10px;
}
.patient-data {
  /* border: 1px solid #000; */
  margin-bottom: 20px;
}
.medicine-head{
   width: 100%;
  height: 100%;
  background-color: #1d5eb1; 
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
  font-size: 10px;
}

/* .patients-address {
  width: 24%
} */

@media only screen and (max-width: 800px) {
  td {
  font-size: 10px;
   }
   .patient-details__container span{
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  background-color: #1d5eb1;
  color: #fff;
  padding: 5px;
  width: 80px;
  /* border: 1px solid #000;  */
  margin-right: 5px;
  font-size: 10px;
  font-weight: 700;
  height: 11px;
}

}

</style>
