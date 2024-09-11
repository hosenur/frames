import { ImageType } from "~/types"
import { Card } from "~/components/ui/card"

type ImageGalleryProps = {
    images: ImageType[]
    selectedImage: ImageType | null
    setSelectedImage: (image: ImageType | null) => void
    baseURL: string
}
export default function ImageGallery({ images, selectedImage, setSelectedImage, baseURL }: ImageGalleryProps) {
    return (
        <div className="flex flex-wrap gap-4 w-9/12">
            {images.map((image) => (
                <Card
                className="h-min"
                    onClick={() => setSelectedImage(image)}
                    key={image.id}>
                    <img
                        src={`${baseURL}/images/w_500/${image.name}`}
                        className="w-60 h-36 object-cover"
                        alt={image.name}
                        onClick={() => setSelectedImage(image)}
                        style={{ cursor: selectedImage?.id === image.id ? 'pointer' : 'default' }}
                    />

                </Card>
            ))}

        </div>
    )
}
