import { useEffect, useState } from 'react'
import { ImageType } from '~/types'
import MotionNumber from 'motion-number'
import { IconArrowDown, IconChevronDoubleDown } from 'justd-icons'

type ImageInfoProps = {
    image: ImageType | null
    baseURL: string
}
export default function ImageInfo({ image, baseURL }: ImageInfoProps) {
    if (!image) return null
    const [width, setWidth] = useState<number | null>(null)
    const [finalSize, setFinalSize] = useState<{ value: string, unit: string } | null>(null)
    const [difference, setDifference] = useState<{ type: 'increase' | 'decrease', percent: number } | null>(null)

    const getImageSize = () => {
        const URL = `${baseURL}/images/s_${width}x${width}/${image.name}`
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
                const diff = image.size - size
                console.log(Math.round(diff / image.size))
                setDifference({
                    type: diff > 0 ? 'increase' : 'decrease',
                    percent: (diff / image.size)
                })
            })
    }
    useEffect(() => {
        if (width) {
            getImageSize()
        }

    }, [width])
    return (
        <div className='border w-3/12 p-2'>
            <img src={`${baseURL}/images/_/${image.name}`} className='w-full object-cover  h-60' alt={image.name} />
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
                <div className='border px-2 py-1 cursor-pointer' onClick={() => setWidth(80000)}>
                    80000
                </div>


            </div>
            <div className='my-2 flex flex-col gap-1'>

                <div className='flex justify-between'>
                    <span className='text-muted-fg'>ORIGINAL SIZE</span>
                    <span className='flex items-center gap-1'>
                        <MotionNumber
                            value={Math.round(image.size / 1024 / 1024 * 100) / 100}
                            format={{ notation: 'compact' }}
                            locales="en-US" />
                        MB
                    </span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-muted-fg'>IMAGE SLUG</span>
                    <span>{image.name}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-muted-fg'>FINAL SIZE</span>
                    {finalSize && difference &&
                        <div className='flex items-center gap-2'>


                            <MotionNumber
                                value={finalSize.value}
                                format={{ notation: 'compact' }}
                                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 2, flexDirection: 'row-reverse' }}
                                first={() => (
                                    <span className='text-muted-fg'>{finalSize.unit}</span>
                                )}
                                after={() => (
                                    <MotionNumber
                                        value={difference?.percent}
                                        format={{ style: 'percent', maximumFractionDigits: 1 }}
                                        animate={{ backgroundColor: difference?.type === 'increase' ? '#15803d' : '#ef4444' }}
                                        style={{ minWidth: 80, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 2 }}
                                        first={() => (
                                            <IconChevronDoubleDown className='w-5' />
                                        )}
                                    />
                                )}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
