import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import ATS from '~/components/ATS';
import Details from '~/components/Details';
import Footer from '~/components/Footer';
import Summary from '~/components/summary';
import { usePuterStore } from '~/lib/puter';

export const meta = () => ([
    { title: "BeyondCareer | Review" },
    { name: "description", content: "Detailed resume review and feedback." },
])

const resume = () => {
    const id = useParams().id;
    const { auth, isLoading, fs, kv } = usePuterStore();

    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            // Redirect to home if not authenticated
            navigate(`/auth?next=/resume/${id}`);
        }
    }, [isLoading]);

    useEffect(() => {
        const fetchResume = async () => {
            if (!id) return;
            const resume = await kv.get(`resume:${id}`);
            if (!resume) return;
            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });

            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;

            const imageUrl = URL.createObjectURL(new Blob([imageBlob], { type: 'image/png' }));
            setImageUrl(imageUrl);
            setFeedback(data.feedback || '');

            // console.log({ resumeUrl, imageUrl, feedback: data.feedback });
        }
        fetchResume();
    }, [id])


    return (
        <main className='!pt=0 '>
            <nav className='resume-nav'>
                <Link to={'/'} className='back-button'>
                    <img src="/icons/back.svg" alt="back" className='w-2.5 h-2.5' />
                    <span className='text-sm text-gray-800 font-semibold'>Back to Homepage</span>
                </Link>
            </nav>

            <div className='flex flex-row w-full max-lg:flex-col-reverse '>
                <section className='feedback-section bg-[url("/images/bg-small.svg")] bg-cover bg-center bg-no-repeat h-[100vh] sticky top=0 items-center justigy-center'>
                    {imageUrl && resumeUrl && (
                        <div className='animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] w-2xl:h-fit w-fit'>
                            <a href={resumeUrl} target='_blank' rel='noopener noreferrer'>
                                <img src={imageUrl} alt="" className='w-full h-full object-contain rounded-2xl' title='resume' />
                            </a>
                        </div>
                    )}
                </section>

                <section className='feedback-section'>

                    <h2 className='text-4xl !text-black font-bold '>Resume Review</h2>
                    {
                        feedback ? (
                            <>
                                <div className='flex flex-col gap-8 animate-in fade-in duration-1000'>
                                    <Summary feedback={feedback} />
                                    <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                                    <Details feedback={feedback} />
                                </div>
                            </>
                        )
                            : (
                                <>
                                    <img src="/images/resume-scan-2.gif" className='w-full' alt="" />
                                </>
                            )
                    }
                </section>
            </div>
            <Footer />
        </main>
    )
}

export default resume