import { useUser } from '@/store';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const thumb = {
    display: 'inline-flex',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: '90px',
    height: '90px',
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function AvatarUploader({ avatarFiles, setAvatarFiles }: { avatarFiles: any[], setAvatarFiles: Dispatch<SetStateAction<any[]>> }) {
    const { getRootProps, getInputProps, open } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setAvatarFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const Thumbs = avatarFiles.map(file => (
        <div onClick={open} style={thumb} key={file.name}>
            <div style={thumbInner} className='relative group'>
                <img className='rounded-full hover:cursor-pointer ease-in-out transition hover:opacity-50'
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
                <button onClick={(e) => {
                    setAvatarFiles([])
                    e.stopPropagation()
                }} className='absolute right-0 top-0 bg-slate-700 p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 ease-in-out transition leading-[13px]'>✖</button>
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => avatarFiles.forEach(file => URL.revokeObjectURL(file.preview));
    }, [avatarFiles]);
    const { user } = useUser()
    return (
        <div className="flex gap-5">
            <div className="flex justify-center items-center relative group">
                {avatarFiles.length === 0 ?
                    <>
                        <img onClick={open} alt="user" src={user && user !== "None" ? user.photoURL ?? "/user.png" : "/user.png"} width={98} height={98} className="rounded-full" />
                        <img onClick={open} src={'/add-avatar.png'} className='absolute left-0 top-0 w-[98px] h-[98px] opacity-0 group-hover:opacity-100 ease-in-out transition rounded-full cursor-pointer' />
                    </>
                    : Thumbs}


            </div>
            <div className="flex flex-col gap-3 items-start">
                <div className="flex flex-col gap-1">

                    <section className="container">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                        </div>
                        <div className="font-medium">Upload Image</div>
                        <div className="text-sm leading-[18px] text-white/60">Min 400x400px, PNG or JPEG</div>
                    </section>
                </div>
                <button onClick={open} className="text-sm leading-[26px] w-[102px] h-10 border-[1px] border-white/30 rounded-[6px] bg-linear-to-b from-transparent to-white/8">Select</button>
            </div>
        </div>
    );
}

export default AvatarUploader