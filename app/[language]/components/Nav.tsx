import LanguageSwitcher from "./LanguageSwitcher";

export default async function NavNar() {
  return (
    <nav className="bg-#0B253C  p-4">
      <div>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
