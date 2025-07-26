import React from 'react'
import { Link } from 'react-router'
import ScoreCircle from './ScoreCircle'

const ResumeCard = ({ resume }: { resume: Resume }) => {
    return (
        <Link to={`/resumes/${resume.id}`} className='resume-card animate-in fade-in duration-1000'>

            {/* resume header */}
            <div className='resume-card-header'>
                <div className="flex flex-col gap-2">
                    <h2 className='!text-black font-bold break-words'>
                        {resume.companyName}
                    </h2>
                    <h3 className='text-lg break-words text-gray-500'>
                        {resume.jobTitle}
                    </h3>
                </div>

                <div className='flex-shrink-0 '>
                    <ScoreCircle score={resume.feedback.overallScore} />
                </div>
            </div>

            {/* resume content */}
            <div className='gradient-border animate-in fade-in duration-1000'>
                <div className='w-full h-full'>
                    <img src={resume.imagePath} alt="resume" className='w-full h-[350px] object-cover object-top' />
                </div>
            </div>
        </Link>
    )
}

export default ResumeCard