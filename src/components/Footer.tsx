import { personal } from "@/data/personal"

export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-steel/20 dark:border-steel/30">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-2">
        <p
          className="font-[family-name:var(--font-mono)] text-sm text-steel-ink dark:text-snow/60 tracking-tight"
        >
          <span className="text-ice/70 select-none">~/</span>
          {personal.nickname.toLowerCase().replace(" ", "-")}
          <span className="text-ice/70 select-none"> $</span>
        </p>
        <p className="font-[family-name:var(--font-mono)] text-xs text-steel-ink/70 dark:text-snow/40">
          &copy; {new Date().getFullYear()} {personal.name} — All rights reserved.
        </p>
      </div>
    </footer>
  )
}
