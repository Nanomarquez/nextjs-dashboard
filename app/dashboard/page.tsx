export default async function Page(){
  
  const res = fetch('https://api.github.com/users/hadley/orgs').then(x=>x.json()).then(data=>console.log(data))
  const res2 = await fetch('https://api.github.com/users/hadley/orgs');
  const json = await res2.json()
  console.log(json)
  console.log(res)
  return (
    <p>Dash</p>
  )
}