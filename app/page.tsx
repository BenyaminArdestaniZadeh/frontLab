import { TextArea, TextField } from "@/components/primitives";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100%",
        padding: "16px",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div
        style={{
          color: "var(--primary-foreground)",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <ThemeToggle />
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <TextField label="Email" placeholder="Email" />
          <TextArea label="Message" placeholder="Message" />
        </div>
      </div>
    </main>
  );
}
