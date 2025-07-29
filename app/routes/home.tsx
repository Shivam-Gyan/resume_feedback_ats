import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/Resume.card";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "BeyondCareer" },
    { name: "description", content: "Welcome to BeyondCareer!" },
  ];
}

export default function Home() {

  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumeUrl, setResumeUrl] = useState('');

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingresumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      // Redirect to home if not authenticated
      navigate('/auth?next=/');
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const fetchResumes = async () => {
      setLoadingResumes(true);
      const storedResumes = (await kv.list('resume:*', true)) as KVItem[];
      const parsedResumes = storedResumes?.map(resume => (
        JSON.parse(resume.value) as Resume
      ))
      console.log({ parsedResumes });
      if (!parsedResumes) {
        setLoadingResumes(false);
        return;
      }
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    fetchResumes();
  }, [kv]);


  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center bg-no-repeat">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Application & Resume Rating</h1>

          {!loadingresumes && resumes.length === 0 ? (
            <h2 className="text-gray-500">No resumes found. Upload your resume to get feedback</h2>
          ) : (
            <h2>Review Your Submission and check AI-powered feedback</h2>
          )}
        </div>

        {
          loadingresumes && (
            <div className="flex flex-col items-center justify-center">
              <img src="/images/resume-scan-2.gif" className="w-[200px]" alt="resumes" />
            </div>
          )
        }


        {
          !loadingresumes && resumes.length > 0 && (
            <div className="resumes-section">
              {
                resumes.map((resume) => (
                  <ResumeCard key={resume.id} resume={resume} />
                ))
              }
            </div>
          )
        }

        {
          !loadingresumes && resumes.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 mt-10">
              <Link to='/upload' className="w-fit text-xl font-semibold primary-button">Upload Resume</Link>
             </div>
          )
        }
      </section>


    </main>
  );
}



