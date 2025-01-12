 document.getElementById('airdropForm').addEventListener('submit', function(event) {
   event.preventDefault();
   var address = document.getElementById('address').value;
    console.log('Address:', address);

    if (!isValidAddress(address)) {
            document.getElementById('message').innerHTML = "<p style='color:red;'>Invalid BEP20 Address.</p>";
            return;
     }
   fetch('/api/airdrop', {
      method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
      body: JSON.stringify({ address: address }),
  })
  .then(response => response.json())
  .then(data => {
        if (data.success) {
           document.getElementById('message').innerHTML = "<p style='color:green;'>" + data.message + "</p>";
       }
       else {
           document.getElementById('message').innerHTML = "<p style='color:red;'>" + data.message + "</p>";
       }
  })
  .catch(error => {
         console.error('Error:', error);
          document.getElementById('message').innerHTML = "<p style='color:red;'>An error occurred.</p>";
  });
});
function isValidAddress(address) {
  const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
   return addressRegex.test(address);
}
