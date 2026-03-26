import { useState } from 'react'
import JobSearchForm from '../Components/Jobs/JobSearchForm'
import JobResults from '../Components/Jobs/JobResults'
import axios from "axios"

export default function JobSearchPage() {
    const [view, setView] = useState('form') // 'form' | 'results'
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSearch = async (params) => {

        try {
            setView('results')
            setLoading(true)

            const data = {
                keyword: params.keyword,
                location: params.location,
                experienceLevel: params.experienceLevel,
                remote: params.remote
            }

            const token = localStorage.getItem("token")

            const res = await axios.get(
                import.meta.env.VITE_BACKEND_URL + "/user/jobs",
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  },
                  params: {
                    data
                  }
                }
              )

            await new Promise(r => setTimeout(r, 1500))
            setJobs(res.data.response) // set your API response here
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const handleBack = () => {
        setView('form')
        setJobs([])
    }

    return (
        <div className='min-h-screen bg-bg py-6 px-6'>
            <div className='max-w-full mx-auto flex flex-col gap-5'>
                {view === 'form' && (
                    <JobSearchForm onSubmit={handleSearch} />
                )}
                {view === 'results' && (
                    <JobResults
                        jobs={jobs}
                        loading={loading}
                    />
                )}
            </div>
        </div>
    )
}