import { useEffect, useState } from 'react'
import { ImageType } from '~/types'
import MotionNumber from 'motion-number'

type ImageInfoProps = {
    image: ImageType | null
    baseURL: string
}
export default function ImageInfo({ image, baseURL }: ImageInfoProps) {
    if (!image) return null
    const [width, setWidth] = useState<number | null>(null)
    const [finalSize, setFinalSize] = useState<{ value: string, unit: string } | null>(null)

    const getImageSize = () => {
        const URL = `${baseURL}/images/w_${width}/${image.name}`
        fetch(URL)
            .then((response) => response.blob())
            .then((blob) => {
                const size = blob.size
                if (size > 1024 * 1024) {
                    setFinalSize({
                        value: (size / 1024 / 1024).toFixed(2),
                        unit: 'MB'
                    })
                } else {
                    setFinalSize({
                        value: (size / 1024).toFixed(2),
                        unit: 'KB'
                    })
                }
            })
    }
    useEffect(() => {
        if (width) {
            getImageSize()
        }

    }, [width])
    return (
        <div className='border w-3/12 p-2'>
            <img src={`${baseURL}/images/w_240/${image.name}`} className='w-full object-cover' alt={image.name} />
            <div className='grid grid-cols-5 gap-2 mt-2'>
                <div className='border px-2 py-1 cursor-pointer' onClick={() => setWidth(100)}>
                    100
                </div>
                <div className='border px-2 py-1 cursor-pointer' onClick={() => setWidth(200)}>
                    200
                </div>
                <div className='border px-2 py-1 cursor-pointer' onClick={() => setWidth(400)}>
                    400
                </div>
                <div className='border px-2 py-1 cursor-pointer' onClick={() => setWidth(8000)}>
                    8000
                </div>


            </div>
            <div className='my-2 flex flex-col gap-1'>

                <div className='flex justify-between'>
                    <span className='text-muted-fg'>ORIGINAL SIZE</span>
                    <span>2.4 MB</span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-muted-fg'>IMAGE SLUG</span>
                    <span>{image.name}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-muted-fg'>FINAL SIZE</span>
                    {finalSize &&
                        <span className='flex items-center gap-1'>
                            <MotionNumber
                                value={finalSize.value}
                                format={{ notation: 'compact' }}
                                locales="en-US" />
                            {finalSize.unit}
                        </span>
                    }
                </div>
            </div>
        </div>
    )
}
