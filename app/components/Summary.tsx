import React from 'react'
import ScoreGauge from './ScoreGauge'
import ScoreBadge from './ScoreBadge';

const Category = ({ score, title }: { score: number; title: string }) => {

    const textColor = score >= 80 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500';

    return (
        <div className='resume-summary'>
            <div className='category'>
                <div className='flex flex-row gap-2 items-center justify-center'>
                    <p className='text-2xl'>{title}</p>
                    <ScoreBadge score={score} />

                </div>
                <p className='text-2xl '>
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    )
}

const summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className='bg-white rounded-2xl shadow-md w-full'>
            <div className='flex flex-row items-center p-4 gap-8'>
                <ScoreGauge score={feedback.overallScore} />

                <div className='flex flex-col gap-2'>

                    <h2 className='text-2xl font-bold '>
                        Your Resume Score
                    </h2>
                    <p>
                        This score is calculated based on the ATS compatibility of your resume with the job description provided.
                    </p>
                </div>
            </div>

            <Category score={feedback.toneAndStyle.score} title="Tone & Style" />
            <Category score={feedback.content.score} title="Content" />
            <Category score={feedback.structure.score} title="Structure" />
            <Category score={feedback.skills.score} title="Skills" />
        </div>
    )
}

export default summary