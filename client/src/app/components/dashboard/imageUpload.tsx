"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void;
  onMainImageChange: (index: number) => void;
}

export function ImageUpload({
  onImagesChange,
  onMainImageChange,
}: ImageUploadProps) {
  const [images, setImages] = useState<File[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...newImages]);
      onImagesChange([...images, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
    if (index === mainImageIndex) {
      setMainImageIndex(0);
      onMainImageChange(0);
    } else if (index < mainImageIndex) {
      setMainImageIndex(mainImageIndex - 1);
      onMainImageChange(mainImageIndex - 1);
    }
  };

  const handleSetMainImage = (index: number) => {
    setMainImageIndex(index);
    onMainImageChange(index);
  };

  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded image ${index + 1}`}
              className="w-full h-40 object-cover rounded-md"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => handleRemoveImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant={index === mainImageIndex ? "default" : "secondary"}
              size="sm"
              className="absolute bottom-2 right-2"
              onClick={() => handleSetMainImage(index)}
            >
              {index === mainImageIndex ? "Main" : "Set as Main"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
