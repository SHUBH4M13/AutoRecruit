import { useState, useRef, useCallback } from 'react'
import { FileText, Upload , X} from 'lucide-react'

export default function ResumeDrop() {

    const [file, setFile] = useState(null)
    const [dragging, setDragging] = useState(false)
    const fileInputRef = useRef(null)

    const isReady = file > 30

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B'
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    }

    const handleFile = (f) => {
        if (f && f.type === 'application/pdf') setFile(f)
    }

    const onDrop = useCallback((e) => {
        e.preventDefault()
        setDragging(false)
        handleFile(e.dataTransfer.files[0])
    }, [])


    return (
        <div className='bg-bg-secondary border border-border rounded-2xl p-6 flex flex-col gap-4'>
            <div className='flex items-center gap-2.5'>
                <div className='w-[34px] h-[34px] rounded-[9px] bg-accent-deep/18 border border-accent/18 flex items-center justify-center flex-shrink-0'>
                    <FileText size={15} className='text-accent' />
                </div>
                <div>
                    <p className='text-[14px] font-semibold text-text-primary'>Resume</p>
                    <p className='text-[11px] text-text-secondary'>PDF only · Max 5MB</p>
                </div>
            </div>

            <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={`
                            relative border-[1.5px] border-dashed rounded-xl p-8
                            flex flex-col items-center gap-2.5 cursor-pointer transition-all duration-200
                            ${dragging || file
                        ? 'border-accent/50 bg-accent-deep/10'
                        : 'border-accent/22 bg-accent-deep/[0.05] hover:border-accent/40 hover:bg-accent-deep/[0.08]'
                    }
                        `}
            >
                <input
                    ref={fileInputRef}
                    type='file'
                    accept='.pdf'
                    className='hidden'
                    onChange={(e) => handleFile(e.target.files[0])}
                />
                <div className='w-11 h-11 rounded-xl bg-accent-deep/15 border border-accent/18 flex items-center justify-center'>
                    <Upload size={20} className='text-accent' />
                </div>
                <p className='text-[13px] font-medium text-accent-soft'>Drop your resume here</p>
                <p className='text-[11px] text-text-secondary'>or click to browse</p>
                <span className='text-[10px] font-semibold text-accent-deep bg-accent-deep/15 border border-accent/18 rounded-full px-2.5 py-0.5'>
                    PDF only
                </span>
            </div>

            {file && (
                <div className='flex items-center gap-2.5 bg-accent-deep/10 border border-accent/20 rounded-xl px-3.5 py-2.5'>
                    <div className='w-8 h-8 rounded-lg bg-accent-deep/20 border border-accent/20 flex items-center justify-center flex-shrink-0'>
                        <FileText size={13} className='text-accent' />
                    </div>
                    <div className='flex-1 min-w-0'>
                        <p className='text-[12px] font-medium text-accent-soft truncate'>{file.name}</p>
                        <p className='text-[11px] text-text-secondary'>{formatSize(file.size)}</p>
                    </div>
                    <button
                        onClick={() => setFile(null)}
                        className='text-text-secondary hover:text-red-400 transition-colors p-0.5'
                    >
                        <X size={14} />
                    </button>
                </div>
            )}
        </div>
    )
}
