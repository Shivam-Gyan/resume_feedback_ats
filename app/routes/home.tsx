import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants/index";
import ResumeCard from "~/components/Resume.card";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "BeyondCareer" },
    { name: "description", content: "Welcome to BeyondCareer!" },
  ];
}

export default function Home() {
  return (<main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center bg-no-repeat">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Application & Resume Rating</h1>
        <h2>Review Your Submission and check AI-powered feedback</h2>
      </div>


      {
        resumes.length > 0 && (
          <div className="resumes-section">
            {
              resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))
            }
          </div>
        )
      }
    </section>


  </main>);
}



