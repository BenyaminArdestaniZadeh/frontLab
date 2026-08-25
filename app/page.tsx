import { TextArea, TextField } from "@/components/primitives";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <main className="p-4">
      <div>
        <ThemeToggle />
        <div className="flex flex-col gap-6">
          <TextField label="Email" placeholder="Email" />
          <TextArea label="Message" placeholder="Message" />
          <div className="bg-background text-foreground border border-border p-4">
            Tailwind is working
          </div>
          <div className="bg-primary text-background p-4">Primary</div>
          <div className="border-4 border-primary bg-background p-4 text-foreground">
            Border test
          </div>
          <div className="bg-primary p-4 text-background">Primary test</div>
          <div className="bg-secondary p-4 text-foreground">Secondary test</div>
          <div className="bg-secondary p-4 text-foreground">Secondary test</div>

          <div className="p-4 text-foreground test shadow-xl">TEST</div>
        </div>
      </div>
    </main>
  );
}
