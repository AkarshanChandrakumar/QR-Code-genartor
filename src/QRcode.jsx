import {useState} from "react"

const QRcode = () => {
  const [img,setImg]=useState("images/qr-sample.jpg");
  const [loading,setLoading]=useState(false)
  const [QRdata,setQRdata]=useState("https://github.com/AkarshanChandrakumar")
  const [QRsize,setQrsize]=useState("150");
 
 async function generateQR(){
    setLoading(true)
    try{
       const url=`https://api.qrserver.com/v1/create-qr-code/?size=${QRsize}x${QRsize}&data=${encodeURIComponent(QRdata)}`;
       setImg(url);
    }
    catch(error){
       console.error("Error generating in QR code",error)
    }
    finally{
      setLoading(false)
    }
  }
  function downloadQR(){
      fetch(img).then((response)=>response.blob())
      .then((blob)=>{
        const link=document.createElement("a")
        link.href=URL.createObjectURL(blob)
        link.download="qrcode.png"
        document.body.appendChild(link)
        link.click();
        document.body.removeChild(link)
      })
      .catch((error)=>{
        console.error(`Error in downloading QR code`)
      })
    }
   return (
    <div className="app-container">
        <h1>QR Code Generator</h1>
       {loading && <p>Please wait ...</p>}
        {img && <img src={img} className="qr-image" alt="QR-code"></img>}
      <div>
        <label htmlFor="datInput" className="input-label">
            Data for Qr Code:
        </label>
        <input type="text" value={QRdata} id="dataInput"placeholder="Enter the url" onChange={(e)=>setQRdata(e.target.value)}></input>
        <label htmlFor="sizeInput" className="input-label">
            Image size (e.g.,150):
        </label>
        <input type="text" id="sizeInput" value={QRsize} placeholder="Enter Image Size" onChange={(e)=>setQrsize(e.target.value)}></input>
        <button className="generate" onClick={generateQR} disabled={loading}>Generate QR Code</button>
        <button className="download" onClick={downloadQR}>Download QR Code</button>
      </div>
    </div>
  )
}

export default QRcode
