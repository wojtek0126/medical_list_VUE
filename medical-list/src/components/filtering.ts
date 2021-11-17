// patientList.map(patient => {
//     drugList.map(drug => {
//       if (drug.patientIds.includes(patient.id)) {
//         combined.push({id: patient.id, medicationName: drug.medicationName})
//         }                  
//     })
//   })

// let output = combined.reduce(function(o, cur) {
// if  let occurs = o.reduce(function(n, item, i) {
// return (item.id === cur.id) ? i : n;
// }, -1);
// o[occurs].medicationName = o[occurs].medicationName.concat(cur.medicationName);
// } else {
// let obj = {
// id: cur.id,
// medicationName: [cur.medicationName]
// };
// o = o.concat([obj]);
// }
// returno;
// }, []);

// console.log(output); 

// const patients = [] // lista pacjentow

// const zwrotkaLekowZSerwera = [...jakas lista];
// const zwrotkaPacjentowZSerwera = [...jakas lista];

// zwrotkaPacjentowZSerwera.forEach((patient) => {
//   if (patient.age > 30) {
//     let lekiPacjenta = [];
//     zwrotkaLekowZSerwera.forEach((lek) => {
//       if (lek.patientIds.includes(patient.id)) {
//         lekiPacjenta.push(lek);
//       }
//     })
//     patients.push({ ...patient, leki: lekiPacjenta }); // dodaj dane pajenta do listy
//     lekiPacjenta = [] // czyscimy tablice przed nastepnym pacjentem
//   }
// })