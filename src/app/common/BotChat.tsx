import React from 'react'

type BotChatProps = {
  children: React.ReactNode;
}

const BotChat:React.FC<BotChatProps> = (props) => {
  const {children} = props;
  return (
    <div className="w-full flex mb-3">
      <div className="w-10 h-10 rounded-full text-white bg-purple-300 mr-3 leading-10 text-center">bot</div>
      <div className='flex-1 max-w-full'>{children}</div>
    </div>
  )
}

export default BotChat