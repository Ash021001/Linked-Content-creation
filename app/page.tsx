import { Suspense } from "react";
import GenerateForm from "./components/GenerateForm";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="p-10 text-sm text-gray-400">Loading...</div>}>
      <GenerateForm />
    </Suspense>
  );
}
