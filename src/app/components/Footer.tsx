import React from "react"

const Footer = () => {
  return (
    <div className="bg-[#F2F2F2] flex flex-col p-4 gap-2">
      <div className="text-[#5F6368] text-sm">India</div>
      <div className="h-[1px] w-full bg-[#DADCE0]"></div>
      <div className="text-[#5F6368] text-sm flex justify-between">
        <div className="flex flex-wrap gap-x-4">
          <div>About</div>
          <div>Advertising</div>
          <div>Business</div>
          <div>How Search works</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div>Privacy</div>
          <div>Terms</div>
          <div>Settings</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
