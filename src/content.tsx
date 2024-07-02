import cssText from "data-text:./style.css"
import type { PlasmoCSConfig } from "plasmo"
import React from "react"
import AiIcon from "~features/AiIcon"

import { CountButton } from "~features/CountButton"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return (
    <div className="bg-transparent" style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",

    }}>
      {/* <CountButton /> */}
      <AiIcon/>
    </div>
  )
}

export default PlasmoOverlay

// className="z-50 flex fixed top-32 right-8"
