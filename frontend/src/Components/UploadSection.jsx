import { useState } from 'react'
import { Zap, Lock } from 'lucide-react'
import axios from 'axios'

import AISuggestions from './AISuggestions'
import ScoreCard from "./ScoreCard"
import ResumeDrop from "./ResumeDrop"
import JdBox from './JdBox'
import LoadingScreen from '../Pages/LoadingScreen'

export default function UploadSection() {

    const [file, setFile] = useState(null)
    const [hasAnalyzed, setHasAnalyzed] = useState(false)
    const [jd, setJd] = useState('')
    const [loading, setLoading] = useState(false);
    const [suggestion, setsuggestion] = useState([])
    const [score, setscore] = useState(null)

    const isReady = file !== null && jd.length > 30

    const handleFileUpload = async () => {

        try {

            setLoading(true);
            setHasAnalyzed(true)
            const url = import.meta.env.VITE_BACKEND_URL + '/score/getscore'

            const formData = new FormData()
            formData.append("file", file)          // PDF
            formData.append("jdText", jd)

            const res = await axios.post(url, formData)

            const formattedSuggestions = res.data.suggestions.map((item, i) => ({
                title: item.resumeText,
                body: item.improvement
            }))

            setsuggestion(formattedSuggestions)
            setscore(res.data.score)

            setLoading(false);

        } catch (error) {
            console.log("STATUS:", error.response?.status)
            console.log("DATA:", error.response?.data)
            console.log("ERROR:", error.message)
            setLoading(false);
        }

    }

    return (
        <section className='relative overflow-hidden min-h-screen bg-bg py-16 px-8'>

            <div className='text-center mb-10 relative z-10'>
                <h2 className='text-[42px] font-bold text-text-primary mb-1.5'>
                    Analyse your <span className='text-accent'>resume</span>
                </h2>
                <p className='text-[13px] text-primary'>
                    Upload your resume and paste the job description to get an instant AI-powered match score.
                </p>
            </div>

            <div className='relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-6 items-stretch'>

                <div className='h-full'>
                    <ResumeDrop setFile={setFile} file={file} />
                </div>

                <div className='h-full'>
                    <JdBox setJd={setJd} jd={jd} />
                </div>

            </div>

            <div className='relative z-10 max-w-4xl mx-auto flex items-center justify-center'>
                <button
                    onClick={handleFileUpload}
                    // disabled={!isReady}
                    className='
                        inline-flex items-center gap-2 bg-accent-deep text-text-primary
                        text-[14px] font-semibold px-7 py-3 rounded-[10px] border-none cursor-pointer
                        hover:bg-[#A21CAF] hover:shadow-[0_0_24px_rgba(232,121,249,0.22)]
                        active:scale-[0.97] transition-all duration-150
                        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent-deep disabled:hover:shadow-none
                    '
                >
                    <Zap size={15} />
                    Analyse Resume
                </button>
            </div>

            {loading && <LoadingScreen visible={loading} />}

            {!loading && hasAnalyzed && (
                <div className="flex justify-center gap-18 items-center mt-18">

                    <div>
                        <ScoreCard score={score} />
                    </div>

                    <div>
                        <AISuggestions suggestions={suggestion} />
                    </div>

                </div>
            )}



        </section>
    )
}