import React from 'react'
import AIIcon from "./AIIcon"
import PromptModal from './PromptModal'

interface AppProps {
    render: (mV:boolean) => void; 
}

const App:React.FC<AppProps> = ({render}) => {
  return (
    <>
    <AIIcon onClick={() => {
      render(false); 
    }} />
    <PromptModal onClose={() => {
      render(false); 
    }} />
  </>
  )
}

export default App