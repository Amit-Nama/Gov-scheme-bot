document.getElementById("userForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const userData = {
    name: document.getElementById("name").value,
    age: parseInt(document.getElementById("age").value),
    gender: document.getElementById("gender").value,
    occupation: document.getElementById("occupation").value.toLowerCase(),
    income: parseInt(document.getElementById("income").value),
    caste: document.getElementById("caste").value.toLowerCase(),
    state: document.getElementById("state").value.toLowerCase()
  };

  fetch("schemes.json")
    .then(response => response.json())
    .then(data => {
      const eligibleSchemes = data.filter(scheme => {
        return (
          (!scheme.minAge || userData.age >= scheme.minAge) &&
          (!scheme.maxIncome || userData.income <= scheme.maxIncome) &&
          (!scheme.caste || scheme.caste.includes(userData.caste)) &&
          (!scheme.occupation || scheme.occupation.includes(userData.occupation))
        );
      });

      const resultDiv = document.getElementById("result");
      if (eligibleSchemes.length === 0) {
        resultDiv.innerHTML = "<p>No eligible schemes found.</p>";
      } else {
        resultDiv.innerHTML = "<h2>Eligible Schemes:</h2>";
        eligibleSchemes.forEach(s => {
          resultDiv.innerHTML += `<div><strong>${s.name}</strong><br>
            ${s.description}<br>
            <b>Documents:</b> ${s.documents.join(", ")}<br>
            <b>How to Apply:</b> ${s.howToApply}<br><br></div>`;
        });
      }
    });
});