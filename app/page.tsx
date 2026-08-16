import { ThemeToggle } from "@/src/components/ThemeToggle";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <div className="bg-primary text-primary-foreground p-4 rounded-lg">
        <ThemeToggle />
      </div>
    </main>
  );
}
