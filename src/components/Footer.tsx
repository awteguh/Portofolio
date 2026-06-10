import { personal } from "@/data/personal"

export function Footer() {
  return (
    <footer className="py-6 px-4 border-t border-steel/20 dark:border-steel/30">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-steel dark:text-snow/50">
          &copy; {new Date().getFullYear()} {personal.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}
