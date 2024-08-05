export async function getAdress(ip = "8.8.8.8") {
  const response = await fetch(
    `https://ipgeolocation.abstractapi.com/v1/?api_key=5c921c73d5b1470abb2eb7c506bf7339&ip_address=${ip}`
  )
  return await response.json();
}
