import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "BeyondCareer" },
    { name: "description", content: "Welcome to BeyondCareer!" },
  ];
}

export default function Home() {
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center bg-no-repeat">
    <Navbar />
   <section className="main-section">
      <div className="page-heading">
        <h1>Track Your Application & Resume Rating</h1>
        <h2>Review Your Submission and check AI-powered feedback</h2>
      </div>
   </section>
  </main>;
}
