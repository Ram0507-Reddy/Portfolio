import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import { Terminal, BookOpen, ShieldCheck, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CyberProjectPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Fetch from the centralized security directory within the professional project structure
  const projectDir = path.join(process.cwd(), "..", "projects", "Security", slug);
  
  if (!fs.existsSync(projectDir)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-slate-800">
        <h1 className="text-3xl font-bold">Project Initializing 🔒</h1>
        <p className="mt-4 text-slate-500">The source code for {slug} is currently being synced to the vault.</p>
        <Link href="/" className="mt-8 px-6 py-2 bg-slate-900 text-white rounded-full">Return Home</Link>
      </div>
    );
  }

  // Find the primary python file and markdown guide
  const files = fs.readdirSync(projectDir);
  const pyFile = files.find(f => f.endsWith('.py'));
  const mdFile = files.find(f => f.toLowerCase() === 'user_guide.md' || f.endsWith('.md'));
  
  let pythonCode = "No python source found.";
  let markdownGuide = "# Project Guide\nNo markdown guide found.";

  if (pyFile) {
    pythonCode = fs.readFileSync(path.join(projectDir, pyFile), 'utf-8');
  }
  
  if (mdFile) {
    markdownGuide = fs.readFileSync(path.join(projectDir, mdFile), 'utf-8');
  }

  const title = slug.replace(/^[0-9]+_/, '').replace(/_/g, ' ');

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full bg-slate-900 border-b border-slate-800 z-50 text-slate-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between font-mono text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-2">
              <ChevronLeft size={16} /> Return to Operations
            </Link>
          </div>
          <div className="flex items-center gap-2 text-teal-400">
            <ShieldCheck size={16} /> SECURE_VIEWER_PROTOCOL
          </div>
        </div>
      </nav>

      {/* Main Content Dashboard */}
      <div className="pt-24 pb-12 px-6 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left Panel: Markdown Instructions */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <BookOpen className="text-teal-600" />
              {title}
            </h1>
            <div className="prose prose-sm prose-slate max-w-none">
              <ReactMarkdown>{markdownGuide}</ReactMarkdown>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3">Deployment Note</p>
              <p className="text-sm text-slate-500">
                This script requires a local environment with Python. Review the Dockerfile or terminal dependencies listed above to execute.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel: Source Code Terminal */}
        <div className="w-full lg:w-2/3">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0d1117]">
            {/* Fake Mac Header */}
            <div className="h-10 bg-[#161b22] border-b border-slate-800 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-xs font-mono text-slate-500 flex items-center gap-2">
                <Terminal size={12} /> {pyFile || "source.py"}
              </div>
            </div>
            {/* Code Body */}
            <div className="p-6 overflow-x-auto h-[70vh]">
              <pre className="text-sm font-mono text-slate-300 leading-relaxed">
                <code>{pythonCode}</code>
              </pre>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
