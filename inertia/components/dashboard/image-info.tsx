import { IconChevronDoubleDown, IconLoader, IconX } from 'justd-icons'
import MotionNumber from 'motion-number'
import { useEffect, useState } from 'react'
import { ImageType } from '~/types'
import { NumberField } from '../ui/number-field'

type ImageInfoProps = {
    image: ImageType | null
    baseURL: string
}
export default function ImageInfo({ image, baseURL }: ImageInfoProps) {
    if (!image) return null
    const [loading, setLoading] = useState(false)
    const [dimensions, setDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 })
    const [finalSize, setFinalSize] = useState<{ value: string, unit: string } | null>(null)
    const [difference, setDifference] = useState<{ type: 'increase' | 'decrease', percent: number } | null>(null)

    const getImageSize = () => {
        // const URL = `${baseURL}/images/s_${width}x${width}/${image.name}`
        // //if 
        setLoading(true)
        var URL = `${baseURL}/images/`
        if (dimensions.width > 0) {
            URL += `width_${dimensions.width}`
        }
        if (dimensions.height > 0) {
            URL += `,height_${dimensions.height}`
        }
        URL += `/${image.name}`
        console.log(URL)
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
                setLoading(false)
            })
    }
    useEffect(() => {
        if (dimensions.width > 0 || dimensions.height > 0) {
            getImageSize()
        }

    }, [dimensions])
    useEffect(() => {
        setDifference(null)
        setFinalSize(null)

    }, [image])
    return (
        <div className=''>
            <img src={`${baseURL}/images/_/${image.name}`} className='w-full object-cover  h-60 transition-opacity duration-500 ease-in-out' alt={image.name} />
            <div className='flex  gap-2 items-center justify-between mt-2'>
                <NumberField
                    onChange={(e) => {
                        setDimensions({ ...dimensions, width: e })
                    }}
                    label='WIDTH IN PIXELS' />
                <IconX />
                <NumberField
                    onChange={(e) => {
                        setDimensions({ ...dimensions, height: e })
                    }}
                    label='HEIGHT IN PIXELS' />


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
                {finalSize && difference &&
                    <div className='flex justify-between'>
                        <span className='text-muted-fg'>FINAL SIZE</span>
                        <div className='flex items-center gap-2'>

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
                            {loading &&
                                <IconLoader className='animate-spin w-5 h-5' />
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
