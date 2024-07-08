// import Card from '@/src/comp/Card'
// import clsx from 'clsx'

const images = [
  'https://pbs.twimg.com/media/GEaqVEYaQAAnnQA?format=jpg&name=large',
  'https://i.seadn.io/gae/8TVeahpwphE8jh2UXqXB0UdS3RyKn6i7sB2zuQEManwJszjS8vnFeSxVa3S0R6GykzK--VhSLwqNMA77R2Ri_JXaaPkkXE8qpXk2?auto=format&dpr=1&w=1000',
  'https://i.pinimg.com/736x/cb/f6/8c/cbf68cc9a8235c9eed8e77e491735ae4.jpg',
]
// export default function Partner() {
//   const sizeClass = {
//     small: 'max-w-sm',
//     medium: 'max-w-md',
//     large: 'max-w-lg',
//   }
//   const cardClassNames = clsx(
//     'rounded-lg',
//     'shadow-md',
//     'max-w-sm',
//     'overflow-hidden',
//     'grid grid-cols-3 gap-2'
//   )
// }

// export default Logo;

// App.tsx
// import React from 'react';
import AutoScrollingContainer from './AutoScrollingSVGCard'
// import Logo from './Logo';
// ...引入其他SVG组件
import AppleLogo from '@/src/static/AppleLogo'
import GoogleLogo from '@/src/static/GoogleLogo'
import ChyrawLogo from '@/src/static/ChyrawLogo'

const Pattner = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">合作伙伴</h1>
        <p className="text-lg mb-8">共享，共生，共同成长</p>
        <div className="container mx-auto"></div>
        <AutoScrollingContainer>
          <div>
            <ChyrawLogo />
            <p>fdsafdsa</p>
          </div>
          <div>
            <ChyrawLogo />
            <p>fdsafdsa</p>
          </div>{' '}
          <div>
            <ChyrawLogo />
            <p>fdsafdsa</p>
          </div>{' '}
          <div>
            <ChyrawLogo />
            <p>fdsafdsa</p>
          </div>{' '}
          <div>
            <ChyrawLogo />
            <p>fdsafdsa</p>
          </div>{' '}
          <div>
            <ChyrawLogo />
            <p>fdsafdsa</p>
          </div>{' '}
          <div>
            <ChyrawLogo />
            <p>fdsafdsa</p>
          </div>
          {/* 其他SVG组件 */}
        </AutoScrollingContainer>
      </div>
    </div>
  )
}

export default Pattner
