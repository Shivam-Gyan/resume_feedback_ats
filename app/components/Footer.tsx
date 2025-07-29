import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-transparent text-slate-800 py-4">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center md:gap-12 gap-4 px-4">
                
                {/* Company Name */}
                <p className="text-sm mb-2 md:mb-0">
                    © {new Date().getFullYear()} Beyond Career. All Rights Reserved.
                </p>

                {/* Social Icons */}
                <div className="flex space-x-5 text-xl">
                    <a
                        href="https://github.com/Shivam-Gyan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/shivam-gupta19/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="mailto:shivamgupta12a@gmail.com"
                        className="hover:text-blue-500 transition"
                    >
                        <FaEnvelope />
                    </a>
                </div>
            </div>
        </footer>
    );
}
