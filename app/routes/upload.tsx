
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/Navbar'
import { convertPdfToImage } from '~/lib/pdf2img';
import { usePuterStore } from '~/lib/puter';
import { generate } from '~/lib/utils';
import { prepareInstructions } from '../../constants';
import Footer from '~/components/Footer';

const upload = () => {

    const { fs, isLoading, ai, kv, auth } = usePuterStore();

    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleAnalyse = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string; jobTitle: string; jobDescription: string; file: File }) => {

        setIsProcessing(true);
        setStatusText("Uploading the resume...");
        const uploadFile = await fs.upload([file]);

        if (!uploadFile) return setStatusText("Error: Failed to upload file");

        setStatusText('Converting to image...');

        const imageFile = await convertPdfToImage(file);
        if (!imageFile.file || imageFile.error) {
            return setStatusText(`Error: ${imageFile.error || "Failed to convert PDF to image"}`);
        }

        setStatusText('Uploading the image...');

        const uploadImage = await fs.upload([imageFile.file]);
        if (!uploadImage) return setStatusText("Error: Failed to upload image");

        setStatusText('Preparing data ...');


        const uuid = generate();

        const data = {
            id: uuid,
            companyName,
            jobTitle,
            jobDescription,
            resumePath: uploadFile.path,
            imagePath: uploadImage.path,
            feedback: ''

        }

        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analysing resume...');

        const feedback = await ai.feedback(
            uploadFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )


        if (!feedback) return setStatusText("Error: Failed to get feedback");

        const feedbackText = typeof feedback.message.content == 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;


        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analysis completed, redirecting ...');

        // console.log({ data, feedback });

        navigate(`/resume/${uuid}`);

    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget.closest('form');

        if (!form) return;

        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!file) {
            return;
        }
        // console.log({ companyName, jobTitle, jobDescription, file });
        await handleAnalyse({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <div className='relative min-h-screen'>
            <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center bg-no-repeat">
                <Navbar />
                <section className="main-section">
                    <div className='page-heading py-16'>
                        <h1>Smart feedback for your dream job</h1>
                        {
                            isProcessing ? (
                                <>
                                    <h2>{statusText}</h2>
                                    <img src="/images/resume-scan.gif" alt="Processing" className='size-100 -mt-10' />
                                </>
                            ) : (
                                <>
                                    <h2>Drop your resume for an ATS score and improvement tips</h2>
                                </>
                            )
                        }

                        {
                            !isProcessing && (
                                <form id='upload-form' onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>

                                    <div className='form-div'>
                                        <label htmlFor="company-name">Company Name</label>
                                        <input type="text" id="company-name" placeholder='Company Name' name="company-name" />
                                    </div>

                                    <div className='form-div'>
                                        <label htmlFor="job-title">Job Title</label>
                                        <input type="text" id="job-title" placeholder='Job Title' name="job-title" />
                                    </div>

                                    <div className='form-div'>
                                        <label htmlFor="job-description">Job Description</label>
                                        <textarea rows={5} id="job-description" placeholder='Job Description' name="job-description" />
                                    </div>

                                    <div className='form-div'>
                                        <label htmlFor="uploader">Upload Resume</label>
                                        <FileUploader onFileSelect={handleFileSelect} />
                                    </div>

                                    <button className='primary-button' type='submit'>
                                        Analyse Resume
                                    </button>

                                </form>
                            )
                        }
                    </div>
                </section>
            </main>

            <div className="absolute bottom-0 w-full">
                <Footer />
            </div>
        </div>
    )
}

export default upload