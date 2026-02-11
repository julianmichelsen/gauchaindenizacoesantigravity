import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Check, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ImageUploadProps {
    label: string;
    currentImage?: string;
    onImageUploaded: (url: string) => void;
    helperText?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    label,
    currentImage,
    onImageUploaded,
    helperText
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
        }
    };

    const handleUpload = async (file: File) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Por favor, selecione apenas arquivos de imagem (PNG, JPG, WebP).');
            return;
        }

        // Validate size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('A imagem deve ter no máximo 5MB.');
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            // 1. Generate unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `${fileName}`;

            // 2. Upload to Supabase Storage
            const { data, error: uploadError } = await supabase.storage
                .from('images') // Make sure this bucket exists!
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // 3. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            // 4. Callback
            onImageUploaded(publicUrl);

        } catch (err: any) {
            console.error('Error uploading image:', err);
            if (err.message && err.message.includes('Bucket not found')) {
                setError('Erro: Bucket "images" não encontrado no Supabase. Crie um bucket público chamado "images".');
            } else {
                setError('Erro ao fazer upload da imagem. Tente novamente.');
            }
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-800">{label}</label>

            <div
                className={`relative group border-2 border-dashed rounded-xl p-6 transition-all text-center
          ${dragActive ? 'border-brand-blue bg-blue-50' : 'border-gray-300 hover:border-brand-blue hover:bg-gray-50'}
          ${error ? 'border-red-300 bg-red-50' : ''}
        `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleChange}
                    accept="image/*"
                    disabled={isUploading}
                />

                <div className="flex flex-col items-center justify-center gap-3">
                    {isUploading ? (
                        <div className="animate-spin text-brand-blue">
                            <Loader2 size={32} />
                        </div>
                    ) : currentImage ? (
                        <div className="relative w-full h-40 group-hover:opacity-90 transition-opacity">
                            <img
                                src={currentImage}
                                alt="Preview"
                                className="w-full h-full object-contain rounded-lg shadow-sm bg-gray-100/50"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                <span className="text-white font-bold text-sm bg-black/50 px-3 py-1.5 rounded-full flex items-center gap-2">
                                    <Upload size={14} /> Trocar Imagem
                                </span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className={`p-3 rounded-full ${dragActive ? 'bg-blue-200 text-brand-blue' : 'bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-brand-blue'} transition-colors`}>
                                <ImageIcon size={24} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-gray-700">
                                    <span className="text-brand-blue">Clique para enviar</span> ou arraste aqui
                                </p>
                                <p className="text-xs text-gray-400">PNG, JPG ou WebP (max. 5MB)</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-600 text-xs mt-2 bg-red-50 p-2 rounded-lg">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                </div>
            )}

            {helperText && !error && (
                <p className="text-xs text-gray-500">{helperText}</p>
            )}
        </div>
    );
};
