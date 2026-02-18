import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Task Management System</h1>
        <p className="text-xl mb-8 text-blue-100">
          Organize and manage your tasks efficiently
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/login"
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-8 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition border border-white"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
