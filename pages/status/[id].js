import Devit from "@c/Devit"

export default function DevitPage(props) {
  return (
    <>
      <Devit {...props} />
    </>
  )
}

export async function getServerSideProps(context) {
  const { params, res } = context
  const { id } = params
  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)
  console.log("APIRESPONSE: ", apiResponse)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }
  if (res) {
    console.log("ERROR TO GET RESPONSE", res)
    res.writeHead(301, { Location: "/home" }).end()
  }
}
