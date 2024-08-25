'use client'
import Image from 'next/image'

const ImageList = () => {
  return (
    <div>
      <Image
        src="/images/a.jpg" // 替换为图像的路径
        alt="描述性文字"
        width={300} // 图像的宽度
        height={200} // 图像的高度
        layout="responsive" // 布局模式
      />
    </div>
  )
}

export default ImageList
