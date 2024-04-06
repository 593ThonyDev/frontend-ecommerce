import React, { ChangeEvent, useState } from 'react';

interface FileInputProps {
    label?: string;
    id?: string;
    extra?: string;
    name?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    variant?: string;
}

const FileInput: React.FC<FileInputProps> = ({ name, onChange, placeholder, label, id, variant, extra }) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        // Verificar si el archivo es una imagen y tiene una extensión válida
        if (file && isImageFile(file)) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            onChange(e);
        } else {
            // Restablecer la vista previa de la imagen si el archivo no es válido
            setPreviewImage(null);
            // También puedes mostrar un mensaje de error aquí si lo deseas.
        }
    };

    const isImageFile = (file: File) => {
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        return allowedExtensions.includes(fileExtension || '');
    };

    return (
        <div className={`${extra == null ? "" : extra}`}>
            {label && (
                <label
                    htmlFor={id}
                    className={`font-normal text-sm text-gray-400 dark:text-white/60 ${variant === "auth" ? "ml-1.5 font-medium" : "ml-1.5 font-bold"}`}
                >
                    {label}
                </label>
            )}
            <input
                name={name}
                type="file"
                accept=".jpg, .jpeg, .png" // Limitar la selección de archivos a jpg, jpeg y png
                placeholder={placeholder}
                className={`focus:ring-0 mt-0 flex w-full border-none bg-gray-100 lg:bg-obscuro-nomal dark:bg-obscuro-normal dark:border-none text-navy-700 dark:text-white/60  items-center justify-center rounded-2xl px-4 py-2 text-sm outline-none`}
                onChange={handleImageChange}
            />
            {previewImage && (
                <div className='rounded-2xl bg-gray-100 lg:bg-obscuro-nomal dark:bg-obscuro-normal py-3 mt-3'>
                    <img
                        src={previewImage}
                        alt="Preview"
                        className="h-56 mx-auto rounded-lg"
                    />
                </div>
            )}
        </div>
    );
};

export default FileInput;
